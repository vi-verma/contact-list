import { useState } from "react";
import styles from "./index.module.css";
import avatar from "../../assets/user-avatar.jpg";
import UploadImage from "../../components/uploadImageComponent/UploadImage";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";

function AddContact() {
  const [state, setState] = useState({ isWhatsapp: false, type: "personal" });
  const [imageUpload, setImageUpload] = useState();
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!state.name.length) {
      alert("Enter name");
      return;
    };
    if (state?.contactNumber.length !== 10) {
      alert("Contacl number should be of 10 digits.");
      return;
    };
    if (!state.type) {
      alert("Select contact type.");
      return;
    };
    if (imageUpload == null || imageUpload == "") {
      alert("Select image to upload.");
      return;
    }

    uploadImage(state?.name);
    let prevContactList = localStorage.getItem("contactList") ?  JSON.parse(localStorage.getItem("contactList")) : [];
    localStorage.setItem("contactList", JSON.stringify([...prevContactList, state]));

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


  let uploadImage = (name) => {
    if(!imageUpload) return;

    setloading(true);
    const imageRef = ref(storage, `images/${name}`);
    uploadBytes(imageRef, imageUpload)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUploadedImageUrl(url);
            // alert("Image uploaded successfully");
            setTimeout(() => {
            setloading(false);
              navigate("/");
            }, 5000);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className={styles.container}>
      <div className={styles.addContactForm}>
        {/* <form onSubmit={handleSubmit}> */}
        <h2 className={styles.title}>
          Add Contect details
        </h2>
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
              <img className={styles.avatar} src={uploadedImageUrl || avatar} alt="user image" />
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
          <button disabled={loading} className={styles.addContactButton} type="button" onClick={handleSubmit}>
            {
              loading 
              ? 
              'Uploading image'
              :
              'Add Contact'
            } 
          </button>
        {/* </form> */}
      </div>
    </div>
  );
}

export default AddContact;
