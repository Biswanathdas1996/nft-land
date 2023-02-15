import React, { useState, useEffect } from "react";
import { InfoWindow } from "react-google-maps";
import { Polygon } from "react-google-maps";
import {
  _fetch,
  _account,
  getContractAddress,
  getcurrentNetworkId,
} from "../CONTRACT-ABI/connect";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const getCid = (str) => {
  let ret = str.replace(".ipfs.dweb.link/ipfs.json", "");
  let ret2 = ret.replace("https://", "");
  return ret2;
};

export default function NftArea({ tokenId }) {
  const [nftData, setNftData] = useState(null);
  const [start, setStart] = useState(false);
  const [owner, setOwner] = useState(null);
  const [account, setAccount] = useState(null);
  const [price, setPrice] = useState(null);
  const [response, setResponse] = useState(null);
  const [address, setAddress] = useState(null);
  const [isDoingPayment, setIsDoingPayment] = useState(false);
  const [listingState, setListingState] = useState(null);
  const [selectedPark, setSelectedPark] = useState(null);
  let history = useNavigate();
  useEffect(() => {
    fetchNftInfo();
    getAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAddress = async () => {
    const networkIddarta = await getcurrentNetworkId();
    const cureentAccress = getContractAddress(networkIddarta);
    setAddress(cureentAccress);
  };

  async function fetchNftInfo() {
    const getAllTokenUri = await _fetch("tokenURI", tokenId);
    const getOwner = await _fetch("ownerOf", tokenId);
    setOwner(getOwner);
    const account = await _account();
    setAccount(account);
    const price = await _fetch("getNftPrice", tokenId);
    setPrice(price);
    const getTokenListingState = await _fetch("getTokenListingState", tokenId);
    setListingState(getTokenListingState?.tokenState);

    const cid = getCid(getAllTokenUri);
    console.log("-----getAllTokenUri>>>>>", getAllTokenUri);

    await fetch(`https://ipfs.io/ipfs/${cid}/ipfs.json`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setNftData(data);
      });
  }

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  const onLoad = (rectangle) => {
    console.log("rectangle: ", rectangle);
  };

  return (
    <>
      {nftData && (
        <Polygon
          onLoad={onLoad}
          paths={nftData?.attributes}
          onClick={() => {
            setSelectedPark({
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [
                  nftData?.attributes[0].lng,
                  nftData?.attributes[0].lat,
                ],
              },
            });
          }}
          options={{
            fillColor: "#ff00004a",
            fillOpacity: 1,
            strokeColor: "black",
            strokeOpacity: 1,
            strokeWeight: 2,
            clickable: true,
            draggable: false,
            editable: false,
            geodesic: false,
            zIndex: 1,
          }}
        />
      )}

      {/* <Polygon
        onLoad={onLoad}
        paths={[
          { lat: 22.576748702312948, lng: 88.36932614222225 },
          { lat: 22.576704122410302, lng: 88.36971774473842 },
          { lat: 22.576005702052612, lng: 88.36962118521389 },
          { lat: 22.57595121520921, lng: 88.36972310915645 },
          { lat: 22.57577289448012, lng: 88.36964800730404 },
          { lat: 22.57593140180624, lng: 88.36922421827968 },
          { lat: 22.576748702312948, lng: 88.36932614222225 },
        ]}
        options={{
          fillColor: "#0000ff8f",
          fillOpacity: 1,
          strokeColor: "black",
          strokeOpacity: 1,
          strokeWeight: 2,
          clickable: true,
          draggable: false,
          editable: false,
          geodesic: false,
          zIndex: 1,
        }}
      /> */}

      {selectedPark && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedPark(null);
          }}
          position={{
            lat: selectedPark.geometry.coordinates[1],
            lng: selectedPark.geometry.coordinates[0],
          }}
        >
          <div>
            <h3>Plot #{tokenId}</h3>
            <p>{nftData?.name}</p>
            <p style={{ fontWeight: "bold", color: "#b86804" }}>
              Owner: {account}
            </p>
            <Button
              variant="contained"
              size="large"
              sx={{
                marginBottom: "15px",
              }}
              onClick={() => history(`/details/${tokenId}`)}
              style={{
                fontSize: 12,
                padding: "5px 15px",
                borderRadius: 5,
              }}
            >
              View More
            </Button>
          </div>
        </InfoWindow>
      )}
    </>
  );
}
