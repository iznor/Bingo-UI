import { Link } from "react-router-dom";
import "../Footer.scss";

const buttonsMain = () => {
  return (
    <>
    <Link to={"/reservations"}><button id="reserved"></button></Link>
    <Link to={"/home"}><button id="home"></button></Link>
    <Link to={"/profile"}><button id="profile"></button></Link>
    </>
  );
};

function HomeFooter() {
  return (
    <footer>
      <div className="container">{buttonsMain()}</div>
    </footer>
  );
}
export default HomeFooter;
