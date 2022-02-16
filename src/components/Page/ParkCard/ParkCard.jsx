import {useState } from 'react';
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md"
import { myApiKey } from "../Map/GoogleMaps";
import Geocode from "react-geocode";
import "../Manage/Manage.scss";

Geocode.setApiKey(myApiKey);
Geocode.setLanguage("en");
Geocode.setRegion("es");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();

function displayEditDelete(parkingId,onDeleteClick, onEditClick) {
  return(
  <div className="row">
  <button className="approval-icon">
    <MdDelete className="plus-icon delete-button" onClick={() => onDeleteClick(parkingId)} />
  </button>
  <button className="cancel-icon">
  <Link  to={"/manage/edit"} state={{id :parkingId}} >
    < MdModeEdit className="plus-icon"
    />
    </Link>
  </button>
  </div>
  )
}

function displayNavigateSuggestion(lat,lng) {
  return(
    <div className="row">
    <a  className="waze" 
    href={`https://www.waze.com/ul?ll=${lat}%2C${lng}&navigate=yes&zoom=17`}
    target="_blank"><button
    ></button></a>
    </div>
    )
  
}


function ParkCard({ editMode, parkingId, person, lastName, phoneNumber, dateStart, dateEnd, location, price, email, onDeleteClick, onEditClick }) {

  const [address, setAddress] = useState('')
  Geocode.fromLatLng(location.lat, location.lng).then(
    (response) => {
      const res = response.results[0].formatted_address.split(",");
      const address = `${String(res[0])}, ${String(res[1])}`;
      setAddress(()=>address)
    });
    return (
    
    <div className="cards-wrapper" >
    <div className="card-row" >
      <div className="card">
      <table>
        <tbody>
        <tr>
          <td className="address" style={address.length >20 ? {fontSize:'24px'} : {fontSize:'28px'}} >{address}</td>
        </tr>
        <tr>
          <td className="date">
          {new Date(dateStart).toLocaleString('en-GB', { timeZone: 'UTC' }).slice(0,10).slice(0,5)}
          &nbsp;-&nbsp;
          {new Date(dateEnd).toLocaleString('en-GB', { timeZone: 'UTC' }).slice(0,10).slice(0,5)}
          </td>
        </tr>
        <tr>
          <td className="price" style={editMode ? {color:"green"} : {color:"#8a0000"}}>{price}$</td>
        </tr>
        </tbody>
      </table>
      {editMode ? displayEditDelete(parkingId, onDeleteClick, onEditClick) : displayNavigateSuggestion(location.lat,location.lng)}
      </div>
    </div>
    </div>
  );
}
export default ParkCard;
