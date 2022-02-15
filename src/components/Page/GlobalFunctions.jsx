import { useLocation } from "react-router-dom";
import { myApiKey } from "../../keys/GoogleMaps";
import axios from "axios";

export function CurrentPath() {
  const location = useLocation();
  return location.pathname;
}

//highlight current path's matching button
export const handleActive = (path) => {
  return CurrentPath() === path
    ? { boxShadow: "#fffefcf8 0px 0px 30px 5px", backgroundColor: "#fff5d3c5" }
    : null;
};

export const fetchAddress = (lat, lng) => {
  const currCityUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true&key=${myApiKey}`;
  const res = currCityUrl.results[0].formatted_address.split(",");
  return `${String(res[0])}, ${String(res[1])}`;
};
