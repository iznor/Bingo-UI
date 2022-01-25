import "./Page.scss";
import "./Header";
import App from "../../App";
import Main from "./Main";
import Footer from "./Footer";
import Header from "./Header";
import { useContext, useState, useMemo } from "react";
import react from "react";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import ReactDOM from "react-dom";
import LoginFooter from "./footers/Login";
import LoginHeader from "./headers/Index";
import Index from "./Index";
import Login from "./Login";
import HomeHeader from "./headers/Home";
import AddHeader from "./headers/Add";
import HomeFooter from "./footers/Home";
import Home from "./Home";
import Map from "./Map";
import Edit from "./Edit";
import Add from "./Add";

function Page() {
  return (
    <div className="page-wrap">
      <Routes>
        <Route path="/" element={<>
          <LoginHeader key={'loginHeader'} />
          <Index />
          <LoginFooter key={'loginFooter'}/>
        </>}>
        </Route>
        <Route path="/login" element={<>
          <LoginHeader key={'loginHeader'} />
          <Login />
          <LoginFooter key={'loginFooter'}/>
        </>}>
        </Route>
        <Route path="/home" element={<>
          <HomeHeader key={'HomeHeader'} />
          <Home />
          <HomeFooter key={'HomeFooter'}/>
        </>}>
        </Route>
        <Route path="/add" element={<>
          <AddHeader key={'AddHeader'} />
          <Add />
          <HomeFooter key={'HomeFooter'}/>
        </>}>
        </Route>
        <Route path="/edit" element={<>
          <HomeHeader key={'HomeHeader'} />
          <Edit />
          <HomeFooter key={'HomeFooter'}/>
        </>}>
        </Route>
        <Route path="/find" element={<>
          <HomeHeader key={'HomeHeader'} />
          <Map />
          <HomeFooter key={'HomeFooter'}/>
        </>}>
        </Route>
     
      </Routes>
      
    </div>
  );
}

export default Page;
//look for react switch / router
