import "./Main.scss";
import Index from "./Index";
import Login from "./Login";
import Home from "./Home";
import Edit from "./Edit";
import Map from "./Map";
import AddDetails from "./AddDetails";
import { BrowserRouter, Link, Switch, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom";
import App from "../../App";

function Main() {
  return (
    <>
      <Routes>
        <Route exact path={"/"} component={Index} element={<Index/>}></Route>
        <Route exact path={"/login"} component={Login} element={<Login/>}></Route>
        <Route exact path={"/home"} component={Home} element={<Home/>}></Route>
        <Route exact path={"/edit"} component={Edit} element={<Edit/>}></Route>
        <Route exact path={"/add"} component={Map} element={<Map/>}></Route>
        <Route exact path={"/add/details"} component={AddDetails} element={<AddDetails/>}></Route>
      </Routes>
    </>
  );
}

export default Main;
// ReactDOM.render(<BrowserRouter><App></App></BrowserRouter>, document.getElementById("root"));
