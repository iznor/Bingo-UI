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


function ParkCard(props ,address ,dates) {
  return (
      <div className="card-row">
        <Link to={"/manage/edit"}>{card(props.name.person.firstName, props.name.dateStart)}</Link>
      </div>
  );
}
export default ParkCard;
