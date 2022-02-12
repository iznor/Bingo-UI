import "./Manage.scss";
import "./Edit.scss";
import "./ParkCard.scss";
import ParkCard from "./ParkCard.jsx";
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { set } from "date-fns/esm";
//const [myParkings, setMyParkings] = useState(BRING FROM DATABASE: select * from parkings where email==default@gmail.com)

function Manage({ COMPONENT }) {
  const [parkingList, setParkingList] = useState([]);
 
  useEffect(() => {
    const datab =  axios({
      method: "Get",
      url: "https://bingo-parking.herokuapp.com/api/parkings",
    })
    .then((datab) => {
      const data = JSON.stringify(datab.data);
      const obj = JSON.parse(data);
      setParkingList(obj);
    })
  }, []);
  
  const filteredParking = parkingList.filter((user) => user.email === "default@gmail.com");
  console.log(filteredParking);
  return (
      <div className="my-parkings">   
      {filteredParking.map((result, i) => (
        <ParkCard name={result} key={result.parkingId}></ParkCard>
      ))}
    </div>
  );
}
export default Manage;
