import React, { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { Card, Grid } from "@mui/material";
import { _transction_signed, _account } from "../../CONTRACT-ABI/connect";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Switch from "@mui/material/Switch";
import DeleteOutlineIcon from "@mui/icons-material/Delete";
import { pink } from "@mui/material/colors";
import TransctionModal from "../shared/TransctionModal";
import HeaderWrapper from "../shared/BackgroundUI";
// import { getSymbol } from "../utils/currencySymbol";
// import { getResizedFile } from "../utils/reSizeImg";
import { createAnduploadFileToIpfs } from "../../utils/ipfs";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { getTokenListingState } from "../../utils/tokenListingState";

const web3 = new Web3(window.ethereum);

const Update = ({ tokenId, nftData, attributes }) => {
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
    const metaData = { ...nftData, attributes: attributes };

    const resultsSaveMetaData = await createAnduploadFileToIpfs(metaData);

    console.log("---metadta-->", resultsSaveMetaData);

    responseData = await _transction_signed(
      "setLoocation",
      resultsSaveMetaData.link,
      tokenId
    );

    setResponse(responseData);

    console.log("responseData", responseData);
  };

  const modalClose = () => {
    setStart(false);
    setResponse(null);
  };
  return (
    <>
      {start && <TransctionModal response={response} modalClose={modalClose} />}

      <div className="form-layer2">
        <div style={{ margin: 20 }}>
          <div
            style={{
              padding: "20px",
            }}
          >
            <h4>Update Coordinate</h4>
            <Formik
              initialValues={{
                attributes: attributes,
              }}
              onSubmit={(values, { setSubmitting }) => {
                console.log("values=======>", values);
                saveData(values);
                setSubmitting(false);
              }}
            >
              {({ touched, errors, isSubmitting, values }) => (
                <Form>
                  <Grid container>
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
                                values.attributes.map((attribut, index) => (
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
                                      onClick={() => arrayHelpers.remove(index)}
                                      sx={{ color: pink[500] }}
                                      style={{
                                        marginBottom: 10,
                                        float: "right",
                                        cursor: "pointer",
                                      }}
                                    />
                                    <h5 style={{ fontSize: 10 }}>
                                      Point no - {index + 1}
                                    </h5>
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
                                        <b>Latitude</b>
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
                                      <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <b>Longitude</b>
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
                                ))
                              ) : (
                                <Button
                                  variant="outlined"
                                  size="medium"
                                  type="button"
                                  onClick={() => arrayHelpers.push("")}
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
                            Update
                          </Button>
                        </span>
                      </div>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};
export default Update;
