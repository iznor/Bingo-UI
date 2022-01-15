import "./Main.scss";
import "./Home.scss";

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
        {button("reserve", "Find")}
        {button("publish", "Add")}
      </div>
      <div className="row">
        {button("edit", "Edit")}
        {button("history", "History")}
      </div>
    </div>
  );
}
export default Home;
