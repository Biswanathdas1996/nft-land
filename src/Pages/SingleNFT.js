import React, { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { Card, Grid } from "@mui/material";
import { _transction_signed, _account } from "../../src/CONTRACT-ABI/connect";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Switch from "@mui/material/Switch";
import DeleteOutlineIcon from "@mui/icons-material/Delete";
import { pink } from "@mui/material/colors";
import TransctionModal from "../components/shared/TransctionModal";
import HeaderWrapper from "../components/shared/BackgroundUI";
// import { getSymbol } from "../utils/currencySymbol";
// import { getResizedFile } from "../utils/reSizeImg";
import { createAnduploadFileToIpfs } from "../utils/ipfs";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { getTokenListingState } from "../utils/tokenListingState";
import "../styles/background.css";

const web3 = new Web3(window.ethereum);

const VendorSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  authorname: Yup.string().required("Authorname is required"),
  price: Yup.string().required("Price is required"),
  category: Yup.string().required("category is required"),
});

const Mint = () => {
  const [start, setStart] = useState(false);
  const [response, setResponse] = useState(null);

  const [checked, setChecked] = useState(false);
  const [description, setDescription] = useState(null);

  const [tokenListingState, setTokenListingState] = useState("1");

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  let history = useNavigate();

  const saveData = async ({
    plot,
    title,
    authorname,
    category,
    attributes,
    price,
    royelty,
  }) => {
    setStart(true);

    let responseData;

    const metaData = {
      name: title,
      author: authorname,
      category: category,
      description: description,
      attributes: attributes,
    };

    const resultsSaveMetaData = await createAnduploadFileToIpfs(metaData);

    console.log("---metadta-->", resultsSaveMetaData);
    const account = await _account();

    for (let i = 0; i < plot; i++) {
      responseData = await _transction_signed(
        "mintNFT",
        resultsSaveMetaData.link,
        web3.utils.toWei(price.toString(), "ether"),
        royelty,
        category,
        "",
        account,
        tokenListingState
      );

      console.log("Called instance:", i + 1);
    }

    setResponse(responseData);

    console.log("responseData", responseData);
  };

  const modalClose = () => {
    setStart(false);
    setResponse(null);
    history("/");
  };
  return (
    <>
      {start && <TransctionModal response={response} modalClose={modalClose} />}
      <HeaderWrapper className="header-wrapper-form">
        <div className="form-layer2">
          <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item lg={3} md={3} sm={12} xs={12}></Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <div style={{ margin: 20 }}>
                <Card
                  style={{
                    background: "#ffffff9e",
                  }}
                >
                  <Grid container>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <div
                        style={{
                          padding: "20px",
                        }}
                      >
                        <h4>Create NFT</h4>
                        <Formik
                          initialValues={{
                            plot: "",
                            authorname: "",
                            title: "",
                            text: "",
                            category: "",
                            royelty: 0,
                            price: "",
                            attributes: [],
                          }}
                          validationSchema={VendorSchema}
                          onSubmit={(values, { setSubmitting }) => {
                            console.log("values=======>", values);
                            saveData(values);
                            setSubmitting(false);
                          }}
                        >
                          {({ touched, errors, isSubmitting, values }) => (
                            <Form>
                              <Grid container>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                  <div
                                    className="form-group"
                                    style={{ marginLeft: 10, marginTop: 10 }}
                                  >
                                    <label for="plot" className="my-2">
                                      No of plot{" "}
                                      <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                      type="text"
                                      name="plot"
                                      autoComplete="flase"
                                      placeholder="Enter no of plot"
                                      className={`form-control text-muted ${
                                        touched.plot && errors.plot
                                          ? "is-invalid"
                                          : ""
                                      }`}
                                      style={{ marginRight: 10, padding: 9 }}
                                    />
                                  </div>
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                  <div
                                    className="form-group"
                                    style={{ marginLeft: 10, marginTop: 10 }}
                                  >
                                    <label for="title" className="my-2">
                                      Title{" "}
                                      <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                      type="text"
                                      name="title"
                                      autoComplete="flase"
                                      placeholder="Enter title"
                                      className={`form-control text-muted ${
                                        touched.title && errors.title
                                          ? "is-invalid"
                                          : ""
                                      }`}
                                      style={{ marginRight: 10, padding: 9 }}
                                    />
                                  </div>
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                  <div
                                    className="form-group"
                                    style={{ marginLeft: 10, marginTop: 10 }}
                                  >
                                    <label for="title" className="my-2">
                                      Author Name{" "}
                                      <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                      type="text"
                                      name="authorname"
                                      autoComplete="flase"
                                      placeholder="Enter Author name"
                                      className={`form-control text-muted ${
                                        touched.authorname && errors.authorname
                                          ? "is-invalid"
                                          : ""
                                      }`}
                                      style={{ marginRight: 10, padding: 9 }}
                                    />
                                  </div>
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                  <div
                                    className="form-group"
                                    style={{ marginLeft: 10, marginTop: 10 }}
                                  >
                                    <label for="title" className="my-2">
                                      Price{" "}
                                      <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                      type="number"
                                      name="price"
                                      autoComplete="flase"
                                      // placeholder={`Enter price in ${getSymbol()}`}
                                      placeholder={`Enter price in INR`}
                                      className={`form-control text-muted ${
                                        touched.price && errors.price
                                          ? "is-invalid"
                                          : ""
                                      }`}
                                      style={{ marginRight: 10, padding: 9 }}
                                    />
                                  </div>
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                  <div
                                    className="form-group"
                                    style={{ marginLeft: 10, marginTop: 10 }}
                                  >
                                    <label for="title" className="my-2">
                                      Choose category{" "}
                                      <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                      name="category"
                                      component="select"
                                      className={`form-control text-muted ${
                                        touched.category && errors.category
                                          ? "is-invalid"
                                          : ""
                                      }`}
                                      style={{ marginRight: 10, padding: 9 }}
                                    >
                                      <option>-- Please select --</option>
                                      <option value="area-1">
                                        Action area-1
                                      </option>
                                      <option value="area-2">
                                        Action area-2
                                      </option>
                                      <option value="area-3">
                                        Action area-3
                                      </option>
                                    </Field>
                                  </div>
                                </Grid>

                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                  <div
                                    className="form-group"
                                    style={{ marginLeft: 10, marginTop: 10 }}
                                  >
                                    <label for="title" className="my-2">
                                      Description{" "}
                                      <span className="text-danger">*</span>
                                    </label>
                                    <TextareaAutosize
                                      aria-label="minimum height"
                                      minRows={3}
                                      name="text"
                                      onChange={(e) =>
                                        setDescription(e.target.value)
                                      }
                                      placeholder="Minimum 3 rows"
                                      style={{ width: "100%" }}
                                      className={`form-control text-muted ${
                                        touched.text && errors.text
                                          ? "is-invalid"
                                          : ""
                                      }`}
                                    />
                                  </div>
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                  <div
                                    className="form-group"
                                    style={{ marginLeft: 10, marginTop: 10 }}
                                  >
                                    <label for="title" className="my-2">
                                      Royalty amount{" "}
                                    </label>
                                    <div style={{ float: "right" }}>
                                      <Switch
                                        checked={checked}
                                        onChange={handleChange}
                                        inputProps={{
                                          "aria-label": "controlled",
                                        }}
                                      />
                                    </div>
                                    {checked && (
                                      <Field
                                        type="number"
                                        name="royelty"
                                        autoComplete="flase"
                                        placeholder="Enter royalty amount (%)"
                                        className={`form-control text-muted ${
                                          touched.royelty && errors.royelty
                                            ? "is-invalid"
                                            : ""
                                        }`}
                                        style={{ marginRight: 10, padding: 9 }}
                                      />
                                    )}
                                  </div>
                                </Grid>
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                  <div
                                    className="form-group"
                                    style={{ marginLeft: 10, marginTop: 10 }}
                                  >
                                    <FieldArray
                                      name="attributes"
                                      render={(arrayHelpers) => (
                                        <div>
                                          {values.attributes &&
                                          values.attributes.length > 0 ? (
                                            values.attributes.map(
                                              (attribut, index) => (
                                                <div
                                                  style={{
                                                    border: "1px solid #c7c9cc",
                                                    borderRadius: 5,
                                                    padding: 12,
                                                    marginTop: 15,
                                                  }}
                                                  key={index}
                                                >
                                                  <DeleteOutlineIcon
                                                    onClick={() =>
                                                      arrayHelpers.remove(index)
                                                    }
                                                    sx={{ color: pink[500] }}
                                                    style={{
                                                      marginBottom: 10,
                                                      float: "right",
                                                      cursor: "pointer",
                                                    }}
                                                  />
                                                  <Grid container>
                                                    <Grid
                                                      item
                                                      lg={5}
                                                      md={5}
                                                      sm={12}
                                                      xs={12}
                                                      style={{
                                                        marginRight: 20,
                                                      }}
                                                    >
                                                      <Field
                                                        name={`attributes.${index}.lat`}
                                                        autoComplete="flase"
                                                        type="number"
                                                        placeholder="Enter latitude"
                                                        className={`form-control text-muted `}
                                                        style={{
                                                          marginTop: 10,
                                                          padding: 9,
                                                        }}
                                                      />
                                                    </Grid>
                                                    <Grid
                                                      item
                                                      lg={6}
                                                      md={6}
                                                      sm={12}
                                                      xs={12}
                                                    >
                                                      <Field
                                                        name={`attributes.${index}.lng`}
                                                        autoComplete="flase"
                                                        type="number"
                                                        placeholder="Enter longitude"
                                                        className={`form-control text-muted`}
                                                        style={{
                                                          marginTop: 10,
                                                          padding: 9,
                                                        }}
                                                      />
                                                    </Grid>
                                                  </Grid>
                                                </div>
                                              )
                                            )
                                          ) : (
                                            <Button
                                              variant="outlined"
                                              size="medium"
                                              type="button"
                                              onClick={() =>
                                                arrayHelpers.push("")
                                              }
                                            >
                                              {/* show this when user has removed all attributes from the list */}
                                              Add attributes
                                            </Button>
                                          )}
                                          {values.attributes.length !== 0 && (
                                            <Button
                                              variant="outlined"
                                              size="medium"
                                              type="button"
                                              onClick={() =>
                                                arrayHelpers.insert(
                                                  values.attributes.length + 1,
                                                  ""
                                                )
                                              }
                                              style={{
                                                marginTop: 10,
                                              }}
                                            >
                                              + Add
                                            </Button>
                                          )}
                                        </div>
                                      )}
                                    />
                                  </div>
                                </Grid>
                                <Grid
                                  item
                                  lg={12}
                                  md={12}
                                  sm={12}
                                  xs={12}
                                  style={{ marginTop: 20 }}
                                >
                                  <div
                                    className="form-group"
                                    style={{ marginLeft: 10, marginTop: 10 }}
                                  >
                                    <FormControl component="fieldset">
                                      <label for="title" className="my-2">
                                        Choose accessability{" "}
                                      </label>
                                      <RadioGroup
                                        aria-label="gender"
                                        name="gender1"
                                        value={tokenListingState}
                                        onChange={(event) => {
                                          setTokenListingState(
                                            event.target.value
                                          );
                                        }}
                                      >
                                        <FormControlLabel
                                          value="1"
                                          control={<Radio />}
                                          label={getTokenListingState("1")}
                                        />
                                        <FormControlLabel
                                          value="2"
                                          control={<Radio />}
                                          label={getTokenListingState("2")}
                                        />
                                        <FormControlLabel
                                          value="3"
                                          control={<Radio />}
                                          label={getTokenListingState("3")}
                                        />
                                        <FormControlLabel
                                          value="8"
                                          control={<Radio />}
                                          label={getTokenListingState("8")}
                                        />
                                      </RadioGroup>
                                    </FormControl>
                                  </div>
                                </Grid>

                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                  <div
                                    className="form-group"
                                    style={{
                                      marginLeft: 10,
                                      marginTop: 10,
                                      float: "right",
                                    }}
                                  >
                                    <span className="input-group-btn">
                                      <Button
                                        variant="contained"
                                        size="large"
                                        sx={{
                                          marginX: "15px",
                                          marginBottom: "15px",
                                        }}
                                        type="submit"
                                        value={"Submit"}
                                        style={{
                                          fontSize: 16,
                                          padding: "10px 24px",
                                          borderRadius: 12,
                                        }}
                                      >
                                        Create
                                      </Button>
                                    </span>
                                  </div>
                                </Grid>
                              </Grid>
                            </Form>
                          )}
                        </Formik>
                      </div>
                    </Grid>
                  </Grid>
                </Card>
              </div>
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}></Grid>
          </Grid>
        </div>
      </HeaderWrapper>
    </>
  );
};
export default Mint;
