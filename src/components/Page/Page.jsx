import "./Page.scss";
import App from "../../App";
import { useContext, useState, useMemo } from "react";
import react, {useEffect} from "react";
import { BrowserRouter,Navigate, Route, Routes } from "react-router-dom";
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
import Profile from "./Profile";

function Page() {
  const [auth, setAuth] = useState(true);
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    console.log(isAuthenticated)
    if(isAuthenticated){
      setAuth(true)
    }
    else{
      setAuth(false)
    }
  },[]);
  useEffect(()=>{
    console.log(auth)
  },[auth])
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
          path="/home"
          element={
            auth?
            <>
              <Header key={"Header"} />
              <Home />
              <Footer key={"Footer"} />
            </>:
            <Navigate to="/"/>
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
