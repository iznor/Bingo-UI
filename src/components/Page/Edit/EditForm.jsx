import "./Edit.scss";
import { MdOutlineCancel } from "react-icons/md";
import { ImCheckmark2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "@reach/combobox/styles.css";

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
today = yyyy + "-" + mm + "-" + dd;


const formatDate = (date)=> {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

function EditForm() {
  const location = useLocation();
  const { id } = location.state;
  const [price, setPrice] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errMsg, setErrMsg] = useState("hidden");
  const [brightScreen, setBrightScreen] = useState("1");


  const onEndDateChange = (e) => setEndDate(new Date(e.target.value));
  const onStartDateChange = (e) => setStartDate(new Date(e.target.value));
  const onPriceChange = (e) => setPrice(e.target.value);
  const onNumberChange = (e) => setPhoneNumber(e.target.value);
  const onFirstNameChange = (e) => setFirstName(e.target.value);
  const onLastNameChange = (e) => setLastName(e.target.value);

  const [endDate, setEndDate] = useState(new Date(today));
  const [startDate, setStartDate] = useState(new Date(today));

  useEffect(() => {
    const token = localStorage.getItem("token");
    const datab = axios({
      headers: {
        authorization: token,
      },
      method: "Get",
      url: `https://bingo-parking.herokuapp.com/api/parkings/${id}`,
    }).then((datab) => {
      const data = JSON.stringify(datab.data);
      const obj = JSON.parse(data);
      setStartDate(new Date(obj.dateStart));
      setEndDate(new Date(obj.dateEnd));
      setFirstName(obj.person.firstName);
      setLastName(obj.person.lastName);
      setPhoneNumber(obj.person.phoneNumber);
      setPrice(obj.price);
      // complete deafults dates in form
    });
  }, []);

  const handleDiscard = (e) => {
    e.preventDefault();
    setFirstName("");
    setPrice("");
    setEndDate(today);
    setStartDate(today);
    setPhoneNumber("");
    setLastName("");
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const personData = { phoneNumber, firstName, lastName };
    const token = localStorage.getItem("token");
    let strDt = new Date(startDate);
    let endDt = new Date(endDate);
    if (endDt < strDt) {
      setTimeout(()=>{
        setErrMsg(()=>"visible");
        setBrightScreen(()=>"0.2");
      }, 1500)
      return;
    }else{
      const datab = await axios({
        method: "Put",
        url: `https://bingo-parking.herokuapp.com/api/parkings/${id}`,
        headers: {
          authorization: token,
        },
        data: {
          price: price,
          dateEnd: endDate,
          dateStart: startDate,
          person: personData,
          active: "True",
        },
      });
      console.log("Success!");
      navigate("/find");
    }
  };


  return (
    <>
      <div className="err-modal" style={{visibility: errMsg}}>
        <p>😞<br/>Invalid dates</p>
      </div>
      <div className="edit-page" style={{opacity: brightScreen}} onClick={()=>{setBrightScreen("1");setErrMsg("hidden")}}>
        <div className="edit-parking">
          <div className="form-editing">
            <section className="input-label-from">
              <p>Owner's First Name</p>
              <input
                type="text"
                id="fname"
                name="fname"
                placeholder="First name"
                value={firstName}
                onChange={onFirstNameChange}
              />
            </section>
            <section className="input-label-from">
              <p>Owner's Last Name</p>
              <input
                type="text"
                id="lname"
                name="lname"
                placeholder="Last name"
                value={lastName}
                onChange={onLastNameChange}
              />
            </section>
            <section className="input-label-from">
              <p>Contact Phone Number</p>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Phone number"
                value={phoneNumber}
                onChange={onNumberChange}
              />
            </section>
            <section className="input-label-from">
              <p>Start Date</p>
              <input
                type="date"
                id="dateStart"
                name="dateStart"
                min={today}
                defaultValue={formatDate(startDate)}
                onChange={onStartDateChange}
              />
            </section>
            <section className="input-label-from">
              <p>End Date</p>
              <input
                type="date"
                id="dateEnd"
                name="dateEnd"
                min={today}
                defaultValue={formatDate(endDate)}
                onChange={onEndDateChange}
              />
            </section>
            <section className="input-label-from">
              <p>Price</p>
              <input
                type="text"
                id="price"
                name="price"
                placeholder="Price"
                value={price}
                onChange={onPriceChange}
              />
            </section>
          </div>
        </div>
        <div className="row">
          <button className="cancel-icon">
            <MdOutlineCancel className="discard-icon" onClick={handleDiscard} />
          </button>
          <button className="approval-icon">
            <ImCheckmark2 className="plus-icon" onClick={handleSubmit} />
          </button>
        </div>
      </div>
    </>
  );
}
export default EditForm;
