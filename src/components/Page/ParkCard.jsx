//PARK CARD -> NOT HOME !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Add from "./EditForm.jsx";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md"
// const card = (address, dates) => {
//   return (
//     <div className="card">
//       <h1>{address}</h1>
//       <h2>{dates}</h2>
//       <h3>delete</h3>
//     </div>
//   );
// };


function ParkCard({ parkingId, person, lastName, phoneNumber, dateStart, dateEnd, location, price, email, onDeleteClick, onEditClick }) {
  return (
    <div className="card-row" >
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

      {/* <Link to={"/manage/edit"}>
          {card(props.name.person.firstName,props.name.dateStart)}
        </Link> */}
    </div>
  );
}
export default ParkCard;
