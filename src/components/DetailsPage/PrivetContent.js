import React, { useEffect, useState } from "react";
import { Typography, Stack } from "@mui/material";
import { TabPanel } from "@mui/lab";
import SpeakerNotesOffIcon from "@mui/icons-material/SpeakerNotesOff";
import { _fetch } from "../../CONTRACT-ABI/connect";
import { Card, Grid } from "@mui/material";
import CardActionArea from "@material-ui/core/CardActionArea";

import CardMedia from "@material-ui/core/CardMedia";

import FileImg from "../../assets/images/file.png";

import Button from "@mui/material/Button";
import GetAppIcon from "@material-ui/icons/GetApp";
import CardActions from "@material-ui/core/CardActions";

const Bid = ({ tokenId }) => {
  const [nftData, setNftData] = useState([]);
  const [start, setStart] = useState(false);
  useEffect(() => {
    fetchNftInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchNftInfo() {
    setStart(true);
    try {
      const getprivetContent = await _fetch("getPrivetContent", tokenId);
      console.log(
        "-------------->getprivetContent",
        getprivetContent?.privetUri
      );

      setNftData(getprivetContent);
      setStart(false);
    } catch {
      setStart(false);
    }
  }

  return (
    <TabPanel
      value="3"
      sx={{
        backgroundColor: "#F0F6FF",
        width: "100%",
        height: 400,
        overflow: "auto",
      }}
    >
      <Grid
        container
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        style={{ marginTop: 20 }}
      >
        <Grid item lg={3} md={3} sm={12} xs={12}></Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Card style={{ margin: 5 }}>
            <CardActionArea>
              <CardMedia
                title="Contemplative Reptile"
                image={FileImg}
                style={{ height: 200 }}
              />
              <CardActions style={{ float: "right" }}>
                <Button
                  size="small"
                  color="success"
                  onClick={() =>
                    window.open(nftData?.privetUri, "_blank").focus()
                  }
                >
                  <GetAppIcon style={{ margin: 5, fontSize: 15 }} /> Download
                </Button>
              </CardActions>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item lg={3} md={3} sm={12} xs={12}></Grid>
      </Grid>
      {!start && nftData?.length === 0 && (
        <Stack
          direction="Column"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "Center",
            p: 5,
          }}
        >
          <SpeakerNotesOffIcon sx={{ color: "#ABB2B9", fontSize: 60 }} />
          <Typography
            sx={{
              color: "#ABB2B9",
              fontSize: 14,
              fontWeight: "bold",
              marginTop: 5,
            }}
          >
            No privet content available on this NFT!
          </Typography>
        </Stack>
      )}
    </TabPanel>
  );
};

export default Bid;
