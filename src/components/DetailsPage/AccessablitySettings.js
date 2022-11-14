import React from "react";
import { TabPanel } from "@mui/lab";
import { Card, Grid } from "@mui/material";
import CardActionArea from "@material-ui/core/CardActionArea";
import ListingStateUpdate from "./ListingStateUpdate";

const AccessablitySettings = ({ tokenId, account, attributes, nftData }) => {
  return (
    <TabPanel
      value="4"
      sx={{
        backgroundColor: "#F0F6FF",
        width: "100%",
        overflow: "auto",
      }}
    >
      <Grid
        container
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        style={{ marginTop: 20 }}
      >
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Card style={{ margin: 5 }}>
            <CardActionArea>
              <Grid
                item
                lg={12}
                md={12}
                sm={12}
                xs={12}
                style={{ marginTop: 10 }}
              >
                <div
                  className="form-group"
                  style={{ marginLeft: 10, marginTop: 10 }}
                >
                  <ListingStateUpdate
                    tokenId={tokenId}
                    account={account}
                    attributes={attributes}
                    nftData={nftData}
                  />
                </div>
              </Grid>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </TabPanel>
  );
};

export default AccessablitySettings;
