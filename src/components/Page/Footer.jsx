import backButton from "../../assets/img/back.svg";
import { useState } from "react";

const style = {
  position: "fixed",
  bottom: "0px",
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: "75px",
  justifyContent: "space-between",
  // border: "1px black solid",
};
const buttonsContainer = {
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: "100%",
  justifyContent: "space-between",
  maxWidth: "800px",
  // border: "1px black solid",
};

const button = {
  // marginLeft: "35px",
  padding: "0px",
  backgroundImage: `url(${backButton})`,
  backgroundColor: "transparent",
  backgroundSize: "cover",
  border: "none",
  width: "35px",
  height: "35px",
};

function Footer() {
  return (
    <footer style={style}>
      <container style={buttonsContainer}>
        <button id="profile" style={button}></button>
        <button id="" style={button}></button>
        <button id="" style={button} backgroundImage={backButton}></button>
      </container>
    </footer>
  );
}

export default Footer;
