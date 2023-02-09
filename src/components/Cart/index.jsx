import React, { useEffect, useState } from "react";
import "./Cart.css";
import { Link } from "react-router-dom";
import Cartproduct from "./Cartproduct";
import {
  // cartHndlerData,
  cartproductdeleteHndlerData,
  cartseldeleteHndlerData,
} from "../../service/auth.service";
import { delBody, listBody } from "../../utils/helper";
import { useLocation } from "react-router-dom";
import Cartskeleton from "./Cartskeleton";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartList } from "../../js/actions";
import toast from "react-hot-toast";

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.list);
  // console.log("cart: ", cart);
  // const [cart, setCart] = useState([]);
  const location = useLocation();
  const [uid, setuid] = useState();
  const { search } = location;
  const [loading, setLoading] = useState(true);
  const [checkedList, setcheckedList] = useState([]); // eslint-disable-next-line
  const [isCheckAll, setIsCheckAll] = useState(false);
  const successnotify = (msg) =>
    toast.success(msg, { duration: 4000, id: msg });

  useEffect(() => {
    let userId;
    if (search.split("=").length > 0) {
      userId = search.split("=")[1];
    } else {
      userId = "";
    }

    getcartproductData(userId);
    setuid(userId); // eslint-disable-next-line
  }, [search]);

  const getcartproductData = async (id) => {
    // const response = await cartHndlerData(
    //   listBody({
    //     where: { userId: log },
    //   })
    // );
    // setLoading(false);

    // if (response.length > 0) {
    //   setCart(response[0]?.cartdetail);
    // } else {
    // }
    dispatch(fetchCartList(listBody({ where: { userId: id } })));
    setLoading(false);
  };

  var orderSubtotal = 0;
  for (var i = 0; i < cart.length; i++) {
    orderSubtotal += cart[i].productId.discountPrice * cart[i].quantity;
  }

  const handleDelete = async (itemId) => {
    // eslint-disable-next-line
    const response = await cartproductdeleteHndlerData(
      delBody({
        userId: String(uid),
        productId: String(itemId),
      })
    );

    // call here too
    getcartproductData(uid);
  };

  const handlecheckbox = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setcheckedList([...checkedList, value]);
    } else {
      setcheckedList(checkedList.filter((e) => e !== value));
    }
  };

  const alldelete = async (id) => {
    const response = await cartseldeleteHndlerData({
      userId: uid,
      cartdetail: [id],
    });

    if (response.success) {
      // call here too
      getcartproductData(uid);
      setcheckedList([]);
      successnotify("Products Deleted Successfully");
    }
  };

  const handleSelectAll = (e) => {
    // setIsCheckAll(!isCheckAll);
    if (isCheckAll) {
      setcheckedList([]);
    } else {
      setcheckedList(cart.map((li) => li.productId._id));
    }
  };

  const handledeSelectAll = (e) => {
    setcheckedList([]);
  };

  const shipCharge = orderSubtotal > 500 ? 0 : 40;
  const tax = (orderSubtotal / 100) * 18;
  const Total = orderSubtotal + tax + shipCharge;

  return (
    <>
      <div className="container">
        {cart.length > 0 && (
          <div className="mb-5 row">
            <div
              className={
                cart.length > 0
                  ? "pe-xl-3 col-lg-8 card giveMargin"
                  : "pe-xl-3 col-lg-12 card giveMargin"
              }
            >
              <div className="cart mb-1">
                <div className="cart-body" />
                <div className="mainBody-content">
                  <h4 className="mainBody-heading mainBody">Shopping Cart</h4>
                  <div className="text">
                    <p>You have {cart.length} items in your cart.</p>{" "}
                  </div>
                  <div
                    style={{ display: orderSubtotal > 0 ? "block" : "none" }}
                  >
                    {/* {checkedList.length > 0 && (
                      <button
                        className="dbutton ml-1"
                        type="button"
                        onClick={alldelete}
                      >
                        DELETE ({checkedList.length})
                      </button>
                    )} */}
                    {checkedList.length === 0 && (
                      <button
                        type="button"
                        className="dbutton ml-1"
                        onClick={handleSelectAll}
                        checked={checkedList.includes(cart._id)}
                      >
                        Select All
                      </button>
                    )}
                    {checkedList.length > 0 && (
                      <button
                        type="button"
                        className="dbutton ml-1"
                        onClick={handledeSelectAll}
                      >
                        Deselect All
                      </button>
                    )}
                  </div>
                </div>
                <div
                  className={
                    cart.length > 2
                      ? "container cartscroll cartheight"
                      : "container cartheight"
                  }
                >
                  <div className="d-flex justify-content-center row cartheight">
                    {cart.length > 0 &&
                      cart.map((card) => {
                        return (
                          <Cartproduct
                            card={card}
                            key={`cartproduct_${card.id}}`}
                            checkedList={checkedList}
                            onDelete={handleDelete}
                            handlecheckbox={handlecheckbox}
                            setcheckedList={setcheckedList}
                            alldelete={alldelete}
                          />
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{ display: orderSubtotal > 0 ? "block" : "none" }}
              className="col-lg-4 mainBody giveMargin"
            >
              <div className="mb-5 card">
                <div className="card-header">
                  <h6 className="mb-0">Order Summary</h6>
                </div>
                <div className="py-4 card-body">
                  <p className="text-muted text-sm">
                    Shipping and additional costs are calculated based on values
                    you have entered.
                  </p>
                  <table className="table card-text">
                    <tbody>
                      <tr>
                        <th className="py-4">Order Subtotal</th>
                        <td className="py-4 text-end text-muted">
                          &#x20b9; {orderSubtotal}
                        </td>
                      </tr>
                      <tr>
                        <th className="py-4">Shipping Charge</th>
                        <td className="py-4 text-end text-muted">
                          &#x20b9;{shipCharge}
                        </td>
                      </tr>
                      <tr>
                        <th className="py-4">Tax (SGST+ CGST)</th>
                        <td className="py-4 text-end text-muted">
                          &#x20b9; {tax.toFixed(2)}
                        </td>
                      </tr>
                      <tr>
                        <th className="pt-4 border-0">Total</th>
                        <td className="pt-4 border-0 text-end h5 fw-normal">
                          &#x20b9;
                          {Total.toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="text-muted text-sm">
                    Final price and discounts will be determined at the time of
                    payment processing.
                  </p>
                  <div className="overflow-hidden p-0 card-footer">
                    <div className="d-grid">
                      <Link to={`/checkout?cid=${uid}`}>
                        <button className="button">Proceed to Checkout</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {cart.length === 0 && !loading && (
          <div className="mb-5 row">
            <div className="pe-xl-3 col-lg-12 card">
              <div className="cart mb-3">
                <div className="cart-body" />
                <div className="mainBody-content"></div>

                <div className="col-md-12 mainBody pt-2">
                  <img
                    src="/images/empty-cart.webp"
                    className=" mx-auto d-block"
                    alt="..."
                  />
                  <p className="header_one">Your cart is empty!!</p>
                  <p className="header_two">
                    Please add product to your cart list
                  </p>
                  <Link to="/">
                    <button className="carthome button">Go to Home</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {loading && <Cartskeleton />}
    </>
  );
}
