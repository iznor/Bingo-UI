import "./Manage.scss";
import "./Edit.scss";
import "./ParkCard.scss";
import ParkCard from "./ParkCard.jsx";
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { set } from "date-fns/esm";
//const [myParkings, setMyParkings] = useState(BRING FROM DATABASE: select * from parkings where email==default@gmail.com)

function Manage({ COMPONENT }) {
  const [userList, setUserList] = useState([]);
 
  useEffect(() => {
    const datab =  axios({
      method: "Get",
      url: "https://bingo-parking.herokuapp.com/api/parkings",
    })
    .then((datab) => {
      const data = JSON.stringify(datab.data);
      const obj = JSON.parse(data);
      setUserList(obj);
    })
  }, []);
  
  const filteredPlayers = userList.filter((user) => user.email === "default@gmail.com");
  console.log(filteredPlayers);

  return (
    <div className="my-parkings">
    {filteredPlayers.map(parking =>{ 
        return <ParkCard name={parking} />
      })}
    </div>
  );
}
export default Manage;
