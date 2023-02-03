import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./verify.css";
import { verifyHandlerData } from "../../service/auth.service";
import { useLocation } from "react-router-dom";
import { listBody } from "../../utils/helper";

export default function Verify() {
  const location = useLocation();
  const { search } = location; // eslint-disable-next-line
  const [verifyId, setverifyId] = useState(); // eslint-disable-next-line
  const [Data, setData] = useState();
  useEffect(() => {
    let verifyId;
    if (search.split("=").length > 0) {
      verifyId = search.split("=")[1];
    } else {
      verifyId = "";
    }
    setverifyId(verifyId);
    getverifyData(verifyId);
  }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

  const getverifyData = async (verifyId) => {
    const response = await verifyHandlerData(
      listBody({
        where: {
          _id: verifyId,
        },
        perPage: 1000,
      })
    );
    setData(response[0].firstName);
    
  };
  // console.log(Data)

  return (
    <section className="mail-seccess section">
      <div className="success-inner">
        <h1>
          <i className="fa fa-envelope" />
          <span>Verification Mail Sent Successfully!</span>
        </h1>
        <p>
          Hi, Welcome to eCommerece, Verify Your Account Using Email
          Verification!!
        </p>
        <Link to="/login" className="button">
          Sign in
        </Link>
      </div>
    </section>
  );
}
