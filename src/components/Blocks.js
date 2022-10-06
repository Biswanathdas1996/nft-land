import React, { useEffect, useState } from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

import park from "../assets/grass.jpg";
import { _fetch, _account } from "../CONTRACT-ABI/connect";
import {
  badgeUI,
  userAllowedActions,
  assetHavingImage,
  getModelViewProps,
} from "../utils/tokenListingState";
import { isAdmin } from "../utils/isAdmin";

export default function Blocks({ tokenId, onClickHandler }) {
  const [account, setAccount] = useState(null);
  const [owner, setOwner] = useState(null);
  const [listingState, setListingState] = useState(null);
  const [position, setPosition] = useState(null);
  const [scale, setScale] = useState([1, 1, 1]);

  useEffect(() => {
    fetchNftInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchNftInfo() {
    // setLoading(true);
    const getOwner = await _fetch("ownerOf", tokenId);
    setOwner(getOwner);
    const getTokenListingState = await _fetch("getTokenListingState", tokenId);
    setListingState(getTokenListingState?.tokenState);
    const currentPosition = await _fetch("getTokenPosition", tokenId);
    setPosition(currentPosition);
    const account = await _account();
    setAccount(account);
  }

  //
  const data = getModelViewProps(listingState)[0]?.props;
  const { height, length, width, color, img } = data || [];

  const texture = useLoader(THREE.TextureLoader, img || park);
  return (
    <mesh
      position={[position?.x, position?.y, position?.z]}
      onDoubleClick={(e) => onClickHandler(tokenId)}
      onPointerOver={(e) => setScale([1, 1.3, 1])}
      onPointerOut={(e) => setScale([1, 1, 1])}
      scale={scale}
      style={{ cursor: "pointer" }}
    >
      <boxGeometry args={[height, length, width]} />
      <meshStandardMaterial
        color={color}
        map={img && texture}
        toneMapped={false}
      />
    </mesh>
  );
}
