import "./Footer.scss";
import { useState } from "react";

const buttonsProfile = () => {
  return (
    <>
      <button id=""></button>
    </>
  );
};
const buttonsMain = () => {
  return (
    <>
      <button id="reserved"></button>
      <button id="home"></button>
      <button id="profile"></button>
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
