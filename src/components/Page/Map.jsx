import React from "react";
import "./Map.scss";
import { myApiKey } from "../../keys/GoogleMaps";
import axios from "axios";
import { get } from "mongoose";

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
import { MdReportGmailerrorred } from "react-icons/md";

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

  const url =  "https://bingo-parking.herokuapp.com/api/parkings";

  

  const onMapClick = React.useCallback((e) => {
    setSelected(null);
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map,post) => {
    mapRef.current = map;
    //load all parking slots from database

    //not working:
    let add = "Damn"
    //-->add is not assigned well
    axios.get(url).then((response) => {
      const dataMarkers = response.data;
      console.log(dataMarkers);
      
      dataMarkers.forEach((e) => {
        const currParkingId = Number(e.parkingId);
        const currLat = Number(e.location.lat);
        const currLng = Number(e.location.lng);
        const currStartDate = new Date(e.dateStart);
        const currEndDate = new Date(e.dateEnd);
        const currPrice = e.price;

        const getCurrCityAddress = (add, ()=>{
          const currCityUrl=`https://maps.googleapis.com/maps/api/geocode/json?latlng=${currLat},${currLng}&sensor=true&key=${myApiKey}`;
          axios.get(currCityUrl).then((response) => {
            const res = response.data.results[0].formatted_address.split(',');
            add = `${String(res[0])}, ${String(res[1])}`
            console.log(add);
          })
        })
        getCurrCityAddress();
        console.log(add);
      
        setMarkers((current) => [
          ...current,
          {
            id: currParkingId,
            lat: currLat,
            lng: currLng,
            startDate: currStartDate,
            endDate: currEndDate,
            price: currPrice
          },
        ]);
        
       });


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
            key={`${marker.id}`}
            position={{ lat: marker.lat, lng: marker.lng}}
            address={`${marker.address}`}
            city={`${marker.city}`}
            startDate={`${marker.startDate}`}
            endDate={`${marker.endDate}`}
            price = {`${marker.price}`}
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
                address={`${selected.address}`}
                city={`${selected.city}`}
                startDate={`${ selected.startDate}`}
                endDate={`${ selected.endDate}`}
                price = {`${selected.price}`}
                onCloseClick={() => {
                  setSelected(null);
                }}
               >
          <div className="info-box">
              <h2 style={{fontSize:"21px", paddingLeft:"25px" }}>{`${selected.address}, ${selected.city}`}</h2>
              <p style={{fontSize:"21px", paddingLeft:"25px" }}>{`${ selected.startDate.toLocaleDateString('en-GB')} - ${ selected.endDate.toLocaleDateString('en-GB')} `}</p>
              <h2 style={{fontSize:"21px", paddingLeft:"25px" }}>{`${selected.price}`}$</h2>
              <div className="h1-cont">
              <button className="bingo-button">
                bingo
              </button>
              </div>
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
