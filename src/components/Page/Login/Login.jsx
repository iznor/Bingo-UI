import "./Login.scss";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

localStorage.setItem("isAuthenticated", false);

function Login() {
  const navigate = useNavigate();
  const [errorLogin, setErrorLogin] = useState("hidden");
  const [details, setDetails] = useState({ email: "", password: "" });
  const submitHandler = async (e) => {
    e.preventDefault();
    axios({
      headers: { "Access-Control-Allow-Origin": "*" },
      method: "Post",
      url: "https://bingo-parking.herokuapp.com/api/user/login",
      data: { email: details.email, password: details.password },
    })
      .then((data) => {
        data = JSON.stringify(data.data);
        const obj = JSON.parse(data);
        if (obj.token) {
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("token", `Bearer ${obj.token.token}`);
          localStorage.setItem("email", `${details.email}`);
          setErrorLogin(() => "hidden");
          navigate("/find");
        } else {
          console.log("Failed To Login");
          setErrorLogin(() => "visible");
        }
      })
      .catch((err) => {
        console.log(`Failed To Login, ${err}`);
        setErrorLogin(() => "visible");
      });
  };
  return (
    <div className="index login">
      <p style={{ visibility: errorLogin }}>*Incorrect email or password</p>
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
