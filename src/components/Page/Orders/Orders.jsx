import {
  BrowserRouter,
  Link,
  Switch,
  Route,
  useParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import "./Orders.scss";
import "../ParkCard.scss";
import ParkCard from "../ParkCard.jsx";
import EmptyPageMessage from "../EmptyPageMessage/EmptyPageMessage";
const axios = require("axios");

const loggedInUser = localStorage.getItem("email");



function Orders() {
  const [parkingList, setParkingList] = useState([]);
  const [editMode, setEditMode] = useState(false);

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
    });
  }, []);

  const renderParking = useCallback(() => {
    if (!parkingList.length) {
      return EmptyPageMessage("No orders have been made yet.", "Find parking", "/find");
    } else {
      return parkingList.map((parking) => {
        return <ParkCard editMode={editMode} key={parking.parkingId} {...parking} />;
      });
    }
  }, [parkingList]);

  return <div className="my-parkings">{renderParking()}</div>;
}
export default Orders;
