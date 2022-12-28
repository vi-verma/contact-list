import { useState } from "react";
import styles from "./index.module.css";
import avatar from "../../assets/user-avatar.jpg";
import UploadImage from "../../components/uploadImageComponent/UploadImage";
import { storage } from "../../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";

function AddContact() {
  const [state, setState] = useState({ isWhatsapp: false, type: "personal" });
  const [imageUpload, setImageUpload] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state?.contactNumber.length<1) return;
    if (imageUpload == null || imageUpload == "") {
      alert("Select image to upload.");
      return;
    }
    uploadImage();
    let prevContactList = localStorage.getItem("contactList") ?  JSON.parse(localStorage.getItem("contactList")) : [];
    localStorage.setItem("contactList", JSON.stringify([...prevContactList, state]));
    navigate('/')
  };

  const onUserInput = (e) => {
    var inpkey = e.target.name;
    var value = e.target.value;
    if (inpkey === "iswhatsapp") {
      setState((prev) => ({ ...prev, isWhatsapp: e.target.checked }));
    } else {
      setState((prev) => ({ ...prev, [inpkey]: value }));
    }
  };



  let uploadImage = () => {

    try {
      const imageRef = ref(storage, `images/${state?.contactNumber}`);
      uploadBytes(imageRef, imageUpload);
      setImageUpload({});
      alert("Image uploaded successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.addContactForm}>
        {/* <form onSubmit={handleSubmit}> */}
          <div>
            <input
              type="file"
              //  size={'<1024kb'}
              accept="image/png, image/jpeg"
              name="avatar"
              id="actual-btn"
              hidden
              // value={imageUpload}
              onChange={(e) => setImageUpload(e.target.files[0])}
            />
            <label htmlFor="actual-btn">
              <img className={styles.avatar} src={avatar} alt="user image" />
            </label>
          </div>
          <div className={styles.name}>
            <label>Name </label>
            <input
              name="name"
              type="text"
              placeholder="Enter name"
              onChange={onUserInput}
              required
            />
          </div>
          <div className={styles.contactNumber}>
            <label>Contact Number </label>
            <input
              placeholder="Enter Contect number"
              name="contactNumber"
              type="number"
              onChange={onUserInput}
              required
            />
          </div>
          <div>
            <label htmlFor="type">Select contact type </label>
            <select
              className={styles.seletType}
              name="type"
              id="type"
              onChange={onUserInput}
            >
              <option value="personal">Personal</option>
              <option value="office">Office</option>
            </select>
          </div>
          <div className={styles.checkboxContainer}>
            <input
              onClick={(e) => onUserInput(e)}
              type="checkbox"
              name="iswhatsapp"
              className={styles.whatsappCheckbox}
            />
            <label htmlFor="isWhatsapp"> Is Whatsapp.</label>
            <br />
          </div>
          <button className={styles.addContactButton} type="button" onClick={handleSubmit}>
            Add Contact
          </button>
        {/* </form> */}
      </div>
    </div>
  );
}

export default AddContact;
