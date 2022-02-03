import "./App.scss";
import "./components/Page/Page";
import Page from "./components/Page/Page";
import {useState } from "react";
import {BrowserRouter, Link, Switch, Route} from "react-router-dom";


function App() {
  return (
      <div className="wrapper">
        <Page key={'#page'}></Page>
      </div>
  );
}

export default App;