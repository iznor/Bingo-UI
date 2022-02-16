import "./Manage.scss";
// import "./Edit.scss";
import ParkCard from "./ParkCard.jsx";
import Add from "./EditForm.jsx";
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { set } from "date-fns/esm";
import EmptyPageMessage from "./EmptyPageMessage/EmptyPageMessage";

function Manage() {
  const [editMode, setEditMode] = useState(true);
  const [parkingList, setParkingList] = useState([]);
  // const [filteredParking, setFilteredParking] = useState([]);

  useEffect(() => {
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
    });
  }, []);



  const renderParking = useCallback(() => {
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
            editMode={editMode}
            key={parking.parkingId}
            {...parking}
            onDeleteClick={deleteParking}
            onEditClick={editParking}
          />
        );
    });}
  }, [parkingList]);

  const deleteParking = (parkingId) => {
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
        console.log("Delete successful");
      });
      setParkingList((prevState) => {
        return prevState.filter((parking) => parking.parkingId !== parkingId);
      });
    }

    deletePost();
  };

  const editParking = (parkingId) => {
    console.log(parkingId);

    return <Add parkingid={parkingId} />;
  };

  return (
    <div className="my-parkings">
      {renderParking()}
    </div>
  );
}
export default Manage;
