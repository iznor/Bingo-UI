import BackButton from "./BackButton";
import { CurrentPath, handleActive } from "../GlobalFunctions"
import { Link } from "react-router-dom";
import "./Header.scss";


const setH1 = (path)=>{
  switch (path) {
    case "/add":
      return "New Parking"
    case "/find":
      return "Find Parking"
    case "/manage":
      return "My Parkings"
    case "/manage/edit":
      return "Edit"
    case "/reservations":
      return "Your orders"
    case "/profile":
      return "Profile"
  
    default:
      break;
  }
}

function Header() {
    return (
      <header>
        {CurrentPath()==="/find"? null : <BackButton/>}
        <h1 style={{fontSize:"44px"}}>{setH1(CurrentPath())}</h1>
        <Link to={"/profile"}><button className="profile-button" style={handleActive("/profile")}></button></Link>
      </header>
    );
  }
  
  export default Header;