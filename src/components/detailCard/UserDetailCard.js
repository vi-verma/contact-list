import React from 'react'
import styles from './UserDetailCard.module.css'
import whatsappImg from "../../assets/WhatsApp.svg";
import avatar from '../../assets/user-avatar.jpg';
import phone from '../../assets/phone-call.svg';
import whitePhone from '../../assets/icons8-phone-50.png';

const UserDetailCard = () => {
  return (
    <div className={styles.card}>
      <img src={avatar} alt="user image" style={{ width: "70px", borderRadius: '50px' }} />
      <div>
        <p className={styles.name}> Name : Vivek Verma</p>
        <p className={styles.contact} >
        <img src={whitePhone} alt="whatsapp logo" style={{ width: "30px" }} />

             9934343434
        </p>
        <p className={styles.contactType}>Type : presonal</p>
        <div className={styles.whatsappimg}>
        {/* message */}
        </div>
      </div>
      <div>
      <img src={whatsappImg} alt="whatsapp logo" style={{ width: "30px" }} />
    
      </div>
    </div>
  )
}

export default UserDetailCard