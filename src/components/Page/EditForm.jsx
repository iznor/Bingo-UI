import "./Edit.scss";
import { MdOutlineCancel } from "react-icons/md";
import { ImCheckmark2 } from "react-icons/im";

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

let chosenLat=0;
let chosenLng=0;

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
  
    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();
        
        try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            //save the chosen address as latlng
            chosenLat=lat;
            chosenLng=lng;
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
            placeholder="Search for a parking"
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
    return (
        <div className="edit-page">
      <div className="edit-parking">
        <div className="form-editing">
          <section className="input-label-from">
            <p>Owner's First Name</p>
            <input type="text" id="fname" name="fname" placeholder="First name" />
          </section>
          <section className="input-label-from">
            <p>Owner's Last Name</p>
            <input type="text" id="lname" name="lname" placeholder="Last name" />
          </section>
          <section className="input-label-from">
            <p>Contact Phone Number</p>
            <input type="text" id="phone" name="phone" placeholder="Phone number" />
          </section>
          <section className="input-label-from">
            <p>Address</p>
            <GoogleMapsSearch/>
          </section>
          <section className="input-label-from">
            <p>Start Date</p>
            <input type="date" id="dateStart" name="dateStart" min={today} defaultValue={today}/>
          </section>
          <section className="input-label-from">
            <p>End Date</p>
            <input type="date" id="dateEnd" name="dateEnd" />
          </section>
          <section className="input-label-from">
            <p>Price</p>
            <input type="text" id="price" name="price" placeholder="Price" />
          </section>
          </div>
        </div>
          <div className="row">
            <button className="approval-icon">
              <ImCheckmark2 className="plus-icon" />
            </button>
            <button className="cancel-icon">
              <MdOutlineCancel className="plus-icon" />
            </button>
      </div>
    </div>
    
  );
}
export default Add;
