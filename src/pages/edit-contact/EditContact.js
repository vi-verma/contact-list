import { useEffect, useState } from "react";
import styles from "./EditContact.module.css";
import avatar from "../../assets/user-avatar.jpg";
import UploadImage from "../../components/uploadImageComponent/UploadImage";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate, useSearchParams } from "react-router-dom";

function EditContact({ data }) {
  const [state, setState] = useState({});
  const [uploadedImageUrl, setUploadedImageUrl] = useState('')
  const [imageUpload, setImageUpload] = useState({});
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    let prevContactList = localStorage.getItem("contactList")
      ? JSON.parse(localStorage.getItem("contactList"))
      : [];

    let foundData = prevContactList.filter(
      (el) => el.name === searchParams.get("name")
    );

    const imageRef = ref(storage, `images/${searchParams.get("name")}`);
    getDownloadURL(imageRef)
      .then((url) => {
        // setLoding(false);
        setUploadedImageUrl(url);
      })
      .catch((error) => console.error(error));

    setState(foundData[0]);

    console.log("param", searchParams.get("name"));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (state?.contactNumber.length !== 10){
      alert("Contact number should be 10 digits number.");
      return;
    };
    if (imageUpload == null || imageUpload == "") {
      alert("Select image to upload.");
      return;
    }
    uploadImage();

    let prevContactList = localStorage.getItem("contactList")
      ? JSON.parse(localStorage.getItem("contactList"))
      : [];
    let foundDataIndex = prevContactList.findIndex(
      (el) => el.name === searchParams.get("name")
    );
    prevContactList.splice(foundDataIndex, 1, state);
    localStorage.setItem(
      "contactList",
      JSON.stringify([...prevContactList])
    );

    if(!imageUpload){
      navigate("/");
    }
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
            value={state?.name}
            placeholder="Enter name"
            onChange={onUserInput}
            required
          />
        </div>
        <div className={styles.contactNumber}>
          <label>Contact Number </label>
          <input
            placeholder="Enter Contect number"
            value={state?.contactNumber}
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
            //   value={state.type}
            defaultValue={state?.type}
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
            // defaultValue={state?.isWhatsapp}
            checked={state?.isWhatsapp}
            type="checkbox"
            name="iswhatsapp"
            className={styles.whatsappCheckbox}
          />
          <label htmlFor="isWhatsapp"> Is Whatsapp.</label>
          <br />
        </div>
        <button
          className={styles.addContactButton}
          type="button"
          onClick={handleSubmit}
        >
          Update Contact
        </button>
        {/* </form> */}
      </div>
    </div>
  );
}

export default EditContact;
