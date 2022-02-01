//PARK CARD -> NOT HOME !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

import {Link} from "react-router-dom";
const card = (address, dates) => {
  return (
    <div className="card">
      <h1>{address}</h1>
      <h2>{dates}</h2>
    </div>
  );
};


function ParkCard(address, dates) {
  return (
      <div className="card-row">
        <Link to={"/manage/edit"}>{card("Even Gabirol 101, Tel Aviv", "15/01/22-22/01/22")}</Link>
      </div>
  );
}
export default ParkCard;
