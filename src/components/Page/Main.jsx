import "./Main.scss";

const button = (divId, title) => {
  return (
    <button>
      <h1>{title}</h1>
      <div id={divId}></div>
    </button>
  );
};

const home = () => {
  return (
    <>
      <div className="row">
        {button("reserve", "Find")}
        {button("publish", "Add")}
      </div>
      <div className="row">
        {button("edit", "Edit")}
        {button("history", "History")}
      </div>
    </>
  );
};

const edit = () => {
  return (
    <>
      <div></div>
    </>
  );
};

function Main() {
  return (
    <main className="edit">
      {/* {home()} */}
      {edit()}
    </main>
  );
}

export default Main;
