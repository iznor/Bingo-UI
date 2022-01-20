import "./Main.scss";
import "./Home.scss";
import { BrowserRouter, Link, Switch, Route, Routes } from "react-router-dom";

const button = (divId, title) => {
  return (
    <button>
      <h1>{title}</h1>
      <div id={divId}></div>
    </button>
  );
};

function Home() {
  return (
    <div className="home-page">
      <div className="row">
        <Link to={"/find"}>{button("reserve", "Find")}</Link>
        <Link to={"/add"}>{button("publish", "Add")}</Link>
      </div>
      <div className="row">
        <Link to={"/edit"}>{button("edit", "Edit")}</Link>
        <Link to={"/history"}>{button("history", "History")}</Link>
      </div>
    </div>
  );
}
export default Home;
