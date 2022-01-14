import backButton from "../../assets/img/back.svg";

const style = {
  display: "flex",
  alignItems: "center",
  fontWeight: "bold",
  width: "100%",
  height: "75px",
  justifyContent: "start",
  border: "1px black solid",
};
const h1 = {
  //   margin: "0px",
  //   padding: "0px",
  border: "1px solid black",
  backgroundImage: `url("../../assets/img/back.svg")`,
};
const button = {
  position: "fixed",
  marginLeft: "35px",
  padding: "0px",
  backgroundImage: `url(${backButton})`,
  backgroundColor: "transparent",
  backgroundSize: "cover",
  border: "none",
  width: "35px",
  height: "35px",
};

function Header() {
  return (
    <header style={style}>
      <button style={button}></button>
      <h1 style={h1}>Main Page</h1>
    </header>
  );
}

export default Header;
