import "./Edit.scss";
import { MdOutlineCancel } from "react-icons/md";
import { ImCheckmark2 } from "react-icons/im";

function Edit() {
  return (
    <div className="edit-page">
      <div className="edit-parking">
        <p className="edit-title"> Edit a parking </p>
        <div className="form-editing">
          <section className="input-label-from">
            <p>Name</p>
            <input type="text" id="fname" name="fname" placeholder="Name" />
            <br></br>
          </section>
          <section className="input-label-from">
            <p>Location</p>
            <input type="text" id="fname" name="fname" placeholder="Location" />
            <br></br>
          </section>
          <section className="input-label-from">
            <p>Price</p>
            <input type="text" id="fname" name="fname" placeholder="Price" />
            <br></br>
          </section>
          <section className="input-label-from">
            <p>Image</p>
            <input
              type="text"
              id="fname"
              name="fname"
              placeholder="Image url"
            />
            <br></br>
          </section>
          <section className="input-label-from">
            <p>Image</p>
            <input
              type="text"
              id="fname"
              name="fname"
              placeholder="Image url"
            />
            <br></br>
          </section>
          <div class="row">
            <button className="approval-icon">
              <ImCheckmark2 className="plus-icon" />
            </button>
            <button className="cancel-icon">
              <MdOutlineCancel className="plus-icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Edit;
