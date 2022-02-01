import React from "react";
import "./Map.scss";
import { myApiKey } from "../../keys/GoogleMaps";

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import { formatRelative } from "date-fns";

import "@reach/combobox/styles.css";
import mapStyles from "./mapStyles";
import { dark } from "./mapStyles";

const libraries = ["places"];
const mapContainerStyle = {
  display: "flex",
  flexDirection: "column",
  height: "70vh",
  width: "100%",
  maxWidth: "1300px",
  justifyContent: "baseline",
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: 32.0901,
  lng: 34.8036,
};

export default function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: myApiKey,
    libraries,
  });
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  //delete later -> GET this from DB
  const parkingData = [
    { id: 1, lat: 32.0901, lng: 34.8036 },
    { id: 2, lat: 32.123, lng: 34.891 },
    { id: 3, lat: 32.1009, lng: 34.88036 },
    { id: 4, lat: 32.2003, lng: 34.87836 },
    { id: 5, lat: 32.3102, lng: 34.90036 },
  ];

  const onMapClick = React.useCallback((e) => {
    // setMarkers((current) => [
    //   ...current,
    //   {
    //     lat: e.latLng.lat(),
    //     lng: e.latLng.lng(),
    //     time: new Date(),
    //   },
    // ]);
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
    //load all parking slots from database
    parkingData.forEach((e) => {
      const currId = Number(e.id);
      const currLat = Number(e.lat);
      const currLng = Number(e.lng);
      setMarkers((current) => [
        ...current,
        {
          id: currId,
          lat: currLat,
          lng: currLng,
        },
      ]);
      return;
    });
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div className="map-container">
      <Search panTo={panTo} />
      {/* <Locate panTo={panTo} /> */}
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}
            icon={{
              url: "https://www.ariseiip.com/wp-content/uploads/2021/06/parking.svg",
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        ))}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }} 
           className="testy">
            <div className="info-box">
              <h2 style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src="https://www.ariseiip.com/wp-content/uploads/2021/06/parking.svg"
                  alt="parking"
                  style={{ width: "15px", height: "15px", display: "flex" }}
                />
                Available!
              </h2>
              <p>lat:{selected.lat}lng:{selected.lng}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}

function Locate({ panTo }) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    ></button>
  );
}

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.6532, lng: () => -79.3832 },
      radius: 100 * 1000,
    },
  });

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };

  return (
    <div className="search">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search for a parking"
          style={{ paddingLeft: "30px" }}
        />

        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption
                  key={id}
                  value={description}
                  style={{
                    backgroundColor: "#ffd666",
                  }}
                />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
