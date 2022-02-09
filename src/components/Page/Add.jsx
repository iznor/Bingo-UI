import "./Edit.scss";
import { MdOutlineCancel } from "react-icons/md";
import { ImCheckmark2 } from "react-icons/im";
import axios from "axios";
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

import "@reach/combobox/styles.css";
import React, { useState } from "react";

let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1; //January is 0!
let yyyy = today.getFullYear();
if (dd < 10) {
  dd = '0' + dd;
}
if (mm < 10) {
  mm = '0' + mm;
}
today = yyyy + '-' + mm + '-' + dd;

let chosenLat = 0;
let chosenLng = 0;

function GoogleMapsSearch() {
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
  const handleReset = () => {
    setValue('');
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      //save the chosen address as latlng
      chosenLat = lat;
      chosenLng = lng;
      //print lat-lng
      console.log(chosenLat, chosenLng);
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };


  return (
    <div className="input-label-from">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Find address"
        />

        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption
                  key={id}
                  value={description}
                />
              ))}

          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}



function Add() {

  const [price, setPrice] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const onEndDateChange = e => setEndDate(e.target.value);
  const onStartDateChange = e => setStartDate(e.target.value);
  const onPriceChange = e => setPrice(e.target.value);
  const onNumberChange = e => setPhoneNumber(e.target.value);
  const onFirstNameChange = e => setFirstName(e.target.value);
  const onLastNameChange = e => setLastName(e.target.value);
  

  const handleDiscard = (e) => {
    e.preventDefault();
    setFirstName('');
    setPrice('');
    setEndDate('');
    setStartDate('');
    setPhoneNumber('');
    setLastName('');
  }

  const handleSubmit = async (e) => {
    if (!price || !endDate || !startDate || !phoneNumber || !firstName || !lastName || !chosenLat || !chosenLng) {
      alert("Missing values, please complete all the feilds");
      return;
    }
    e.preventDefault();
    const lat = chosenLat;
    const lng = chosenLng;
    const location = { lat, lng };
    const personData = { phoneNumber, firstName, lastName };
    console.log(location);
    const datab = await axios({
      method: "Post",
      url: "https://bingo-parking.herokuapp.com/api/parkings/",
      data: {
        email: "default@gmail.com",
        price: price,
        dateEnd: endDate,
        dateStart: startDate,
        location: location,
        person: personData,
        active: "True"
      },
    });

  };

  return (
    <div className="edit-page">
      <div className="edit-parking">
        <div className="form-editing">
          <section className="input-label-from">
            <p>Owner's First Name</p>
            <input type="text" id="fname" name="fname" placeholder="First name" value={firstName} onChange={onFirstNameChange} />
          </section>
          <section className="input-label-from">
            <p>Owner's Last Name</p>
            <input type="text" id="lname" name="lname" placeholder="Last name" value={lastName} onChange={onLastNameChange} />
          </section>
          <section className="input-label-from">
            <p>Contact Phone Number</p>
            <input type="text" id="phone" name="phone" placeholder="Phone number" value={phoneNumber} onChange={onNumberChange} />
          </section>
          <section className="input-label-from">
            <p>Address</p>
            <GoogleMapsSearch />
          </section>
          <section className="input-label-from">
            <p>Start Date</p>
            <input type="date" id="dateStart" name="dateStart" min={today} value={startDate} onChange={onStartDateChange} />
          </section>
          <section className="input-label-from">
            <p>End Date</p>
            <input type="date" id="dateEnd" name="dateEnd" min={today} value={endDate} onChange={onEndDateChange} />
          </section>
          <section className="input-label-from">
            <p>Price</p>
            <input type="text" id="price" name="price" placeholder="Price" value={price} onChange={onPriceChange} />
          </section>
        </div>
      </div>
      <div className="row">
        <button className="approval-icon">
          <ImCheckmark2 className="plus-icon" onClick={handleSubmit} />
        </button>
        <button className="cancel-icon">
          <MdOutlineCancel className="plus-icon" onClick={handleDiscard} />
        </button>
      </div>
    </div>

  );
}
export default Add;
