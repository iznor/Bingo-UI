import "./Add.scss";

const locationActive = () => {
  return (
    <>
      <h1 className="active">Location</h1>
      <h1 className="">Details</h1>
    </>
  );
};
const DetailsActive = () => {
  return (
    <>
      <h1 className="">Location</h1>
      <h1 className="active">Details</h1>
    </>
  );
};

function Add() {
  return (
    <div className="header-add">
      {/* {locationActive()} */}
      {DetailsActive()}
    </div>
  );
}

export default Add;
