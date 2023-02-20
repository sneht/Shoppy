import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { listBody } from "../../utils/helper";
import {
  categoryHndlerData,
  catchSearchData,
} from "../../service/auth.service";
import { URL } from "../../utils/helper";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartList } from "../../js/actions";
import TopLoading from "../TopLoading";

export default function Navbar(props) {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart.list);
  const [categoriesData, setcategoriesData] = useState([]);
  const [token, setToken] = useState();
  const [userData, setuserData] = useState(null);
  const [searchdata, setSearchData] = useState([]);
  const [searchedText, setSearchedText] = useState();

  const navigate = useNavigate();
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const userDetails = JSON.parse(localStorage.getItem("Data"));
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isOpen && ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    getcategoryData();
    setToken(localStorage.getItem("accessToken"));
    setuserData(JSON.parse(localStorage.getItem("Data")) || []);
    // dispatch(fetchCartList(listBody({ where: { userId: userData.id } })));
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (userData !== null) {
      dispatch(fetchCartList(listBody({ where: { userId: userData.id } })));
    } // eslint-disable-next-line
  }, [userData]);

  const getcategoryData = async () => {
    const response = await categoryHndlerData(
      listBody({ where: { isActive: true }, perPage: 1000 })
    );
    if (response) {
      setcategoriesData(response);
      props.setNavbar(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("Data");
    navigate("/login");
  };

  const searchHandler = async (e) => {
    setSearchedText(e.target.value.length);
    try {
      if (e.target.value.length > 1) {
        const body = {
          searchText: e.target.value,
        };
        const response = await catchSearchData(body);
        setSearchData(response.data[0]);
      } else if (e.target.value.length === 0) {
        setSearchData([]);
      }
    } catch (error) {
      alert(error);
    }
  };

  const inputRef = useRef(null);
  const onButtonClick = () => {
    // @ts-ignore (us this comment if typescript raises an error)
    inputRef.current.value = "";
    setSearchData([]);
  };

  const toggleToNext = (id) => {
    inputRef.current.value = "";
    setSearchData([]);
    navigate(`/products?cid=${id}`);
  };

  return (
    <>
      <nav className="navbar navbar-expand-md fixed-top text">
      {props.topLoading ? <TopLoading /> : ""}
        <div className="containe hell" ref={ref}>
          <div className="row topnavbar">
            <div className="col-sm">
              <Link className="logo" to="/">
                <img
                  src="../images/logo.png"
                  className="logoimg"
                  alt="logo"
                ></img>
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarsExampleDefault"
                aria-controls="navbarsExampleDefault"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
            </div>

            <div className="col-sm">
              <div
                className="input-group"
                onClick={() => setIsOpen((oldState) => !oldState)}
              >
                <input
                  ref={inputRef}
                  type="text"
                  className="searchBar"
                  placeholder="Search..."
                  onChange={(e) => searchHandler(e)}
                />
                <button
                  type="button"
                  className="btn bg-transparent iconClass"
                  style={{
                    marginLeft: "-40px",
                    zIndex: "100",
                    border: "none",
                    color: "#25316d",
                    fontSize: "16px",
                  }}
                  onClick={onButtonClick}
                >
                  {isOpen && <i className="fa fa-times"></i>}
                </button>
              </div>
              {isOpen ? (
                <>
                  {searchedText === 0 ? (
                    ""
                  ) : searchdata?.products?.length ||
                    searchdata?.category?.length >= 0 ? (
                    <div className="movieList">
                      <div>
                        {searchdata?.category?.length > 0 ? (
                          searchdata?.category?.map((c) => {
                            return (
                              <li
                                style={{ listStyle: "none" }}
                                key={c._id}
                                className="listClass"
                                onClick={() => toggleToNext(c._id)}
                              >
                                <img
                                  src={URL + c.categoryImg}
                                  alt="img"
                                  className="imageClass"
                                  width="50px"
                                  height="50px"
                                />
                                {c.categoryName}
                              </li>
                            );
                          })
                        ) : searchdata?.products?.length > 0 ? (
                          searchdata?.products?.map((p) => {
                            return (
                              <li
                                style={{ listStyle: "none" }}
                                key={p._id}
                                className="listClass"
                                onClick={() => toggleToNext(p.categoryId._id)}
                              >
                                <img
                                  src={URL + p.img}
                                  alt="img"
                                  width="50px"
                                  height="50px"
                                  className="imageClass"
                                />
                                {p.name}
                              </li>
                            );
                          })
                        ) : searchedText === 0 ? (
                          ""
                        ) : (
                          <div className="noData">
                            <p>No Such Data Found !</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                ""
              )}
            </div>

            <div className="col-sm">
              <div
                className="collapse navbar-collapse"
                id="navbarsExampleDefault"
                style={{ marginTop: "5px" }}
              >
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <Link className="nav-link" to="/">
                      Home
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/products"
                      state={{ data: "seeall" }}
                    >
                      Products
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <div
                      className="nav-link dropdown-toggle"
                      id="dropdown01"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Categories
                    </div>

                    <ul className="dropdown-menu" aria-labelledby="dropdown01">
                      {categoriesData?.map((card, index) => {
                        return (
                          <Link
                            key={`category_${index}`}
                            to={`/products?cid=${card._id}`}
                            id={card._id}
                            state={{ data: `${card._id}` }}
                            // onClick={() => handleClick(card._id)}
                            className="dropdown-item"
                          >
                            {card.categoryName}
                          </Link>
                        );
                      })}
                    </ul>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={`/cart?uid=${userData?.id}`}
                      type="button"
                      className="btn carticon position-relative"
                    >
                      <i className="fas fa-shopping-cart"></i>
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-scuess cartcount">
                        {userDetails ? cartData.length : 0}
                      </span>
                    </Link>
                  </li>
                  {/* <li>
                    <Link to={`/wishlist`}>
                      <div className="btn watchListicon position-relative">
                        <span>&#9825;</span>
                      </div>
                    </Link>
                  </li> */}

                  <li
                    className="nav-item dropdown"
                    style={{ display: token ? "block" : "none" }}
                  >
                    <div
                      className="nav-link dropdown-toggle"
                      id="dropdown01"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="bi bi-person-circle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path
                          fillRule="evenodd"
                          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                        />
                      </svg>
                    </div>
                    <ul className="dropdown-menu" aria-labelledby="dropdown01">
                      <Link
                        className="nav-link"
                        to={`/user?uid=${userData?.id}`}
                      >
                        Profile
                      </Link>
                      <Link className="nav-link" to={`/wishlist`}>
                        Wishlist
                      </Link>
                      <Link className="nav-link" to={`/order`}>
                        Order
                      </Link>
                    </ul>
                  </li>
                  <li className="nav-item" style={{ width: "100px" }}>
                    <p className="userName">{`Hello, ${
                      userDetails ? userDetails.firstName : "sign in"
                    }`}</p>
                  </li>
                  <li className="nav-item ">
                    <Link
                      onClick={logout}
                      style={{ display: token ? "block" : "none" }}
                      to="/login"
                      className="nav-link"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="24"
                        fill="currentColor"
                        className="bi bi-box-arrow-right"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                        />
                        <path
                          fillRule="evenodd"
                          d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                        />
                      </svg>
                    </Link>
                  </li>

                  <li
                    className="nav-item "
                    style={{ display: token ? "none" : "block" }}
                  >
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                  <li
                    className="nav-item "
                    style={{ display: token ? "none" : "block" }}
                  >
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
