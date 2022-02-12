import "./Page.scss";
import App from "../../App";
import { useContext, useState, useMemo } from "react";
import react from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom";
import LoginFooter from "./footers/Login";
import LoginHeader from "./headers/Index";
import Index from "./Index";
import Login from "./Login";
import Header from "./headers/Header";
import Footer from "./footers/Footer";
import Home from "./Home";
import Map from "./Map";
import Manage from "./Manage";
import Add from "./Add";
import EditForm from "./EditForm";
import Contract from "./Contract";


function Page() {
  return (
    <div className="page-wrap">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <LoginHeader key={"loginHeader"} />
              <Index />
              <LoginFooter key={"loginFooter"} />
            </>
          }
        ></Route>
        <Route
          path="/login"
          element={
            <>
              <LoginHeader key={"loginHeader"} />
              <Login/>
              <LoginFooter key={"loginFooter"} />
            </>
          }
        ></Route>
        <Route
          path="/home"
          element={
            <>
              <Header key={"Header"} />
              <Home />
              <Footer key={"Footer"} />
            </>
          }
        ></Route>
        <Route
          path="/add"
          element={
            <>
              <Header key={"Header"} />
              <Add />
              <Footer key={"Footer"} />
            </>
          }
        ></Route>
        <Route
          path="/manage"
          element={
            <>
              <Header key={"Header"} />
              <Manage />
              <Footer key={"Footer"} />
            </>
          }
        ></Route>
        <Route path="/manage/edit" element={
            <>
            <Header key={"Header"} />
            <EditForm />
            <Footer key={"Footer"} />
          </>
      }
        ></Route>
        <Route
          path="/find"
          element={
            <>
              <Header key={"Header"} />
              <Map />
              <Footer key={"Footer"} />
            </>
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <>
              <Header key={"Header"} />
              {/* <Map /> */}
              <Footer key={"Footer"} />
            </>
          }
        ></Route>
        <Route
          path="/contract"
          element={
            <>
              <Header key={"Header"} />
              <Contract />
              <Footer key={"Footer"} />
            </>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default Page;
