import {BrowserRouter, Link, Switch, Route, useParams, useLocation} from "react-router-dom";
import { useEffect } from "react";

function Contract() {
  const search = useLocation().search;
  const parkingId = new URLSearchParams(search).get('id');
  const fname = new URLSearchParams(search).get('fname');
  const lname = new URLSearchParams(search).get('lname');
  const phone = new URLSearchParams(search).get('phone');
  const email = new URLSearchParams(search).get('email');
  const startDate = new URLSearchParams(search).get('startdate');
  const endDate = new URLSearchParams(search).get('startdate');
  const address = new URLSearchParams(search).get('address');
  const price = new URLSearchParams(search).get('price');
  console.log(parkingId);
  console.log(fname);
  return (
    <div className="home-page">
        {`
        parkingId:${parkingId}\n
        Address:${address}\n
        Name: ${fname} ${lname}\n
        Phone: ${phone}\n
        email: ${email}\n
        startDate: ${startDate}\n
        endDate: ${endDate}\n
        address: ${address}\n
        price: ${price}\n
    `}
    </div>
  );
}
export default Contract;
