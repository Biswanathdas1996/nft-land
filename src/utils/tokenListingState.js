import Grass from "../assets/images/grass.jpg";
import Pool from "../assets/images/pool.jpg";
import Market from "../assets/images/trade-tent-with-fresh-vegetables-vector-17234481.jpg";
import Hospital from "../assets/images/hospital.png";
import Road from "../assets/images/road.png";

import pool from "../assets/pool.jpg";
import road from "../assets/road.png";
import store from "../assets/store.jpg";
import hospital from "../assets/hospital.png";
import park from "../assets/grass.jpg";

export const allStates = [
  {
    id: "1",
    type: "For sale",
    value: "Listable",
  },
  {
    id: "2",
    type: "Not for sale",
    value: "Visible",
  },
  {
    id: "3",
    type: "Private",
    value: "Privet",
  },
  {
    id: "4",
    type: "Park",
    value: "Park",
  },
  {
    id: "5",
    type: "Hospital",
    value: "Hospital",
  },
  {
    id: "6",
    type: "Market",
    value: "Market",
  },
  {
    id: "7",
    type: "Pool",
    value: "Pool",
  },
  {
    id: "8",
    type: "Road",
    value: "Road",
  },
];

export const accessablity = {
  Listable: "1",
  Visible: "2",
  Privet: "3",
  Park: "4",
  Hospital: "5",
  Market: "6",
  Pool: "7",
  Road: "8",
};

export const badgeUI = (listingState) => {
  switch (listingState) {
    case "1":
      return "#FFBF00";
    case "2":
      return "#DFFF00";
    case "3":
      return "#DE3163";
    case "4":
      return Grass;
    case "5":
      return Hospital;
    case "6":
      return Market;
    case "7":
      return Pool;
    case "8":
      return Road;

    default:
    // code block
  }

  if (listingState === "3") {
    return "white";
  } else if (listingState === "2") {
    return "white";
  } else if (listingState === "1") {
    return "white";
  }
};

export const getTokenListingState = (id) => {
  const filterData = allStates.find((val) => val.id === id);
  return filterData?.type;
};

export const userAllowedActions = ["1", "2", "3"];

// asset those are having img on the map
export const assetHavingImage = ["4", "7", "6", "5", "8"];

export const modelViewProps = [
  {
    satate: "1",
    props: {
      height: 2,
      length: 2,
      width: 2,
      color: "rgb(255, 191, 0)",
    },
  },
  {
    satate: "2",
    props: {
      height: 2,
      length: 2,
      width: 2,

      color: "rgb(255, 180, 0)",
    },
  },
  {
    satate: "3",
    props: {
      height: 2,
      length: 2,
      width: 2,

      color: "red",
    },
  },
  {
    satate: "4",
    props: {
      height: 2,
      length: 1,
      width: 2,

      color: "white",
      img: park,
    },
  },
  {
    satate: "5",
    props: {
      height: 2,
      length: 4,
      width: 2,

      color: "white",
      img: hospital,
    },
  },
  {
    satate: "6",
    props: {
      height: 2,
      length: 2,
      width: 2,

      color: "white",
      img: store,
    },
  },
  {
    satate: "7",
    props: {
      height: 2,
      length: 1,
      width: 2,

      color: "white",
      img: pool,
    },
  },
  {
    satate: "8",
    props: {
      height: 2,
      length: 1,
      width: 2,

      color: "white",
      img: road,
    },
  },
];

export const getModelViewProps = (tokenState) => {
  return modelViewProps?.filter(
    (val) => val?.satate?.toString() === tokenState?.toString()
  );
};
