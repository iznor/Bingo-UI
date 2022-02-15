import "./Manage.scss";
import "./Edit.scss";
import "./ParkCard.scss";
import ParkCard from "./ParkCard.jsx";
import Add from "./EditForm.jsx";
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { set } from "date-fns/esm";
import EmptyPageMessage from "./EmptyPageMessage/EmptyPageMessage";

function Manage() {
  const [parkingList, setParkingList] = useState([]);
  // const [filteredParking, setFilteredParking] = useState([]);

  useEffect(() => {
    console.log("useEffect");
    const token = localStorage.getItem("token");
    const datab = axios({
      headers: {
        authorization: token,
      },
      method: "Get",
      url: "https://bingo-parking.herokuapp.com/api/parkings",
    }).then((datab) => {
      const data = JSON.stringify(datab.data);
      const obj = JSON.parse(data);
      const email = localStorage.getItem("email");
      setParkingList(obj.filter((user) => user.email === email));
      console.log(obj);
    });
  }, []);



  const renderParking = useCallback(() => {
    console.log("renderParking");
    if(!(parkingList.map((parking)=>{
      return (
        <ParkCard
          key={parking.parkingId}
          {...parking}
          onDeleteClick={deleteParking}
          onEditClick={editParking}
        />
      );
    }).length)){
      return   EmptyPageMessage(
        "No parkings owned.",
        "Add new",
        "/add"
        );
    }else{
    return parkingList.map((parking) => {
      console.log(parkingList);
        return (
          <ParkCard
            key={parking.parkingId}
            {...parking}
            onDeleteClick={deleteParking}
            onEditClick={editParking}
          />
        );
    });}
  }, [parkingList]);

  const deleteParking = (parkingId) => {
    console.log("delete");
    console.log(parkingId);
    async function deletePost() {
      const token = localStorage.getItem("token");
      const datab = axios({
        headers: {
          authorization: token,
        },
        method: "Delete",
        url: `https://bingo-parking.herokuapp.com/api/parkings/${parkingId}`,
      }).then((res) => {
        const users = res.data;
        console.log(users);
        console.log("Delete successful");
      });
      setParkingList((prevState) => {
        return prevState.filter((parking) => parking.parkingId !== parkingId);
      });
    }

    deletePost();
  };

  const editParking = (parkingId) => {
    console.log("Edit");
    console.log(parkingId);

    return <Add parkingid={parkingId} />;
    // async function deletePost() {
    //     await axios.delete(`https://bingo-parking.herokuapp.com/api/parkings/${parkingId}`)
    //     .then(res => {
    //       const users = res.data;
    //       console.log(users);
    //       console.log('Delete successful');
    //     })
    //     setParkingList((prevState) => {
    //     return prevState.filter((parking) => parking.parkingId !== parkingId);
    //     });

    // }

    // deletePost();
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
