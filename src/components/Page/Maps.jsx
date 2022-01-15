import "./Maps.scss";
import "../../keys/GoogleMaps"
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { myApiKey } from "../../keys/GoogleMaps";


function Maps() {
  const render = (status: Status) => {
    console.log(myApiKey,status);
    return <h1>{status}</h1>;
  };
  return (
    <Wrapper apiKey={myApiKey} render={render}>
      <section className="maps-wrap"></section>
    </Wrapper>
  );
}

export default Maps;
