import "./App.scss";
import "./components/Page/Page";
import Page from "./components/Page/Page";
import Home from "./components/Page/Home";
import {useState } from "react";
import {BrowserRouter, Link, Switch, Route} from "react-router-dom";

function App() {

  const [user , setUser] = useState({email : "" , password : ""})
  const [error , setError] = useState("")
  
  const Login_to_our_project = details => {
    console.log(details);
      setUser ({
        email : details.email ,
        password : details.password ,
      });
  }
  // const [signup, setSignup] = useState();
  // const [login, setLogin] = useState();
  // const [profile, setProfile] = useState();
  // const [main, setMain] = useState();
  // const [publish, setPublish] = useState();
  // const [edit, setEdit] = useState(); //
  // const [reserved, setReserved] = useState(); //rserved->cancel existing || new reservation || chat with seller
  // const [details, setDetails] = useState(); //rserved->cancel existing || new reservation || chat with seller
  return (
      <div className="wrapper">
        {(user.email != "") ? (
          <div>
            <h2>welcome , <span>{user.email}</span></h2>
            <button>logout</button>
          </div>
        ) : (
          <Page Login_to_our_project={Login_to_our_project} error ={error}/>
        )} 
      </div>
  );
}

export default App;