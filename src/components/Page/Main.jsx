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
      <div className="row">
        {button("reserve", "Location")}
        {button("publish", "Technical")}
      </div>
      <div className="row">
        {button("edit", "Price")}
        {button("history", "Dates")}
      </div>
       <h2>Is this parking lot available for renting?</h2>
       <button className="saveButton"><h2>Save</h2></button>
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
