import React, { useEffect, useState } from "react";
import "./Checkout.css";
// import { validName, validPhoneno } from "../../utils/helper";
import { Stepper, Step } from "react-form-stepper";
import { listBody } from "../../utils/helper";
import { Navigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  cartHndlerData,
  addaddressHndlerData,
  userHndlerData,
  promocodeHndlerData,
  // razorpayDataHandler,
  addressHndlerData,
  addressDelHndler,
  editaddressHndlerData,
  orderDataHandler,
  orderinvoiceDataHandler,
  // productUpdateHandler,
  productHndlerData,
  productUpdate,
} from "../../service/auth.service";
import Addskeleton from "./Addskeleton";
import { Box } from "@mui/system";
import CartsummerySkel from "./CartsummerySkel";
// import { jsPDF } from "jspdf";
import Invoice from "./Invoice";

// const loadScript = (src) => {
//   return new Promise((resolve, reject) => {
//     const script = document.createElement("script");
//     script.src = src;
//     script.onload = () => {
//       resolve(true);
//     };
//     script.onerror = () => {
//       reject(false);
//     };
//     document.body.appendChild(script);
//   });
// };
// const _DEV_ = document.domain === "localhost";

export default function Checkout() {
  /// Cart Summery>>
  const [cart, setCart] = useState([]); // eslint-disable-next-line
  const [userData, setuserData] = useState([]);
  const [goSteps, setGoSteps] = useState(0);
  const [addData, setaddData] = useState([]);
  // const [discountPercent, setDiscountPercent] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [address_1, setAddress] = useState("");
  const [address_2, setAddress2] = useState("");
  const [pincode, setPincode] = useState();
  const [promoCode, setPromoCode] = useState(""); // eslint-disable-next-line
  const [landmark, setLandmark] = useState(""); // eslint-disable-next-line
  const [type, setType] = useState("HOME"); // eslint-disable-next-line
  const [label, setLabel] = useState(""); // eslint-disable-next-line
  const [labelErr, setLabelErr] = useState(false); // eslint-disable-next-line
  const [addressErr, setAddressErr] = useState(false);
  const [address2Err, setAddress2Err] = useState(false); // eslint-disable-next-line
  const [pincodeErr, setPincodeErr] = useState(false);
  const [landmarkErr, setLandmarkErr] = useState(false);
  const [promocodeErr, setPromocoderr] = useState(false);
  const [promocodeSuc, setPromocodeSuc] = useState(false); // eslint-disable-next-line
  const [Promocode, setpromocodeData] = useState(false); // eslint-disable-next-line
  const [discountis, setDiscountIs] = useState(false);
  const [addressId, setaddressId] = useState();
  const [adddiv, setAdddiv] = useState(false);
  const [addeditdiv, setAddeditdiv] = useState(false);
  const [localuserData, setlocaluserData] = useState(false);
  const [editadd, seteditadd] = useState([]);
  const [editId, seteditId] = useState();
  const [loading, setLoading] = useState(true);
  const [cartsumloading, setCartSumLoading] = useState(false);
  const [invoicedata, setInvoiceData] = useState([]);
  // const [paymentId, setPaymentId] = useState("");

  // const [orderStatus, setOrderS tatus] = useState("PLACED");
  // eslint-disable-next-line
  const [cartdetail, setCartdetail] = useState([]);
  const [promocodeId, setPromocodeId] = useState();
  const location = useLocation();

  const { search } = location;
  const userId = localuserData.id;

  // const cartdetail=[
  //   {productId: "" , quantity:""}
  // ]

  useEffect(() => {
    let userId;
    if (search.split("=").length > 0) {
      userId = search.split("=")[1];
    } else {
      userId = "";
    }
    getcartproductData(userId);
    getuserData(userId);
    getaddData(userId);
    setlocaluserData(JSON.parse(localStorage.getItem("userData")));
    getPromocode();
  }, [search]);

  const getcartproductData = async (log = "") => {
    const response = await cartHndlerData(
      listBody({
        where: { userId: log },
      })
    );
    if (response?.length > 0) {
      setCart(response[0]?.cartdetail);
    }
  };

  const cartDataHandler = () => {
    if (cart.length > 0) {
      setCartdetail(
        cart?.map((res) => ({
          productId: res.productId._id,
          quantity: res.quantity,
        }))
      );
    }
  };

  const getPromocode = async () => {
    const response = await promocodeHndlerData(
      listBody({
        where: { isActive: true },
      })
    );

    if (response?.length > 0) {
      setpromocodeData(response);
    }
  };

  const getuserData = async (userId) => {
    // eslint-disable-next-line
    const response = await userHndlerData(userId);
    setuserData(response);
  };

  // const updatedData = cart.map((cart) => ({ ...cart, ...cart.productId })); //Spread Ope..
  // const orderSubtotal = Object.values(updatedData).reduce(
  //   (r, { price }) => r + price,
  //   0
  // );

  var orderSubtotal = 0;
  for (var i = 0; i < cart.length; i++) {
    orderSubtotal += cart[i].productId.discountPrice * cart[i].quantity;
  }

  const onEnterPromoCode = (event) => {
    setPromoCode(event.target.value);
    setPromocodeSuc();
  };

  const finalValue = orderSubtotal - discountPrice + (orderSubtotal / 100) * 18;

  const totalPrice = orderSubtotal > 500 ? finalValue : finalValue + 40;
  // const validate1 = () => {
  //   let formIsValid = true;
  //   if (!validName.test(address_1)) {
  //     formIsValid = false;
  //     setAddressErr("Your Address is invalid");
  //   }

  //   if (!validPhoneno.test(pincode)) {
  //     formIsValid = false;
  //     setPincodeErr("Your Pincode is invalid");
  //   }

  //   if (!validName.test(label)) {
  //     formIsValid = false;
  //     setLabelErr("Your Label is invalid");
  //   }

  //   return formIsValid;
  // };

  const addresshandleSubmit = (e) => {
    postAddData(e);
    setAdddiv(false);
    getaddData();

    e.preventDefault();
  };

  const postAddData = async (event) => {
    event.preventDefault();
    const body = {
      userId,
      address_1,
      address_2,
      label,
      landmark,
      pincode,
      type,
    };
    const response = await addaddressHndlerData(body); // eslint-disable-next-line
    if (response) {
      getaddData(userId);
    }
  };

  const editaddressHndler = async (event) => {
    event.preventDefault();
    const body = {
      address_1,
      address_2,
      label,
      landmark,
      pincode,
      type,
    };
    const response = await editaddressHndlerData(editId, body);

    if (response) {
      setAddeditdiv(false);
      getaddData(userId);
    }
  };

  const getaddData = async (log = "") => {
    setLoading(true);
    const response = await addressHndlerData(
      listBody({
        where: { userId: log, isActive: true },
      })
    );

    if (response) {
      setaddData(response);
      setLoading(false);
    }
  };

  const handlecheckbox = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setaddressId(value);
    }
  };

  const addcheckhandle = (e) => {
    if (addressId) {
      setLoading(false);
      setGoSteps(1);

      localStorage.setItem("SeletedAddressId", addressId);
    } else {
      alert("Select One Address");
    }
  };

  const addDelhandler = async (itemId) => {
    const response = await addressDelHndler(itemId);

    if (response) {
      getaddData(userId);
    }
  };
  const addressedit = async (id) => {
    setAddeditdiv(true);
    const response = await addressHndlerData(
      listBody({
        where: { isActive: true, _id: id },
      })
    );

    if (response?.length > 0) {
      seteditadd(response[0]);
      seteditId(response[0]?._id);
    }
  };

  const displayRazorpay = async () => {
    setLoading(true);
    cartDataHandler();
    // alert("Paymnet");
    let r = (Math.random() + 1).toString(36).substring(2).toUpperCase();
    // eslint-disable-next-line
    orderinfoHandler("#" + `${r}`);
    Navigate("/");
    // const res = await loadScript(
    //   "https://checkout.razorpay.com/v1/checkout.js"
    // );
    // if (!res) {
    //   alert("Razorpay SDK failed to load, Are you online");
    //   return;
    // }

    // const body = {
    //   amount: parseInt(totalPrice),
    // };
    // const response = await razorpayDataHandler(body);

    // if (response.data) {
    //   const options = {
    //     key: _DEV_
    //       ? "rzp_test_XqUGrjRWQI1oVV"
    //       : "enter here your live mode key from razorpay ",
    //     amount: response.data.amount,
    //     currency: response.data.currency,
    //     order_id: response.data.order_id,
    //     name: "Shoppy",
    //     description: "Payment options",
    //     image: "../images/pop_up_logo.png",

    //     handler: function (response) {
    //       // console.log("RESPONSE AFTER THE PAYMENT SUCCESSFULL", response);

    //       orderinfoHandler(response.razorpay_payment_id);
    //     },
    //     prefill: {
    //       name: userData.firstName + " " + userData.lastName,
    //       email: userData.email,
    //       contact: userData.phoneNumber,
    //     },
    //   };
    //   const paymentObject = new window.Razorpay(options);
    //   paymentObject.open();
    // } else {
    //   // console.log("API CALL ERROR WHILE GETTING  SECRECT KEY RAZOR PAY");
    // }
  };

  // console.log(invoiceData);
  // const componentRef = useRef();

  const checkPromoCode = (promoCode) => {
    setPromocoderr(false);
    setCartSumLoading(true);
    setLoading(false);
    try {
      const isValidCode = Promocode.filter(
        (res) => res.couponcode === promoCode.trim()
      )[0];

      if (isValidCode) {
        setPromocodeId(isValidCode._id);
        setPromoCode(isValidCode.couponcode);
      } else {
        setPromocodeId("");
      }

      if (isValidCode) {
        switch (isValidCode.type) {
          case "PERCENTAGE":
            if (
              (isValidCode.minvalue * orderSubtotal) / 100 <
              isValidCode.maxdiscountvalue
            ) {
              setDiscountPrice((isValidCode.minvalue * orderSubtotal) / 100);
              setPromocodeSuc(`${promoCode} Promcode Applied!`);
              setDiscountIs(true);
              setCartSumLoading(false);
            } else {
              setDiscountPrice(isValidCode.maxdiscountvalue);
              setPromocodeSuc(`${promoCode} Promcode Applied!`);
              setDiscountIs(true);
              setCartSumLoading(false);
            }

            break;
          case "FLAT":
            setDiscountPrice(isValidCode.minvalue);
            setPromocodeSuc(`${promoCode} Promcode Applied!`);
            setDiscountIs(true);
            setCartSumLoading(false);
            break;
          default:
            break;
        }
      } else {
        setPromocoderr("Your Promocode is invalid !");
        setDiscountIs(false);
        setDiscountPrice(0);
        setPromocodeSuc();
        setCartSumLoading(false);
      }
    } catch (error) {
      return console.log(error);
    }
  };

  const orderinfoHandler = async (pId) => {
    const body = {
      userId,
      addressId,
      promocodeId,
      orderStatus: "PLACED",
      paymentId: pId,
      discountPrice,
      totalPrice,
      cartdetail: cart?.map((res) => ({
        productId: res.productId._id,
        quantity: res.quantity,
      })),
    };
    console.log(body);
    const response = await orderDataHandler(body); // eslint-disable-next-line

    if (response) {
      // console.log("ORDERDATA", response);

      invoiceDataHandler(pId);
    }
  };

  const productQuantity = async () => {
    var items = cart?.map((res) => {
      let menu = { productId: res.productId._id, quantity: res.quantity };
      return menu;
    });
    console.log("CART", items);
    var products = await productHndlerData(
      listBody({ where: { isActive: true } })
    );
    console.log("PRODUCT", products);
    const result = items.concat(products);
    console.log("CONCAT", result);
    const res = Array.from(
      result
        .reduce(
          (m, o) => (
            m.has(o._id || o.productId)
              ? m.set(o._id || o.productId, {
                  ...m.get(o._id || o.productId),
                  quantity: m.get(o._id || o.productId).quantity - o.quantity,
                }) // eslint-disable-next-line
              : m.set(o._id || o.productId, { ...o }),
            m
          ),
          new Map()
        )
        .values()
    );
    console.log("ADDRES", res);

    var finalProduct = Object.values(
      res.reduce((r, o) => {
        r[o._id || o.productId] = r[o._id || o.productId] || {
          productId: o._id || o.productId,
          quantity: 0,
        };
        r[o._id || o.productId].quantity += Math.abs(+o.quantity);
        return r;
      }, {})
    );

    const quantityProduct = { data: finalProduct };
    console.log("FINAL", finalProduct);
    const updateProduct = await productUpdate(quantityProduct);
    console.log("UPDATE", updateProduct);
  };

  const invoiceDataHandler = async (pId) => {
    const response = await orderinvoiceDataHandler(
      listBody({ where: { isActive: true, paymentId: pId } })
    ); // eslint-disable-next-line

    if (response) {
      setGoSteps(2);
      setInvoiceData(response?.[0]);
      setCart(response?.[0].cartdetail);
      setLoading(false);
      productQuantity();
    }
  };

  // var doc = new jsPDF();
  // doc.fromHTML(ReactDOMServer.renderToStaticMarkup(this.render()));
  // doc.save("invoice.pdf");

  return (
    <>
      <div className="container">
        <div className="row main">
          <div className="col-lg-12 Checkcard">
            <Stepper activeStep={goSteps} className="subt">
              <Step label="Delivery Address" />
              <Step label="Order Payment" />
              <Step label="Order Invoice" />
            </Stepper>
            {goSteps === 0 && (
              <>
                {!adddiv && !addeditdiv && (
                  <>
                    <div className="row customcard">
                      <h4 className="main-heading main">Delivery Address</h4>
                      {/* {loading && (
                        <PropagateLoader className="loadingdata" size={25} />
                      )} */}

                      {loading && (
                        <Box>
                          <Addskeleton />
                          <Addskeleton />
                          <Addskeleton />
                          <Addskeleton />
                        </Box>
                      )}

                      {addData.length > 0 &&
                        !loading &&
                        addData.map((data, index) => {
                          return (
                            <label className="col-md-5 mb-3  form-check">
                              <input
                                type="radio"
                                className="checkbox-input-adds form-check-input"
                                id={`${("flexRadioDefault", index + 1)}`}
                                value={data._id}
                                name="optradio"
                                // checked={checked === option.value}
                                onChange={(e) => handlecheckbox(e)}
                              />
                              <span className="checkbox-adds">
                                <span className="checkbox-icon">
                                  <h5 className="cardhending">
                                    {data.type}
                                    <i
                                      className="fa-solid fa-trash-can delicon"
                                      onClick={() => addDelhandler(data._id)}
                                    ></i>
                                    <i
                                      className="fa-solid fa-pen-to-square editicon"
                                      onClick={() => addressedit(data._id)}
                                    ></i>
                                  </h5>
                                  <p className="cardcon">
                                    {data.address_1}
                                    {data.address_2}
                                  </p>
                                </span>
                              </span>
                            </label>
                          );
                        })}

                      {!loading && (
                        <button
                          className="col-md-6  addcardbutton"
                          onClick={() => setAdddiv(true)}
                        >
                          + Add Delivery Address
                        </button>
                      )}

                      <div className="row mt-5">
                        <div className="col-sm-3">
                          <Link
                            className="button"
                            to={`/cart?uid=${localuserData.id}`}
                          >
                            Go to cart
                          </Link>
                        </div>
                        <div className="col-sm-7"></div>
                        <div className="col-sm-2">
                          <button
                            className="button"
                            type="submit"
                            onClick={() => addcheckhandle()}
                          >
                            Next Step
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {adddiv && (
                  <form
                    className="customcard"
                    method="post"
                    onSubmit={(e) => {
                      addresshandleSubmit(e);
                    }}
                  >
                    <h4 className="main-heading main">
                      Enter Delivery Address
                    </h4>
                    <div className="col-md-8 mb-3">
                      <label htmlFor="address">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        placeholder="Enter Address"
                        name="Address"
                        value={address_1}
                        onChange={(e) => [
                          setAddress(e.target.value),
                          setAddressErr(""),
                        ]}
                      />
                      {addressErr && <p className="errorstyle">{addressErr}</p>}
                    </div>

                    <div className="col-md-8 mb-3">
                      <label htmlFor="address2">
                        Address 2 <span className="text-muted">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address2"
                        placeholder="Enter Address 2"
                        name="Address2"
                        value={address_2}
                        onChange={(e) => [
                          setAddress2(e.target.value),
                          setAddress2Err(""),
                        ]}
                      />
                      {address2Err && (
                        <p className="errorstyle">{address2Err}</p>
                      )}
                    </div>
                    <div className="col-md-4 mb-3">
                      <label htmlFor="address2">
                        Label <span className="text-muted"></span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="label"
                        placeholder="Enter Recevier Name"
                        name="label"
                        value={label}
                        onChange={(e) => [
                          setLabel(e.target.value),
                          setLabelErr(""),
                        ]}
                      />
                      {labelErr && <p className="errorstyle">{labelErr}</p>}
                    </div>
                    <div className="row">
                      <div className="col-md-3 mb-3">
                        <label htmlFor="zip">Landmark</label>
                        <input
                          type="text"
                          className="form-control"
                          id="landmark"
                          placeholder="Enter Landmark"
                          name="landmark"
                          value={landmark}
                          onChange={(e) => [
                            setLandmark(e.target.value),
                            setLandmarkErr(""),
                          ]}
                        />
                        {landmarkErr && (
                          <p className="errorstyle">{landmarkErr}</p>
                        )}
                      </div>
                      <div className="col-md-3 mb-3">
                        <label htmlFor="zip">Pincode</label>
                        <input
                          type="text"
                          className="form-control"
                          id="pincode"
                          placeholder="Enter Pincode"
                          name="pincode"
                          maxLength={6}
                          value={pincode}
                          onChange={(e) => [
                            setPincode(parseInt(e.target.value)),
                            setPincodeErr(""),
                          ]}
                        />
                        {pincodeErr && (
                          <p className="errorstyle">{pincodeErr}</p>
                        )}
                      </div>
                      <div className="col-md-3 mb-3">
                        <label htmlFor="zip">Select type of Address</label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          value={type}
                          onChange={(e) => [setType(e.target.value)]}
                        >
                          <option value="HOME" selected>
                            Home
                          </option>
                          <option value="WORK">Work</option>
                          <option value="OTHER">Other</option>
                        </select>
                      </div>
                    </div>

                    <hr className="mb-4" />
                    <div className="row">
                      <div className="col-sm-3">
                        <button
                          className="button"
                          onClick={() => setAdddiv(false)}
                        >
                          Back
                        </button>
                      </div>
                      <div className="col-sm-7"></div>
                      <div className="col-sm-2">
                        <button className="button">Save</button>
                      </div>
                    </div>
                  </form>
                )}

                {addeditdiv && (
                  <form
                    className="customcard"
                    method="post"
                    onSubmit={(e) => {
                      editaddressHndler(e);
                    }}
                  >
                    <h4 className="main-heading main">
                      Update Delivery Address
                    </h4>
                    <div className="col-md-8 mb-3">
                      <label htmlFor="address">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="Address"
                        value={editadd.address_1}
                        onChange={(e) => [
                          setAddress(e.target.value),
                          setAddressErr(""),
                        ]}
                      />
                      {addressErr && <p className="errorstyle">{addressErr}</p>}
                    </div>

                    <div className="col-md-8 mb-3">
                      <label htmlFor="address2">
                        Address 2 <span className="text-muted">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address2"
                        placeholder="Enter Address 2"
                        name="Address2"
                        value={editadd.address_2}
                        onChange={(e) => [
                          setAddress2(e.target.value),
                          setAddress2Err(""),
                        ]}
                      />
                      {address2Err && (
                        <p className="errorstyle">{address2Err}</p>
                      )}
                    </div>
                    <div className="col-md-4 mb-3">
                      <label htmlFor="address2">
                        Label <span className="text-muted"></span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="label"
                        placeholder="Enter Recevier Name"
                        name="label"
                        value={editadd.label}
                        onChange={(e) => [
                          setLabel(e.target.value),
                          setLabelErr(""),
                        ]}
                      />
                      {labelErr && <p className="errorstyle">{labelErr}</p>}
                    </div>
                    <div className="row">
                      <div className="col-md-3 mb-3">
                        <label htmlFor="zip">Landmark</label>
                        <input
                          type="text"
                          className="form-control"
                          id="landmark"
                          placeholder="Enter Landmark"
                          name="landmark"
                          maxLength={10}
                          value={editadd.landmark}
                          onChange={(e) => [
                            setLandmark(e.target.value),
                            setLandmarkErr(""),
                          ]}
                        />
                        {landmarkErr && (
                          <p className="errorstyle">{landmarkErr}</p>
                        )}
                      </div>
                      <div className="col-md-3 mb-3">
                        <label htmlFor="zip">Pincode</label>
                        <input
                          type="text"
                          className="form-control"
                          id="pincode"
                          placeholder="Enter Pincode"
                          name="pincode"
                          maxLength={6}
                          value={editadd.pincode}
                          onChange={(e) => [
                            setPincode(parseInt(e.target.value)),
                            setPincodeErr(""),
                          ]}
                        />
                        {pincodeErr && (
                          <p className="errorstyle">{pincodeErr}</p>
                        )}
                      </div>
                      <div className="col-md-3 mb-3">
                        <label htmlFor="zip">Select type of Address</label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          value={editadd.type}
                          onChange={(e) => [setType(e.target.value)]}
                        >
                          <option value="HOME" selected>
                            Home
                          </option>
                          <option value="WORK">Work</option>
                          <option value="OTHER">Other</option>
                        </select>
                      </div>
                    </div>

                    <hr className="mb-4" />
                    <div className="row">
                      <div className="col-sm-2">
                        <button
                          className="button"
                          onClick={() => setAddeditdiv(false)}
                        >
                          Back
                        </button>
                      </div>
                      <div className="col-sm-7"></div>
                      <div className="col-sm-3">
                        <button className="button" type="submit">
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </>
            )}

            {goSteps === 1 && (
              <div className="col customcard ">
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text">Your Cart Summary</span>
                </h4>
                <div className="input-group"></div>
                <div className="row">
                  <div className="col-sm-8 col">
                    <ul className="list-group mb-3">
                      <li className="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                          <h6 className="my-0 text">Total Price of Product</h6>
                        </div>
                        <span className="text-muted">
                          &#x20b9; {orderSubtotal}
                        </span>
                      </li>
                      {discountis && (
                        <>
                          <li className="list-group-item d-flex justify-content-between bg-light">
                            <div className="text-success">
                              <h6 className="my-0 text">Discount Price</h6>
                            </div>
                            <span className="text-success">
                              &#x20b9; {discountPrice}
                            </span>
                          </li>

                          <li className="list-group-item d-flex justify-content-between">
                            <div className="text-success">
                              <h6 className="my-0 text">
                                After Discount Total Price
                              </h6>
                            </div>
                            <span className="text-success">
                              &#x20b9; {orderSubtotal - discountPrice}
                            </span>
                          </li>
                        </>
                      )}
                      <li className="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                          <h6 className="my-0 text">Tax (SGST+ CGST)</h6>
                        </div>
                        <span className="text-muted">
                          &#x20b9; {((orderSubtotal / 100) * 18).toFixed(2)}
                        </span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                          <h6 className="my-0 text">Shipping Charge</h6>
                        </div>
                        <span className="text-muted">
                          &#x20b9; {orderSubtotal > 500 ? "0" : "40"}
                        </span>
                      </li>

                      <li className="list-group-item d-flex justify-content-between bg-light">
                        <span>Total</span>
                        <strong>
                          &#x20b9;
                          {/* {orderSubtotal > 500 ? finalValue : finalValue + 40} */}
                          {totalPrice.toFixed(2)}
                        </strong>
                      </li>
                    </ul>
                  </div>

                  {cartsumloading && <CartsummerySkel />}

                  <div className="col-4 row">
                    <div className="row">
                      <div className="col-6">
                        <input
                          type="text"
                          className="form-control"
                          value={promoCode}
                          onChange={(e) => [
                            onEnterPromoCode(e),
                            setPromocoderr(""),
                          ]}
                        />
                      </div>
                      <div className="col-6">
                        <button
                          className="button "
                          type="submit"
                          onClick={() => checkPromoCode(promoCode)}
                        >
                          Apply
                        </button>
                        <br />
                      </div>
                      <div className="">
                        {promocodeErr && (
                          <p className="errorstyle">{promocodeErr}</p>
                        )}
                        {promocodeSuc && (
                          <p className="Sstyle">{promocodeSuc}</p>
                        )}
                      </div>
                    </div>
                    <div className="promocodescroll">
                      {Promocode?.map((code, index) => {
                        return (
                          <div
                            className="promocode col-6"
                            onClick={() => checkPromoCode(code.couponcode)}
                            key={`promocode_${index}}`}
                          >
                            <span class="promocode-h">{code.couponcode}</span>
                            <h6 class="promocodeinfo">{code.description}</h6>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <hr className="mb-4" />
                <div className="row">
                  <div className="col-sm-2">
                    <button className="button" onClick={() => setGoSteps(0)}>
                      Back
                    </button>
                  </div>
                  <div className="col-sm-7"></div>
                  <div className="col-sm-3">
                    {}
                    <button
                      className="button"
                      onClick={() => displayRazorpay()}
                    >
                      {loading ? (
                        <div className="spinner-border" role="status" />
                      ) : (
                        "Pay now"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* {goSteps === 2 && (<StripeContainer price={TOTAL_PRICE} />)} */}
            {goSteps === 2 && (
              <div className="col customcard">
                <div className="container-fluid invoice">
                  <Invoice
                    invoicedata={invoicedata}
                    orderSubtotal={orderSubtotal}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
