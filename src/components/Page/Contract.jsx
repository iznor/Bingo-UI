import {BrowserRouter,Link,Switch,Route,useParams,useLocation,}
from "react-router-dom";
import { useState } from "react";
import {InfoWindow} from "@react-google-maps/api";
import "./Contract.scss";
import { isVisible } from "@testing-library/user-event/dist/utils";
const axios = require("axios");

function Contract() {
  // const [finalBox, setFinalBox] = useState(false);
  const search = useLocation().search;
  const parkingId = new URLSearchParams(search).get("id");
  const fname = new URLSearchParams(search).get("fname");
  const lname = new URLSearchParams(search).get("lname");
  const phone = new URLSearchParams(search).get("phone");
  const email = new URLSearchParams(search).get("email");
  const startDate = new URLSearchParams(search).get("startdate");
  const endDate = new URLSearchParams(search).get("startdate");
  const address = new URLSearchParams(search).get("address");
  const price = new URLSearchParams(search).get("price");
  

  const handleSubmit = async() => {
    const token = localStorage.getItem("token");
    const res = await axios({
      headers: {
        authorization: token
      },
      method: 'put',
      url: `https://bingo-parking.herokuapp.com/api/parkings/${parkingId}`,
      data: {
          active: 'False'
      }
    });
  };
  const handleWhatsapp = () => {
    console.log(phone);
    window.location.href = `https://wa.me/+972${phone}`;
  };
  const handleShareParkingInWhatsapp = () => {
    console.log(phone);
    window.location.href = `https://wa.me/send?+972&text=Bingo !      \nI found a parking that might interest you in:      \n${address}.      Start date: ${startDate} 
    \n      End date: ${endDate}.\n      Price: ${price}$\n      You can contact the parking owner - ${fname} ${lname}       in his cellphone: ${phone}`;
  };
  return (
    <div className="contract-wrapper">
      <h1>Parking Contract</h1>
      <h4>1. Owner Details:</h4>
      <table>
        <tbody>
        <tr>
          <td className="left-cell">Name</td>
          <td>
            {fname[0].toUpperCase() + fname.slice(1)}{" "}
            {lname[0].toUpperCase() + lname.slice(1)}
          </td>
        </tr>
        <tr>
          <td className="left-cell">Phone</td>
          <td>
            {`${phone.slice(0, 3)}-${phone.slice(3)}`}{" "}
            <button id="whatsapp-chat" onClick={handleWhatsapp}></button>
          </td>
        </tr>
        <tr>
          <td className="left-cell">E-Mail</td>
          <td>{email}</td>
        </tr>
        </tbody>
      </table>
      <h4>2. Parking Details:</h4>
      <table>
        <tbody>
        <tr>
          <td className="left-cell">Address</td>
          <td className="address-cell">{address}</td>
        </tr>
        <tr>
          <td className="left-cell">Start Date</td>
          <td>{startDate}</td>
        </tr>
        <tr>
          <td className="left-cell">End Date</td>
          <td>{endDate}</td>
        </tr>
        <tr>
          <td className="left-cell">Price</td>
          <td>{price}$</td>
        </tr>
        </tbody>
      </table>
      <h4>3. Legal Statement</h4>
      <p>
        By signing this contract I am fully aware and agree to bingo &copy;
        terms of conditions and policy.
      </p>
      <h4>4. Payment Method</h4>
      <p>Visa ending with ****2847.</p>
      <div className="buttons">
        <button className="share-btn" onClick={handleShareParkingInWhatsapp}>
          Share
        </button>
        <Link to={"/find"}><button onClick={handleSubmit}>Sign</button></Link>
      </div>
    </div>
  );
}
export default Contract;
