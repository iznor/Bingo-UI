import "./Manage.scss";
import "./Edit.scss";
import "./ParkCard.scss";
import ParkCard from "./ParkCard.jsx";

function Manage({ COMPONENT }) {
  return (
    <div className="my-parkings">
      <ParkCard/>
    </div>
  );
}
export default Manage;
