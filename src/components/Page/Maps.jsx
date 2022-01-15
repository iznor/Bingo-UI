import "./Maps.scss";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

function Maps() {
  return (
    <Wrapper apiKey={"YOUR_API_KEY"} render={render}>
      <section className="maps-wrap"></section>
    </Wrapper>
  );
}

export default Maps;
