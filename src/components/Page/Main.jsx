import backButton from "../../assets/img/back.svg";
import "./Main.scss";

const style = {
  display: "flex",
  alignItems: "center",
  fontWeight: "bold",
  width: "100%",
  minHeight: "812px",
  justifyContent: "start",
  border: "1px black solid",
};
const button = {
  position: "absolute",
  marginLeft: "35px",
  padding: "0px",
  backgroundImage: `url(${backButton})`,
  backgroundColor: "transparent",
  backgroundSize: "cover",
  border: "none",
  width: "35px",
  height: "35px",
};

function Main() {
  return (
    <main style={style}>
      <div className="row">
        <button id="reserve" className="mainButton"></button>
        <button id="publish" className="mainButton"></button>
      </div>
      <div className="row">
        <button id="edit" className="mainButton"></button>
        <button id="history" className="mainButton"></button>
      </div>
    </main>
  );
}

export default Main;
