import React from "react";
// import "./user.css";
// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import {
//   userHndlerData,
//   userupdateHandlerData,
// } from "../../service/auth.service";
// import { validName, validPhoneno, validEmail } from "../../utils/helper";

export default function User() {
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState(""); // eslint-disable-next-line
  // const [email, setEmail] = useState(""); // eslint-disable-next-line
  // const [phoneNumber, setphoneNumber] = useState("");
  // // const [emailErr, setEmailErr] = useState(false);
  // const [fnameErr, setfnameErr] = useState(false);
  // const [lnameErr, setlnameErr] = useState(false);
  // // const [phonenoErr, setphonenoErr] = useState(false);
  // const [msg, setMsg] = useState(false);
  // const [selected, setSelected] = useState(false); // eslint-disable-next-line
  // const [userData, setuserData] = useState([]);
  // const [localuserData, setlocaluserData] = useState([]);
  // const location = useLocation();
  // const [uid, setuid] = useState();
  // const { search } = location;

  // useEffect(() => {
  //   let userId;
  //   if (search.split("=").length > 0) {
  //     userId = search.split("=")[1];
  //   } else {
  //     userId = "";
  //   }
  //   getuserData(userId); // eslint-disable-next-line
  //   setlocaluserData(JSON.parse(localStorage.getItem("userData")));
  // }, [search]);

  // const getuserData = async (userId) => {
  //   const response = await userHndlerData(userId);
  //   setuserData(response.data?.data);
  //   setuid(response.data?.data._id);
  // };

  // const validate = () => {
  //   let formIsValid = true;
  // if (!validEmail.test(email)) {
  //   formIsValid = false;
  //   setEmailErr("Your Email is invalid");
  // }
  // if (!validName.test(firstName)) {
  //   formIsValid = false;
  //   setfnameErr("Your First Name is invalid");
  // }
  // if (!validName.test(lastName)) {
  //   formIsValid = false;
  //   setlnameErr("Your Last Name is invalid");
  // }
  // if (!validPhoneno.test(phoneNumber)) {
  //   formIsValid = false;
  //   setphonenoErr("Your Phone No is invalid");
  // }

  // if (!email) {
  //   formIsValid = false;
  //   setEmailErr("Your Email is required");
  // }
  // if (!firstName) {
  //   formIsValid = false;
  //   setfnameErr("Your First Name is required");
  // }
  // if (!lastName) {
  //   formIsValid = false;
  //   setlnameErr("Your Last Name is required");
  // }
  // if (!phoneNumber) {
  //   formIsValid = false;
  //   setphonenoErr("Your Phone No is required");
  // }

  //   return formIsValid;
  // };
  // const handleSubmit = (e) => {
  //   if (validate() !== true) {
  //   } else {
  //     postData(e);
  //     setSelected(true);
  //   }
  //   e.preventDefault();
  // };

  // const postData = async (event) => {
  //   event.preventDefault();
  //   const body = {
  //     firstName,
  //     lastName,
  //     email,
  //     phoneNumber,
  //   };
  //   const response = await userupdateHandlerData(uid, body); // eslint-disable-next-line
  //   if (response.status == "200") {
  //     setSelected(false);
  //     setMsg("Updated successfully");
  //   }
  //   if (response.message) {
  //     setSelected(false);
  //   }
  // };

  return <></>;
}
