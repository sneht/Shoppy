/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./Cart.css";
import { listBody, URL } from "../../utils/helper";
import { addcartHndlerData } from "../../service/auth.service";
import { fetchCartList } from "../../js/actions";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const Cartproduct = (props) => {
  const dispatch = useDispatch();
  const [num, setNum] = useState();
  // const [updatedCard,setUpdatedCard]=useState(props.card);
  const userDetails = JSON.parse(localStorage.getItem("userData"));
  useEffect(() => {
    setNum(props.card.quantity);
  }, []);
  const successnotify = (msg) => {
    userDetails
      ? toast.success(msg, { duration: 3000, id: msg })
      : toast.error(msg, { duration: 3000, id: msg });
  };
  const incNum = (e, data) => {
    e.preventDefault();
    setNum(num + 1);
    cartFunc(data);
    // setNum(Number(num) + 1);
    // localStorage.setItem("CartNum", num);
  };

  const decNum = (e, data) => {
    e.preventDefault();
    cartFunc(data);
    if (num > 1) {
      setNum(num - 1);
    }
  };
  console.log(props.card);
  const cartFunc = async (cartdata) => {
    // setChildata([]);
    const body = {
      userId: props.card._id,
      productId: props.card.productId._id,
      quantity: num,
    };
    const response = await addcartHndlerData(body); // eslint-disable-next-line
    dispatch(fetchCartList(listBody({ where: { userId: cartdata.userId } })));
    if (response.success) {
      localStorage.setItem("cardDetail",response.data.cartdetail[0])
      console.log(response.data.cartdetail[0]);
      successnotify("Product added to cart successfully!");
    }
  };
  return (
    <label className="checkbox-wrapper cartrow">
      <input
        type="checkbox"
        className="checkbox-input"
        value={props.card.productId._id}
        checked={props.checkedList.includes(props.card.productId._id)}
        onChange={(e) => props.handlecheckbox(e)}
      />
      <span
        className={
          props.checkedList.includes(props.card.productId._id)
            ? "checkbox-tile-bg"
            : "checkbox-tile "
        }
      >
        <span className="checkbox-icon">
          <div className="col-md-12 main pt-2" key={props.card.id}>
            <div className="row cartrow">
              <div className="col-md-4 ">
                <img
                  className="img-fluid img-responsive rounded product-image"
                  src={URL + props.card.productId.img}
                  alt="cardimg"
                />
              </div>
              <div className="col-md-5 mt-3">
                <h5>Product Name: {props.card.productId.name}</h5>
                <h6 style={{ display: "flex" }}>
                  Product Quantity :
                  <div
                    className="counterModal d-flex justify-content-center"
                    style={{ marginTop: "3px" }}
                  >
                    <button
                      className="counterbuttonModal"
                      onClick={(e) => decNum(e, props.card)}
                    >
                      -
                    </button>
                    {num}
                    <button
                      className="counterbuttonModal"
                      onClick={(e) => incNum(e, props.card)}
                    >
                      +
                    </button>
                  </div>
                </h6>
                <p>Specification: {props.card.productId.specification}</p>
              </div>
              <div className="col-md-3 mt-3">
                <h5 className="text">
                  &#x20b9;{" "}
                  {props.card.productId.discountPrice * props.card.quantity}
                  /-
                </h5>
                <h6>
                  &#x20b9;
                  <del>
                    {props.card.productId.price}
                    /-
                  </del>
                </h6>
                <button
                  className="dbutton ml-1"
                  type="button"
                  onClick={() => [props.alldelete(props.card.productId._id)]}
                >
                  DELETE
                </button>
              </div>
              {/* <div className="col-md-1 mt-3">
                  <button
                    className="dbutton"
                    type="button"
                    onClick={() => props.onDelete(props.card.productId._id)}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div> */}
            </div>
          </div>
        </span>
      </span>
    </label>
  );
};
export default Cartproduct;
