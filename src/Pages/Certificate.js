import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import "../styles/certificate.css";
import StampPapetImg from "../assets/images/stamp-paper.jpg";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export default function Certificate({ account }) {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} sm={12} lg={12}>
          <Card>
            <CardMedia
              component="img"
              // height="140"
              image={StampPapetImg}
              alt="green iguana"
            />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12} sm={12} lg={12}>
                  <h2 style={{ fontWeight: "bold", textAlign: "center" }}>
                    Ownership of Land
                  </h2>
                </Grid>
                <Grid item xs={12} md={12} sm={12} lg={12}>
                  <h5
                    style={{ marginTop: 20, textAlign: "left", fontSize: 14 }}
                  >
                    The property measures 600 SQ. Meters and is situated at
                    Mayfield, New York, is free from any claims or litigations.
                    The property is almost 13 years old and has been renovated
                    as per your request. Even the terrace has been done up with
                    the latest solar panels. The furniture in the dining room
                    has been polished, and the attic has been cleaned up.
                  </h5>
                </Grid>
                <Grid item xs={12} md={12} sm={12} lg={12}>
                  <h5
                    style={{ marginTop: 20, textAlign: "left", fontSize: 14 }}
                  >
                    I legally certify that I am going to transfer the property
                    in your favor in good condition. Also, it is correctly ready
                    to be used immediately.
                  </h5>
                </Grid>
                <Grid item xs={12} md={12} sm={12} lg={12}>
                  <h4
                    style={{ marginTop: 20, textAlign: "left", fontSize: 14 }}
                  >
                    Owner Address : <b>{account}</b>
                  </h4>
                </Grid>
                <Grid item xs={12} md={12} sm={12} lg={12}>
                  <h4
                    style={{ marginTop: 20, textAlign: "left", fontSize: 10 }}
                  >
                    Transction :{" "}
                    <b>
                      0xdb33b2cdb5dcb85b6a0531246c76af33b02786c0a529d1206cd85d06e0e69653
                    </b>
                  </h4>
                </Grid>
                <Grid item xs={12} md={12} sm={12} lg={12}>
                  <h4
                    style={{ marginTop: 40, textAlign: "left", fontSize: 14 }}
                  >
                    Signature :{" "}
                  </h4>
                </Grid>
                <Grid item xs={12} md={12} sm={12} lg={12}>
                  <h4
                    style={{ marginTop: 10, textAlign: "left", fontSize: 14 }}
                  >
                    Date :{" "}
                  </h4>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
