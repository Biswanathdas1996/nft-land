import React from "react";
import { TabPanel } from "@mui/lab";
import Box from "@mui/material/Box";
import { Stack, Typography } from "@mui/material";

const Attributes = ({ attributes }) => {
  return (
    <TabPanel
      value="2"
      sx={{
        backgroundColor: "#F0F6FF",
        width: "100%",
        padding: 0,
        paddingTop: 2,
      }}
    >
      <Box
        sx={{
          // backgroundColor: "red",
          // height: 50,
          // width: 50,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          alignContent: "center",
        }}
      >
        {attributes?.map((attribute, index) => (
          <Stack
            key={index}
            sx={{
              backgroundColor: "white",

              display: "flex",
              alignItems: "flex-start",
              justifyContent: "Center",
              width: "40%",
              marginX: 2,
              marginBottom: 3,
              padding: 2,
              borderRadius: 1,
            }}
          >
            <Typography sx={{ color: "#797979", fontSize: 13 }}>
              <small style={{ color: "#cd8506" }}>Latitude</small>{" "}
              {attribute?.lat}
            </Typography>
            <Typography sx={{ fontSize: 15, fontWeight: "bold", mt: 1 }}>
              <small style={{ color: "#cd8506" }}>Longitude</small>{" "}
              {attribute?.lng}
            </Typography>
          </Stack>
        ))}
      </Box>
    </TabPanel>
  );
};

export default Attributes;
