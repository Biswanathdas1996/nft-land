import Grass from "../assets/images/grass.jpg";
import Pool from "../assets/images/pool.jpg";
import Market from "../assets/images/trade-tent-with-fresh-vegetables-vector-17234481.jpg";
import Hospital from "../assets/images/hospital.png";
import Road from "../assets/images/road.png";

export const allStates = [
  {
    id: "1",
    type: "For sell",
    value: "Listable",
  },
  {
    id: "2",
    type: "Not for sell",
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
