import React, { useEffect, useState } from "react";
import { Typography, Stack } from "@mui/material";
import { TabPanel } from "@mui/lab";
import SpeakerNotesOffIcon from "@mui/icons-material/SpeakerNotesOff";
import { _fetch, _account } from "../../CONTRACT-ABI/connect";
import { Card, Grid } from "@mui/material";
import CardActionArea from "@material-ui/core/CardActionArea";

import CardMedia from "@material-ui/core/CardMedia";

import FileImg from "../../assets/images/file.png";

import Button from "@mui/material/Button";
import GetAppIcon from "@material-ui/icons/GetApp";
import CardActions from "@material-ui/core/CardActions";

import Certificate from "../../Pages/Certificate";

const Bid = ({ tokenId }) => {
  const [account, setAccount] = useState([]);
  const [start, setStart] = useState(false);
  useEffect(() => {
    fetchNftInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchNftInfo() {
    setStart(true);
    try {
      const getprivetContent = await _account();
      setAccount(getprivetContent);
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

        overflow: "auto",
      }}
    >
      <Certificate account={account} tokenId={}/>
    </TabPanel>
  );
};

export default Bid;
