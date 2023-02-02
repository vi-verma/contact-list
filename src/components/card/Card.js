import styles from "./Card.module.css";
import whatsappImg from "../../assets/WhatsApp.svg";
import avatar from "../../assets/user-avatar.jpg";
import delImg from "../../assets/garbage-bin.svg";
import editImg from "../../assets/editImg.png";

const Card = (props) => {
  let { contactNumber, isWhatsapp, name, type, url } = props.detail;
console.log("props",props)
  return (
    <div key={contactNumber} className={styles.card}>
      <img
        src={url || avatar}
        alt="user image"
        style={{ width: "70px", borderRadius: "50px" }}
      />
      <div>
        <p className={styles.name}> Name : {name || "--"}</p>
        <p className={styles.contact}>
          Contact No : {contactNumber || "--"}
        </p>
        <p className={styles.contactType}>Type : {type || "--"}</p>
        <div className={styles.whatsappimg}>
          {isWhatsapp && (
            <img
              src={whatsappImg}
              alt="whatsapp logo"
              style={{ width: "25px" }}
            />
          )}
          {/* message */}
        </div>
      </div>
      <div>
        <button
          style={{ background: "none", border: "none" }}
          type="button"
          onClick={()=> props.editContact(name)}
        >
          <img src={editImg} alt="edit image" style={{ width: "30px" }} />
        </button>
        <button
          style={{ background: "none", border: "none", padding: '25px' }}
          type="button"
          onClick={()=> props.deleteContact(contactNumber)}
        >
          <img
            src={delImg}
            alt="delete image"
            style={{ width: "25px", background: "none" }}
          />
        </button>
      </div>
    </div>
  );
};

export default Card;
