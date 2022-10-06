import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  AccumulativeShadows,
  RandomizedLight,
  OrbitControls,
  Environment,
} from "@react-three/drei";
import { Suspense } from "react";
import FaltRow from "../mock/index";
import { Tree1, Tree2, Tree3 } from "../components/Tree";
import Blocks from "../components/Blocks";
import { useParams } from "react-router-dom";
import { _fetch, _account } from "../CONTRACT-ABI/connect";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import NFTCard from "../components/shared/NFT-Card";
import ListingStateUpdate from "../components/DetailsPage/ListingStateUpdate";
import LocationStateUpdate from "../components/DetailsPage/LocationStateUpdate";
import { useNavigate } from "react-router-dom";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  // height: 600,
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ViewModel() {
  const [tokens, setToken] = useState([]);
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState(false);
  const [value, setValue] = React.useState("1");
  const [clickedToken, setClickedToken] = useState(null);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { category } = useParams();
  let history = useNavigate();
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
    console.log("=======>", filterCollection);
    const account = await _account();
    setAccount(account);
    setLoading(false);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onClickHandler = (token) => {
    setClickedToken(token);
    handleOpen();
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Plot #{clickedToken}
          </Typography>
          <NFTCard tokenId={clickedToken} mediaHeight={200} />
          <Button
            onClick={() => history(`/details/${clickedToken}`)}
            variant="outlined"
            style={{ marginTop: 20 }}
          >
            View more
          </Button>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Property Type" value="1" />
                  <Tab label="Position" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                {" "}
                <ListingStateUpdate tokenId={clickedToken} account={account} />
              </TabPanel>
              <TabPanel value="2">
                <LocationStateUpdate tokenId={clickedToken} account={account} />
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
      </Modal>

      <Suspense
        fallback={
          <h1 style={{ color: "black", textAlign: "center", margin: 50 }}>
            Please wait while we load the page
          </h1>
        }
      >
        <Canvas
          shadows
          camera={{ position: [8, 1.5, 8], fov: 25 }}
          gl={{ antialias: false, logarithmicDepthBuffer: true }}
          style={{ height: 750 }}
        >
          <Tree1 position={[18.9, 0.5, 23.1]} />
          <Tree1 position={[17.9, 0.5, 23.1]} />
          <Tree2 position={[16.8, 0.5, 23.1]} />
          <Tree2 position={[14.6, 0.5, 23.1]} />
          <Tree3 position={[15.7, 0.5, 23.1]} />
          <Tree2 position={[18.9, 0.5, 21.1]} />
          <Tree2 position={[17.8, 0.5, 21.1]} />
          <Tree1 position={[16.7, 0.5, 21.1]} />
          <Tree1 position={[15.6, 0.5, 21.1]} />
          <Tree1 position={[14.6, 0.5, 21.1]} />
          <Tree2 position={[2.1, 0.5, 6.3]} />
          <AccumulativeShadows
            temporal
            frames={100}
            color="orange"
            colorBlend={2}
            toneMapped={true}
            alphaTest={0.9}
            opacity={2}
            scale={12}
            position={[100, -0.5, 100]}
          >
            <RandomizedLight
              amount={8}
              radius={4}
              ambient={0.5}
              intensity={1}
              position={[5, 5, -10]}
              bias={0.001}
            />
          </AccumulativeShadows>

          {/* {FaltRow.map((data) => {
          return <Blocks data={data} tokenId={1} />;
        })} */}
          {tokens.map((data) => {
            return (
              <Blocks tokenId={data.token} onClickHandler={onClickHandler} />
            );
          })}
          <OrbitControls autoRotate={false} />
          <Environment preset="city" />
        </Canvas>
      </Suspense>
    </>
  );
}
