import "./Footer.scss";
import LoginFooter from "./footers/Login";
import HomeFooter from "./footers/Home";
import { useState } from "react";
import { BrowserRouter, Link, Switch, Route, Routes } from "react-router-dom";

function Footer() {
  return (
      <>
        <Routes>
          <Route path={"/"} component={LoginFooter} element={<LoginFooter/>}></Route>
          <Route path={"/login"} component={LoginFooter} element={<LoginFooter/>}></Route>
          <Route path={"/home"} component={HomeFooter} element={<HomeFooter/>}></Route>
          <Route path={"/edit"} component={HomeFooter} element={<HomeFooter/>}></Route>
          <Route path={"/add"} component={HomeFooter} element={<HomeFooter/>}></Route>
          <Route path={"/add/details"} component={HomeFooter} element={<HomeFooter/>}></Route>
        </Routes>
      </>
    );
  }
export default Footer;
