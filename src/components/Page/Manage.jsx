import "./Manage.scss";
import "./Edit.scss";
import "./ParkCard.scss";
import ParkCard from "./ParkCard.jsx";

//const [myParkings, setMyParkings] = useState(BRING FROM DATABASE: select * from parkings where email==default@gmail.com)

function Manage({ COMPONENT }) {
  return (
    <div className="my-parkings">
      <ParkCard />
    </div>
  );
}
export default Manage;
