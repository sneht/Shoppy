import React from "react";
import "../Login/Login.css";
import { validPaasword, validEmail } from "../../utils/helper";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { loginHandlerData } from "../../service/auth.service";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setMail] = useState(" ");
  const [emailErr, setemailErr] = useState(false);
  const [password, setPwd] = useState(" ");
  const [pwdErr, setpwdErr] = useState(false);
  const [msg, setMsg] = useState(null);
  const [selected, setSelected] = useState(false);
  // const [authtoken, setauthToken] = useState();
  const navigate = useNavigate();
  const successnotify = (msg) =>
    toast.success(msg, { duration: 4000, id: msg });
  const errornotify = (msg) => toast.error(msg, { duration: 4000, id: msg });

  const validation = () => {
    let formIsValid = true;
    if (!password) {
      formIsValid = false;
      setpwdErr("Your Password is required");
    }
    if (!email) {
      formIsValid = false;
      setemailErr("Your Email is required");
    }
    if (!validEmail.test(email)) {
      formIsValid = false;
      setemailErr("Your Email is invalid");
    }

    if (!validPaasword.test(password)) {
      formIsValid = false;
      setpwdErr("Your Password is invalid");
    }

    return formIsValid;
  };
  const handleSubmit = (e) => {
    if (validation() !== true) {
    } else {
      postData(e);
      setSelected(true);
    }
    e.preventDefault();
  };

  const postData = async (event) => {
    event.preventDefault();
    const body = {
      email,
      password,
    };
    const response = await loginHandlerData(body); // eslint-disable-next-line
    if (response.success) {
      localStorage.setItem("accessToken", response?.data.token);
      localStorage.setItem("userData", JSON.stringify(response?.data));
      setSelected(false);
      navigate("/");
      successnotify(response.message);
      setSelected(false);
    } else {
      errornotify(response.message);
      setSelected(false);
    }

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
            <h2 className="text">Sign In</h2>

            <div className="container">
              <div className="row justify-content-start">
                <label className="form-label">Email</label>
                <div className="form-floating mb-1">
                  <input
                    id="email"
                    type="email"
                    className="form-control "
                    placeholder="email"
                    name="email"
                    aria-describedby="addon-wrapping"
                    onChange={(e) => [
                      setMail(e.target.value),
                      setemailErr(" "),
                      setMsg(""),
                    ]}
                  />
                  <label className="label2" htmlFor="fristnameErr">
                    Enter You Email
                  </label>
                  {emailErr && <p className="errorstyle">{emailErr}</p>}
                </div>

                <label className="form-label">Password</label>
                <div className="form-floating mb-1">
                  <input
                    type="password"
                    className="form-control "
                    placeholder="Password"
                    name="password"
                    aria-describedby="addon-wrapping"
                    onChange={(e) => [
                      setPwd(e.target.value),
                      setpwdErr(" "),
                      setMsg(""),
                    ]}
                  />
                  <label className="label2" htmlFor="user">
                    Enter Your Password
                  </label>
                  {pwdErr && <p className="errorstyle">{pwdErr}</p>}
                </div>
              </div>

              <div className="mb-1"></div>
              <button type="submit" className="button">
                {selected ? (
                  <div className="spinner-border" role="status" />
                ) : (
                  "Login"
                )}
              </button>

              <div className="bottom">
                {msg && <p className="errorstyle">{msg}</p>}
                <p>
                  New User?
                  <Link className="text" to="/register">
                    Register
                  </Link>
                </p>
                <p>
                  Are you Forgotton Password ?
                  <Link className="text" to="/forgotPassword">
                    Forgot Password
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
