import "./Main.scss";

const button = (divId, title) => {
  return (
    <button>
      <h1>{title}</h1>
      <div id={divId}></div>
    </button>
  );
};

function Main() {
  return (
    <main>
      <div className="row">
        {button("reserve", "Find")}
        {button("publish", "Add")}
      </div>
      <div className="row">
        {button("edit", "Edit")}
        {button("history", "History")}
      </div>
    </main>
  );
}

export default Main;
