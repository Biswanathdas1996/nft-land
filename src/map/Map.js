import React, { useState, useEffect } from "react";
import { withGoogleMap, withScriptjs, GoogleMap } from "react-google-maps";
import mapStyles from "./mapStyles";
import { _fetch, _account } from "../CONTRACT-ABI/connect";
import NftArea from "./NftArea";

function Map({ defaultCenter, defaultZoom }) {
  const [tokens, setToken] = useState([]);
  const [account, setAccount] = useState(false);

  useEffect(() => {
    fetchAllPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchAllPosts() {
    setToken([]);
    const getAllToken = await _fetch("getCollection");
    console.log("====>", getAllToken);
    setToken(getAllToken);
    const account = await _account();
    setAccount(account);
  }

  function handleClick(event) {
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();
    console.log("------>lat", lat);
    console.log("------>lng", lng);
  }

  return (
    <GoogleMap
      defaultZoom={defaultZoom}
      defaultCenter={defaultCenter}
      defaultOptions={{ styles: mapStyles }}
      onClick={(e) => handleClick(e)}
    >
      {tokens?.map((tokenData) => (
        <NftArea tokenId={tokenData?.token} account={account} />
      ))}
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function App({ width, height, defaultCenter, defaultZoom }) {
  return (
    <div style={{ width: width || "100vw", height: height || "100vh" }}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${"AIzaSyAet8Mk1nPvOn_AebLE5ZxXoGejOD8tPzA&amp"}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        defaultCenter={
          defaultCenter || { lat: 22.567769055533113, lng: 88.44229123066064 }
        }
        defaultZoom={defaultZoom || 15}
      />
    </div>
  );
}
