import React, { useEffect, useState } from "react";
import { _fetch, _transction_signed } from "../../CONTRACT-ABI/connect";
import { Grid } from "@mui/material";
import TransctionModal from "../shared/TransctionModal";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

const VendorSchema = Yup.object().shape({
  x: Yup.string().required("X is required"),
  y: Yup.string().required("Y is required"),
  z: Yup.string().required("Z is required"),
});

const AccessablitySettings = ({ tokenId, account }) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);

  const [start, setStart] = useState(false);
  const [response, setResponse] = useState(null);
  useEffect(() => {
    fetchNftInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchNftInfo() {
    const getTokenListingState = await _fetch("getTokenPosition", tokenId);
    setX(getTokenListingState.x);
    setY(getTokenListingState.y);
    setZ(getTokenListingState.z);
  }

  const saveData = async ({ x, y, z }) => {
    setStart(true);
    const responseData = await _transction_signed(
      "setTokenPosition",
      tokenId,
      x,
      y,
      z
    );
    setResponse(responseData);
    fetchNftInfo();
  };

  const modalClose = () => {
    setStart(false);
    setResponse(null);
    window.location.reload();
  };

  return (
    <>
      {start && <TransctionModal response={response} modalClose={modalClose} />}

      <div
        style={{
          background: "white",
        }}
      >
        {x && y && z && (
          <Formik
            initialValues={{
              x: x,
              y: y,
              z: z,
            }}
            validationSchema={VendorSchema}
            onSubmit={(values, { setSubmitting }) => {
              saveData(values);
              setSubmitting(false);
            }}
          >
            {({ touched, errors, isSubmitting, values, handleChange }) => {
              console.log("values", values);
              return (
                <Form>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <div className="form-group">
                        <label htmlFor="firstName">X - Axis</label>
                        <Field
                          type="text"
                          name="x"
                          autoComplete="flase"
                          placeholder="X - axis"
                          className={`form-control text-muted ${
                            touched?.x && errors?.x ? "is-invalid" : ""
                          }`}
                          style={{ padding: 6 }}
                        />
                      </div>
                      <br />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <div className="form-group">
                        <label htmlFor="firstName">Y - Axis</label>
                        <Field
                          type="text"
                          name="y"
                          autoComplete="flase"
                          placeholder="Y - axis"
                          className={`form-control text-muted ${
                            touched?.y && errors?.setY ? "is-invalid" : ""
                          }`}
                          style={{ padding: 6 }}
                        />
                      </div>
                      <br />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <div className="form-group">
                        <label htmlFor="firstName">Z - Axis</label>
                        <Field
                          type="text"
                          name="z"
                          autoComplete="flase"
                          placeholder="Z - axis"
                          className={`form-control text-muted ${
                            touched?.z && errors?.z ? "is-invalid" : ""
                          }`}
                          style={{ padding: 6 }}
                        />
                      </div>
                      <br />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <div className="form-group" style={{ float: "left" }}>
                        <span className="input-group-btn">
                          <input
                            className="btn btn-default btn-secondary"
                            type="submit"
                            value={"Update"}
                          />
                        </span>
                      </div>
                    </Grid>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        )}
      </div>

      {/* <FormControl component="fieldset">
        <label for="title" className="my-2">
          Update position{" "}
        </label>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={tokenListingState}
          onChange={(event) => {
            saveData(event.target.value);
          }}
        >
          {isAdmin(account) && (
            <>
              <br />
              <Input
                id="input-with-icon-Input "
                label="X - Axis"
                defaultValue={x}
                inputProps={ariaLabel}
                variant="standard"
              />
              <br />
              <Input
                id="input-with-icon-Input "
                label="Y - Axis"
                defaultValue={y}
                inputProps={ariaLabel}
                variant="standard"
              />
              <br />
              <Input
                id="input-with-icon-Input "
                label="Z - Axis"
                defaultValue={z}
                inputProps={ariaLabel}
                variant="standard"
              />
              <br />
              <Button
                variant="contained"
                style={{ background: "#1976d2", color: "white", padding: 10 }}
              >
                Update
              </Button>
            </>
          )}
        </RadioGroup>
      </FormControl> */}
    </>
  );
};

export default AccessablitySettings;
