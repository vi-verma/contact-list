import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";

const ContactList = () => {
  let [contactList, setContactList] = useState([]);
  let nevigate = useNavigate();

  useEffect(() => {
    let list = localStorage.getItem("contactList");
    setContactList(JSON.parse(list));
  }, []);

  let deleteContact = (data) => {
    if (window.confirm("Do you want to delete the contact detail?") == true) {
      let rem = contactList.filter((el) => el.contactNumber !== data);
      setContactList(rem);
      localStorage.setItem("contactList", JSON.stringify(rem));
    }
  };

  let editContact = (data) => {
    console.log(data);
    nevigate(`/edit-contact?name=${data}`);
  };

  return (
    <div>
      {contactList?.map((item) => (
        <Card
          editContact={editContact}
          deleteContact={deleteContact}
          detail={item}
        />
      ))}
    </div>
  );
};

export default ContactList;
