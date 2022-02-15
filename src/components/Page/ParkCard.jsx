import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Add from "./EditForm.jsx";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md"
import {fetchAddress} from "./GlobalFunctions"
import { myApiKey } from "../../keys/GoogleMaps";
import axios from "axios";
import Geocode from "react-geocode";

Geocode.setApiKey(myApiKey);
Geocode.setLanguage("en");
Geocode.setRegion("es");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();

function ParkCard({ parkingId, person, lastName, phoneNumber, dateStart, dateEnd, location, price, email, onDeleteClick, onEditClick }) {
const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map, post) => {
    mapRef.current = map;
    
  Geocode.fromLatLng(location.lat, location.lng).then(
    (response) => {
      const res = response.results[0].formatted_address.split(",");
      const address = `${String(res[0])}, ${String(res[1])}`;
      console.log(address);
    },
    (error) => {
      console.error(error);
    }, []);
  });
  // console.log(address);
    return (
    <div onLoad={onMapLoad} className="card-row" >
      <div className="card">
        <h1>{person.firstName}</h1>
        <h2>{dateStart}</h2>
        <div className="row">
        <button className="approval-icon">
          <MdDelete className="plus-icon" onClick={() => onDeleteClick(parkingId)} />
        </button>
        <button className="cancel-icon">
        <Link  to={"/manage/edit"} state={{id :parkingId}} >
          < MdModeEdit className="plus-icon"
           />
          </Link>
        </button>
      </div>
      </div>
    </div>
  );
}
export default ParkCard;
