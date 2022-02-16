import "./Page.scss";
import {useEffect, useState} from "react";
import {Navigate, Route, Routes } from "react-router-dom";
import LoginFooter from "./footers/Login";
import LoginHeader from "./headers/Index";
import Index from "./Index/Index";
import Login from "./Login/Login";
import Header from "./headers/Header";
import Footer from "./footers/Footer";
import Map from "./Map/Map";
import Manage from "./Manage/Manage";
import Add from "./Add/Add";
import EditForm from "./Edit/EditForm";
import Contract from "./Contract/Contract";
import Profile from "./Profile/Profile";
import Orders from "./Orders/Orders";

function Page() {
  const [auth, setAuth] = useState(true);
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if(isAuthenticated){
      setAuth(true)
    }
    else{
      setAuth(false)
    }
  },[]);
  useEffect(()=>{
  },[auth])
  return (
    <div className="page-wrap">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Index />
              <LoginFooter key={"loginFooter"} />
            </>
          }
        />
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
          path="/add"
          element={
            auth?
            <>
              <Header key={"Header"} />
              <Add />
              <Footer key={"Footer"} />
            </>:
            <Navigate to="/"/>
          }
        ></Route>
        <Route
          path="/manage"
          element={
            auth?
            <>
              <Header key={"Header"} />
              <Manage />
              <Footer key={"Footer"} />
            </>:
            <Navigate to="/" />
          }
        ></Route>
        <Route
          path="/orders"
          element={
            auth?
            <>
              <Header key={"Header"} />
              <Orders />
              <Footer key={"Footer"} />
            </>:
            <Navigate to="/" />
          }
        ></Route>
        <Route 
          path="/manage/edit" 
          element={
            auth?
            <>
            <Header key={"Header"} />
            <EditForm />
            <Footer key={"Footer"} />
          </>:
          <Navigate to="/"/>
      }
        ></Route>
        <Route
          path="/find"
          element={
            auth?
            <>
              <Header key={"Header"} />
              <Map />
              <Footer key={"Footer"} />
            </>:
            <Navigate to="/" />
          }
        ></Route>
        <Route
          path="/profile"
          element={
            auth?
            <>
              <Header key={"Header"} />
              <Profile/>
              <Footer key={"Footer"} />
            </>:
            <Navigate to="/" />
          }
        ></Route>
        <Route
          path="/contract"
          element={
            auth?
            <>
              <Header key={"Header"} />
              <Contract />
              <Footer key={"Footer"} />
            </>:
            <Navigate to="/" />
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default Page;
