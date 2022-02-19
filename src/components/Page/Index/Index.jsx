import "./Index.scss";
import { Link } from "react-router-dom";
import {useState } from "react";
import LoginHeader from "../headers/Index";

function Index() {
  const [errSignup, setErrSignup] = useState("hidden")
  return (
    <div className="index">
      <LoginHeader></LoginHeader>
      <div className="buttons">
        <Link to="/login">
          <button>login</button>
        </Link>
        <button onClick={()=>{setErrSignup("visible"); setTimeout(()=>setErrSignup("hidden"), 4000)}}>signup</button>
      </div>
        <p style={{visibility:errSignup}}>Signup option will be released soon</p>
    </div>
  );
}
export default Index;
