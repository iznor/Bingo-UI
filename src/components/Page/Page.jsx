import "./Page.scss";
import "./Header";
import App from "../../App";
import Main from "./Main";
import Footer from "./Footer";
import Header from "./Header";
import { useContext, useState } from "react";
import react from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";


function Page({Login_to_our_project , error}) {
  return (
    <div className="page-wrap">
        <Header></Header>
        <Main Login_to_our_project={Login_to_our_project} error ={error} ></Main>
        <Footer></Footer>
      </div>

);
}

export default Page;
//look for react switch / router