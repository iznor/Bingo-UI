import { Link } from "react-router-dom";
import "./Footer.scss";
import {handleActive } from "../constants/GlobalFunctions"

const buttonsMain = () => {
  
  return (
    <>
      <Link to={"/orders"}><button id="orders-icon" style={handleActive("/orders")}></button></Link>
      <Link to={"/manage"}><button id="manage-icon" style={handleActive("/manage")}></button></Link>
      <Link to={"/find"}><button id="find-icon" style={handleActive("/find")}></button></Link>
      <Link to={"/add"}><button id="add-icon" style={handleActive("/add")}></button></Link>
    </>
  );
};

function Footer() {
  return (
    <footer>
      <div className="container">{buttonsMain()}</div>
    </footer>
  );
}
export default Footer;
