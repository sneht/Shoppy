import React from "react";
import "./Cart.css";
import { URL } from "../../utils/helper";

const Cartproduct = (props) => {
  return (

    <label className=
      "checkbox-wrapper cartrow" >
      <input
        type="checkbox"
        className="checkbox-input"
        value={props.card.productId._id}
        checked={props.checkedList.includes(props.card.productId._id)}
        onChange={(e) => props.handlecheckbox(e)}
      />
      <span className=
        {props.checkedList.includes(props.card.productId._id) ? "checkbox-tile-bg" : "checkbox-tile "}>
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
                <h6>Product Quantity : {props.card.quantity}</h6>
                <p>Specification: {props.card.productId.specification}</p>
              </div>
              <div className="col-md-3 mt-3">
                <h5 className="text">
                  &#x20b9; {props.card.productId.discountPrice * props.card.quantity}
                  /-
                </h5>
                <h6>
                  &#x20b9;
                  <del>
                    {
                      props.card.productId.price}
                    /-
                  </del>
                </h6>
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
