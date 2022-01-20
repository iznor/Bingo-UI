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


function Page() {
  return (
    <div className="page-wrap">
        <Header></Header>
        <Main></Main>
        <Footer></Footer>
      </div>

);
}

export default Page;
//look for react switch / router