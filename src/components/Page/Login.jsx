import "./Login.scss";
import React, { useState } from "react";
import axios from "axios";
import { get } from "mongoose";
import { set } from "date-fns/esm";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

function Login({ Login_to_our_project, error }) {
  //AYHAM => implementation: what happens when user clicks "login"?
  const [details, setDetails] = useState({ email: "", password: "" });
  const [NotDefinde, setNotDefinde] = useState({ email: "", password: "" });

  const submitHandler = async (e) => {
    console.log("HI");
    e.preventDefault();
    const datab = await axios({
      headers: {"Access-Control-Allow-Origin": "*"},
      method: "Post",
      url: "https://bingo-parking.herokuapp.com/api/user/login",
      data: { email: details.email, password: details.password },
    });
    const data = JSON.stringify(datab.data);
    const obj = JSON.parse(data);
    if (obj.token) {
      console.log("SUCCESS");
      console.log(details.email);
      
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("token", `Bearer ${obj.token.token}`);
      localStorage.setItem("email", `${details.email}`);
      window.location.pathname = "/find";
    } else {
      console.log("FAIL");
    }
  };
  return (
    <div className="index login">
      <form onSubmit={submitHandler}>
        <input
          name="email"
          type="text"
          placeholder="E-Mail"
          onChange={(e) => setDetails({ ...details, email: e.target.value })}
          value={details.email}
        />
        <input
          name="Password"
          type="text"
          placeholder="Password"
          onChange={(e) => setDetails({ ...details, password: e.target.value })}
          value={details.password}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
export default Login;
