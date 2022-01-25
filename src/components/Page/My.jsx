import "./My.scss";
import "./Edit.scss";
import "./ParkCard.scss";
import ParkCard from "./ParkCard.jsx";

function My({ COMPONENT }) {
  return (
    <div className="my-parkings">
      <ParkCard/>
    </div>
  );
}
export default My;
