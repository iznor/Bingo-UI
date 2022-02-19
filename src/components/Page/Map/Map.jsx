import React from "react";
import "./Map.scss";
import { myApiKey } from "./GoogleMaps";
import axios from "axios";
import {Link} from "react-router-dom";
import {GoogleMap,useLoadScript,Marker,InfoWindow,} from "@react-google-maps/api";
import usePlacesAutocomplete, {getGeocode,getLatLng,} from "use-places-autocomplete";
import {Combobox,ComboboxInput,ComboboxPopover,ComboboxList,ComboboxOption} from "@reach/combobox";
import "@reach/combobox/styles.css";

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
  disableDefaultUI: false,
  zoomControl: false,
  gestureHandling: "greedy",
};
const center = {
  lat: 32.0901,
  lng: 34.8036,
};

let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1; //January is 0!
let yyyy = today.getFullYear();
if (dd < 10) {
  dd = "0" + dd;
}
if (mm < 10) {
  mm = "0" + mm;
}
today = yyyy + "-" + mm + "-" + (dd-1);

export default function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: myApiKey,
    libraries,
  });

  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);


  
  const onMapClick = React.useCallback((e) => {
    setSelected(null);
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map, post) => {
    mapRef.current = map;
    const token = localStorage.getItem("token");
    axios({
      headers: {
        authorization: token
      },
      method: "Get",
      url: "https://bingo-parking.herokuapp.com/api/parkings",
    })
    .then((response) => {
      const dataMarkers = response.data;
      dataMarkers.forEach((e, i) => {
        if(e.active.toLowerCase()==="true"){
        const currParkingId = Number(e.parkingId);
        const currLat = Number(e.location.lat);
        const currLng = Number(e.location.lng);
        const currFname=e.person.firstName;
        const currLname=e.person.lastName;
        const currPhone=e.person.phoneNumber;
        const currStartDate = new Date(e.dateStart);
        const currEndDate = new Date(e.dateEnd);
        const currPrice = e.price;
        const currEmail = e.email;
        
        const getCurrCityAddress = ()=>new Promise((resolve, reject) => {
          const currCityUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${currLat},${currLng}&sensor=true&key=${myApiKey}`;
          axios.get(currCityUrl).then((response) => {
            const res = response.data.results[0].formatted_address.split(",");
            const address = `${String(res[0])}, ${String(res[1])}`;
            resolve(address);
          });
        });

        getCurrCityAddress().then((address) => {
          setMarkers((current) => [
            ...current,
            {
              id: currParkingId,
              lat: currLat,
              lng: currLng,
              fname: currFname,
              lname: currLname,
              phone: currPhone,
              email: currEmail,
              address: address,
              startDate: currStartDate,
              endDate: currEndDate,
              price: currPrice,
            },
          ]);
        });
      }});

      return;
    }).catch(err=>{
      console.log(`There was a problem loading markers from database: ${err}`);
    })
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
            position={{ lat: marker.lat, lng: marker.lng }}
            fname={`${marker.fname}`}
            lname={`${marker.lname}`}
            phone={`${marker.phone}`}
            email={`${marker.email}`}
            address={`${marker.address}`}
            city={`${marker.city}`}
            startDate={`${marker.startDate}`}
            endDate={`${marker.endDate}`}
            price={`${marker.price}`}
            onClick={() => {
              setSelected(marker);
            }}
            icon={ localStorage.getItem('email')===marker.email ? 
            {
              url: "https://www.svgrepo.com/show/133735/parking-location.svg",
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),            }
            :
            {
              url: "https://www.svgrepo.com/show/282135/placeholder-maps-and-location.svg",
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }
          }
          />
        ))} 

        {selected ? (
          <InfoWindow
            id={`${selected.id}`}
            position={{ lat: selected.lat, lng: selected.lng }}
            fname={`${selected.fname}`}
            lname={`${selected.lname}`}
            phone={`${selected.phone}`}
            email={`${selected.email}`}
            address={`${selected.address}`}
            city={`${selected.city}`}
            startDate={`${selected.startDate}`}
            endDate={`${selected.endDate}`}
            price={`${selected.price}`}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div className="info-box">
              <h2
                style={{ fontFamily:"arial", textAlign:"center" , fontSize: "14px", paddingLeft: "25px" }}
              >{`${selected.address}`}</h2>
              <p
                style={{ fontSize: "21px", paddingLeft: "25px" }}
              >{`${selected.startDate.toLocaleDateString(
                "en-GB"
              )} - ${selected.endDate.toLocaleDateString("en-GB")} `}</p>
              <h2 style={{ fontSize: "22px", paddingLeft: "25px", color: "green" }}>
                {`${selected.price}`}$
              </h2>
              <div className="h1-cont">
                <Link to={`/contract?id=${selected.id}&fname=${selected.fname}&lname=${selected.lname}&phone=${selected.phone}&email=${selected.email}&startdate=${selected.startDate.toLocaleDateString("en-GB")}&enddate=${selected.endDate.toLocaleDateString("en-GB")}&address=${selected.address}&price=${selected.price}`} >
                  <button
                  className="bingo-button">bingo</button>
                </Link>
              </div>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
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
