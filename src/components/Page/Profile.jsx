import line from "../../assets/img/line.svg";
import "./Profile.scss";
import { useState, useEffect } from "react";
const axios = require("axios");

const logout = () => {
  window.localStorage.clear();
  window.location.href = "/";
};

function Profile() {
  const [totalParkings, setTotalParkings] = useState(0);
  const [totalParkingsOwned, setTotalParkingsOwned] = useState(0);
  const [parkingList, setParkingList] = useState([]);
  const [parkingsOwnedList, setTotalParkingsOwnedList] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userOrders = axios({
      headers: {
        authorization: token,
      },
      method: "Get",
      url: `https://bingo-parking.herokuapp.com/api/user/${loggedInUser}/orders`,
    }).then((userOrders) => {
      const data = JSON.stringify(userOrders.data);
      const obj = JSON.parse(data);
      setParkingList(obj);
      setTotalParkings(() => obj.length);
    });

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
      setTotalParkingsOwnedList(obj.filter((user) => user.email === email));
      setTotalParkingsOwned(
        () => obj.filter((user) => user.email === email).length
      );
    });
  }, []);

  const loggedInUser = localStorage.getItem("email");
  let earnings=0;
  let paid=0;
  parkingsOwnedList.forEach((e) => {
    earnings+=e.price;
  });
  parkingList.forEach((e) => {
    paid+=e.price;
  });

  return (
    <div className="profile-page">
      <div className="profile-pic"></div>
      <div className="user-email">
        <p>{loggedInUser}</p>
      </div>
      <div className="details-row">
        <p>My parkings</p>
        <p>{totalParkingsOwned}</p>
      </div>
      <img className="line" src={line} />
      <div className="details-row">
        <p>Orders made</p>
        <p>{totalParkings}</p>
      </div>
      <img className="line" src={line} />
      <div className="details-row">
        <p>Balance</p>
        <p style={earnings-paid>=0 ? {color:"green"} : {color:"red"}}>{earnings-paid}$</p>
      </div>
      <img className="line" src={line} />
      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Profile;
