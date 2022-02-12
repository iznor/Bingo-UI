//PARK CARD -> NOT HOME !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
// const card = (address, dates) => {
//   return (
//     <div className="card">
//       <h1>{address}</h1>
//       <h2>{dates}</h2>
//       <h3>delete</h3>
//     </div>
//   );
// };


function ParkCard({ parkingId, person,lastName,phoneNumber,dateStart,dateEnd, location, price,email, onDeleteClick }) {
  // console.log(parkingId);
  // console.log(person.firstName);
  // console.log(dateEnd);
  // console.log(email);
  // console.log(props.parkingList);
  // const [newParkings, setnewParkings] = useState([]);
  // setnewParkings(props.parkingList);

  // const handleRemoveItem = e => {
  //   console.log("delete");
  //   const name = e.target.getAttribute("name");
  //   console.log(name);
  //   // updateList(list.filter(item => item.name !== name));
  //   // console.log(props.name.person.firstName);
  //   // props.setParkingList(props.parkingList.slice(props.parkingList.indexOf(e.target.name, 1)))
  // }
  return (
    <div className="card-row" >
      
      {/* {props.parkingList.map(item => {
        return (
          <> */}
          <div className="card">
           <h1>{person.firstName}</h1>
           <h2>{dateStart}</h2>
            <span onClick={() => onDeleteClick(parkingId)} >
              delete 
           </span>
            </div>
          {/* </>
        );
      })} */}
     
      {/* <Link to={"/manage/edit"}>
          {card(props.name.person.firstName,props.name.dateStart)}
        </Link> */}
    </div>
  );
}
export default ParkCard;
