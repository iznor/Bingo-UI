import "./Header.scss";
import Add from "./headers/Add";
import HomeHeader from "./headers/Home";
import IndexHeader from "./headers/Index";
import Profile from "./headers/Profile";
import { BrowserRouter, Link, Switch, Route, Routes } from "react-router-dom";

function Header() {
  return (
    <>
      <Routes>
        <Route exact path={"/"} component={IndexHeader} element={<IndexHeader/>}></Route>
        <Route exact path={"/login"} component={IndexHeader} element={<IndexHeader/>}></Route>
        <Route exact path={"/home"} component={HomeHeader} element={<HomeHeader/>}></Route>
        <Route exact path={"/edit"} component={HomeHeader} element={<HomeHeader/>}></Route>
        <Route exact path={"/add"} component={Add} element={<Add/>}></Route>
        <Route path={"/edit"} component={console.log("EDIT-todo")} element={"todo"}></Route>
      </Routes>
    </>
  );
}

export default Header;
