import "./Index.scss";
import {BrowserRouter, Link, Switch, Route} from "react-router-dom";

function Index() {
  return (
    <div className="index">
      <Link to="/login"><button>login</button></Link>
      <button>signup</button>
    </div>
  );
}
export default Index;
