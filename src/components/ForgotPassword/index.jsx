import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Register/Register.css";
import { validEmail } from "../../utils/helper";
import { forgotpassHandlerData } from "../../service/auth.service";

// import { sendData } from "../../services/authservices";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [msg, setMsg] = useState(null);

  // const [fromdata, setformData] = useState([]);
  const [selected, setSelected] = useState(false);

  const validate = () => {
    let formIsValid = true;

    if (!email) {
      formIsValid = false;
      setEmailErr("Your Email is required");
    } else if (!validEmail.test(email)) {
      formIsValid = false;
      setEmailErr("Your Email is invalid");
    }

    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      postData(e);
      setSelected(true);
    }
    // if (validate() !== true) {
    // } else {
    //   postData(e);
    //   setSelected(true);
    // }
  };

  const postData = async (event) => {
    event.preventDefault();

    const body = {
      email,
    };
    const response = await forgotpassHandlerData(body); // eslint-disable-next-line
    if (response) {
      setSelected(false);
      setMsg(response.message);
    } else {
      setSelected(false);
      alert("Somthing went wrong");
    }

    // if (response.status == "400") {
    //   setSelected(false);
    // }
    // if (response.message) {
    //   setSelected(false);
    // }
    // setMsg(response.message);
  };

  return (
    <div className="back text">
      <div className="registercontainer ">
        <div className="row">
          <div className="col-2">
            <img className="loginbg" src="/images/loginbg.svg" alt="Register" />
          </div>
          <form
            className="form col-1 scaled "
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            method="post"
          >
            <h2 className="text">Forgot Password</h2>

            <div className="container">
              <div className="row">
                <div className="col">
                  <label className="form-label">E-mail</label>
                  <div className="form-floating mb-1">
                    <input
                      type="email"
                      className="form-control form-control-sm"
                      placeholder="Enter Email"
                      name="email"
                      id="emailErr"
                      value={email}
                      onChange={(e) => [
                        setEmail(e.target.value),
                        setEmailErr(""),
                        setMsg(""),
                      ]}
                    />
                    <label htmlFor="emailErr">Enter Your Email Address</label>
                    {emailErr && <p className="errorstyle">{emailErr}</p>}
                  </div>
                </div>
              </div>

              <div className="mb-1"></div>
              <button type="submit" className="button">
                {selected ? (
                  <div className="spinner-border" role="status" />
                ) : (
                  "Submit"
                )}
              </button>
              {msg && <p className="errorstyle">{msg}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
