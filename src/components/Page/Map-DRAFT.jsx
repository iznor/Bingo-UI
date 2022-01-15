import "./Map.scss";
import "../../keys/GoogleMaps";
import { myApiKey } from "../../keys/GoogleMaps";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import React, { useEffect, useRef,useState } from "react";

function Map({ options, onMount, className, onMountProps }) {
  const ref = useRef();
  const [map, setMap] = useState();
  
  useEffect(() => {
    const onLoad = () =>
      setMap(new window.google.maps.Map(ref.current, options));
    if (!window.google) {
      const script = document.createElement(`script`);
      script.src =
        `https://maps.googleapis.com/maps/api/js?key=${myApiKey}`
      document.head.append(script);
      script.addEventListener(`load`, onLoad);
      return () => script.removeEventListener(`load`, onLoad);
    } else onLoad();
  }, [options]);
  if (map && typeof onMount === `function`) onMount(map, onMountProps);

  // function addMarkers(map, links) {
  //   links.forEach((link, index) => {
  //     const marker = new window.google.maps.Marker({
  //       map,
  //       position: link.coords,
  //       label: `${index + 1}`,
  //       title: link.title,
  //     })
  //     marker.addListener(`click`, () => {
  //       window.location.href = link.url
  //     })
  //   })
  // }

  return (
    <div
      style={{ height: `81vh`,width: `100%`, zIndex:`0`,marginTop: `2px`, borderRadius: `0` }}
      {...{ ref, className }}
    className="map-wrapper"/>
  );
}
Map.defaultProps = {
  options: {center: { lat: 32.0901, lng: 34.8036 },zoom: 12,},
    // onMount: addMarkers, 
    // onMountProps: linksComingFromSomewhere, 
  };

export default Map;
