import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import StampPapetImg from "../../assets/images/stamp-paper.jpg";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import QRCode from "react-qr-code";

import { networkURL } from "../../config";
import { getContractAddress } from "../../CONTRACT-ABI/connect";

import { frtchAccounttransction } from "../../functions/fetchAccountTransction";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { Stack, Typography } from "@mui/material";

export default function Certificate({ account, tokenId }) {
  const printDocument = () => {
    const input = document.getElementById("divToPrint");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      // pdf.output('dataurlnewwindow');
      pdf.save(`Plot ${tokenId} - Ownership document.pdf`);
    });
  };

  const [transctions, settransctions] = React.useState([]);

  React.useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    await frtchAccounttransction()
      .then((response) => response.json())
      .then((result) => {
        // console.log("--------->", result);
        settransctions(result.result);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} sm={12} lg={12}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => printDocument()}
            style={{ float: "right" }}
            startIcon={<DownloadForOfflineIcon />}
          >
            Download
          </Button>
        </Grid>
        <Grid item xs={12} md={8} sm={12} lg={12} id="divToPrint">
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
                  <h3 style={{ fontWeight: "bold", textAlign: "center" }}>
                    Ownership of Land - Plaot #{tokenId}
                  </h3>
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
                  <h4
                    style={{ marginTop: 20, textAlign: "left", fontSize: 14 }}
                  >
                    Owner Address : <b>{account}</b>
                  </h4>
                </Grid>
                <Grid item xs={12} md={12} sm={12} lg={12}>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "15px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      width: "8rem",
                      color: "vlack",
                      marginBottom: 2,
                    }}
                  >
                    Transctions
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table aria-label="simple table" size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Form</TableCell>
                          <TableCell>To</TableCell>
                          <TableCell>Type</TableCell>
                        </TableRow>
                      </TableHead>

                      {transctions?.map((data, i) => {
                        var unixTimestamp = data?.timeStamp;
                        var date = new Date(unixTimestamp * 1000);

                        const txnDate =
                          date.getDate() +
                          "/" +
                          (date.getMonth() + 1) +
                          "/" +
                          date.getFullYear() +
                          " " +
                          date.getHours() +
                          ":" +
                          date.getMinutes() +
                          ":" +
                          date.getSeconds();

                        if (data?.tokenID === tokenId) {
                          return (
                            <TableBody
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell align="right">
                                <Stack
                                  direction="column"
                                  sx={{
                                    alignItems: "flex-start",
                                    justifyContent: "start",
                                    display: "flex",
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      fontSize: "14px",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      width: "8rem",
                                      color: "vlack",
                                    }}
                                  >
                                    {data?.from}
                                  </Typography>
                                </Stack>
                              </TableCell>
                              <TableCell>
                                {" "}
                                <Typography
                                  sx={{
                                    fontSize: "14px",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    width: "6rem",
                                    color: "black",
                                  }}
                                >
                                  {data?.to}
                                </Typography>
                              </TableCell>

                              <TableCell>
                                <Typography
                                  sx={{
                                    fontWeight: "bold",
                                    fontSize: "14px",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    width: "8rem",
                                    color: "black",
                                  }}
                                >
                                  {data?.from ===
                                  "0x0000000000000000000000000000000000000000"
                                    ? `Mint`
                                    : `Transfer`}
                                </Typography>

                                <Typography sx={{ fontSize: "11px" }}>
                                  {txnDate}
                                </Typography>
                              </TableCell>
                            </TableBody>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </Table>
                  </TableContainer>
                  <br />
                </Grid>

                <Grid item xs={12} md={6} sm={12} lg={6}>
                  <h4
                    style={{ marginTop: 40, textAlign: "left", fontSize: 14 }}
                  >
                    Signature :{" "}
                  </h4>
                  <h4
                    style={{ marginTop: 10, textAlign: "left", fontSize: 14 }}
                  >
                    Date :{" "}
                  </h4>
                </Grid>
                <Grid item xs={12} md={6} sm={12} lg={6}>
                  <QRCode
                    value={`${networkURL()}/token/${getContractAddress(
                      sessionStorage.getItem("currentyNetwork")
                    )}?a=${tokenId}`}
                    size="100"
                    style={{ float: "right" }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
