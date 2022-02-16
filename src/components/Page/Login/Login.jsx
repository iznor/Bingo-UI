import "./Login.scss";
import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

 localStorage.setItem("isAuthenticated", false);

function Login() {
  const navigate = useNavigate();
  const [details, setDetails] = useState({ email: "", password: "" });
  const submitHandler = async (e) => {
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
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("token", `Bearer ${obj.token.token}`);
      localStorage.setItem("email", `${details.email}`);
      navigate("/find");
    } else {
      console.log("Failed To Login");
    }
  };
  return (
    <div className="index login">
      <form onSubmit={submitHandler}>
        <input
          name="email"
          type="email"
          placeholder="E-Mail"
          onChange={(e) => setDetails({ ...details, email: e.target.value })}
          value={details.email}
        />
        <input
          name="Password"
          type="password"
          autoComplete="false"
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
