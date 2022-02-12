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
    console.log("useEffect")
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

  const renderParking = useCallback(() => {
    console.log("renderParking")
    
    return parkingList.map((parking) => {
        return <ParkCard key={parking.parkingId} {...parking} onDeleteClick={deleteParking} />;
    });
  }, [parkingList]);

  const deleteParking = (parkingId) => {
    console.log("delete")
    console.log(parkingId);
    async function deletePost() {
        await axios.delete(`https://bingo-parking.herokuapp.com/api/parkings/${parkingId}`)
        .then(res => {
          const users = res.data;
          console.log(users);
          console.log('Delete successful');
        })
        setParkingList((prevState) => {
        return prevState.filter((parking) => parking.parkingId !== parkingId);
        });

    }
    
    deletePost();
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
