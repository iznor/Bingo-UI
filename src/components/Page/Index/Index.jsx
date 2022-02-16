import "./Index.scss";
import { Link } from "react-router-dom";
import LoginFooter from "../footers/Login";
import LoginHeader from "../headers/Index";

function Index() {
  return (
    <div className="index">
      <LoginHeader></LoginHeader>
      <div className="buttons">
        <Link to="/login">
          <button>login</button>
        </Link>
        <button>signup</button>
      </div>
    </div>
  );
}
export default Index;
