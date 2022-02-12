import "./Manage.scss";
import "./Edit.scss";
import "./ParkCard.scss";
import ParkCard from "./ParkCard.jsx";
import axios from "axios";
import React, { useEffect, useState ,useCallback} from 'react';
import { set } from "date-fns/esm";
//const [myParkings, setMyParkings] = useState(BRING FROM DATABASE: select * from parkings where email==default@gmail.com)

function Manage({ COMPONENT }) {
  const [parkingList, setParkingList] = useState([]);
  // const [filteredParking, setFilteredParking] = useState([]);
 
  useEffect(() => {
    const datab =  axios({
      method: "Get",
      url: "https://bingo-parking.herokuapp.com/api/parkings",
    })
    .then((datab) => {
      const data = JSON.stringify(datab.data);
      const obj = JSON.parse(data);
      setParkingList(obj.filter((user) => user.email === "default@gmail.com"));
    })
  }, []);
  
  // if(parkingList.length >1){
  //   console.log("hello");
  //   setParkingList(parkingList.filter((user) => user.email === "default@gmail.com"));
  //   console.log(parkingList);
  // }
  // setFilteredParking(parkingList.filter((user) => user.email === "default@gmail.com"));
  // const filteredParking = parkingList;
  // console.log(filteredParking);

  const renderParking = useCallback(() => {
    return parkingList.map((parking) => {
        return <ParkCard key={parking.parkingId} {...parking} onDeleteClick={deleteParking} />;
    });
  }, [parkingList]);

  const deleteParking = (parkingId) => {
    setParkingList((prevState) => {
      return prevState.filter((parking) => parking.parkingId !== parkingId);
    });
  };

  return (
      <div className="my-parkings">   
      {renderParking()}
        {/* {parkingList.map((result, i) => (
        <ParkCard name={result} key={result.parkingId} 
        setParkingList={setParkingList}
        parkingList = {parkingList}
        ></ParkCard>
       ))} */}
    </div>
  );
}
export default Manage;
