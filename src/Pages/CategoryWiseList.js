import React, { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import NftCard from "../components/shared/NFT-Card";
import IndicationTable from "../components/shared/IndicationTable";
import { _fetch } from "../CONTRACT-ABI/connect";
import Loader from "../components/shared/Loader";
import { useParams } from "react-router-dom";

export default function HomePage() {
  const [tokens, setToken] = useState([]);
  const [loading, setLoading] = useState(false);

  const { category } = useParams();

  useEffect(() => {
    fetchAllPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  async function fetchAllPosts() {
    await setToken([]);
    setLoading(true);
    const getAllToken = await _fetch("getCollection");
    const filterCollection = getAllToken?.filter(
      (data) =>
        data?.collection?.toLocaleLowerCase() === category?.toLocaleLowerCase()
    );
    await setToken(filterCollection);
    setLoading(false);
  }

  return (
    <Container>
      <Box
        sx={{
          pt: 4,
          pb: 2,
        }}
      >
        <Typography
          component="h1"
          variant="h7"
          align="left"
          color="text.primary"
          fontSize="40px"
        >
          Buy/Sell Land on Action {category?.toUpperCase()}
        </Typography>
      </Box>
      <br />
      <Grid container spacing={0} style={{ width: "100%" }}>
        <Grid item xs={12} sm={12} md={6}>
          <Grid container spacing={0} style={{ width: "80%" }}>
            {tokens && tokens?.length > 0 ? (
              tokens?.map((item) => {
                return (
                  <>
                    <NftCard tokenId={item?.token} />
                  </>
                );
              })
            ) : loading ? (
              <Grid item xs={12} sm={12} md={12}>
                <Loader count="5" xs={12} sm={6} md={2.4} />
              </Grid>
            ) : (
              <Grid item xs={12} sm={12} md={12}>
                <h3>No NFT available</h3>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={3}></Grid>
        <Grid item xs={12} sm={12} md={3}>
          <IndicationTable />
        </Grid>
      </Grid>

      <div style={{ marginTop: 50 }}></div>
    </Container>
  );
}