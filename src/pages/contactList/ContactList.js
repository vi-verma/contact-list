import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import { storage } from "../../firebase";

const ContactList = () => {
  let [contactList, setContactList] = useState([]);
  let nevigate = useNavigate();


  useEffect(() => {

    let list =
      JSON.parse(localStorage.getItem("contactList"))?.length > 0
        ? JSON.parse(localStorage.getItem("contactList"))
        : [];

    // if (list?.length < 1 || contactList.length === list.length) return;
    // setLoding(true);

    list.forEach((item) => {
      const imageRef = ref(storage, `images/${item?.name}`);
      if (imageRef._location.path_.includes("images/undefined")) {
        setContactList((prev) => [...prev, item]);
      } else {
        getDownloadURL(imageRef).then((url) => {
          console.log("item", item, "url", url);
          setContactList((prev) => [...prev, { ...item, url }]);
        });
      }
    });

    // setLoding(false);

    return () => {
      setContactList([]);
    };
  }, []);

  // useEffect(() => {
  //   let list = localStorage.getItem("contactList");
  //   setContactList(JSON.parse(list));
  // }, []);

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
