import "./App.scss";
import "./components/Page/Page";
import Page from "./components/Page/Page";
import { useState } from "react";

function App() {
  const [signup, setSignup] = useState();
  const [login, setLogin] = useState();
  const [profile, setProfile] = useState();
  const [main, setMain] = useState();
  const [publish, setPublish] = useState();
  const [edit, setEdit] = useState(); //
  const [reserved, setReserved] = useState(); //rserved->cancel existing || new reservation || chat with seller
  const [details, setDetails] = useState(); //rserved->cancel existing || new reservation || chat with seller
  return (
    <div className="wrapper">
      <Page></Page>
    </div>
  );
}

export default App;
