import React, { useState } from "react";
import "./Cart.css";
import { formateNum, URL } from "../../utils/helper";
import { addcartHndlerData } from "../../service/auth.service";

const Cartproduct = (props) => {
  // const [num, setNum] = useState(props.card.quantity);
  const [loading, setLoading] = useState(false);
  const userDetails = JSON.parse(localStorage.getItem("Data"));
  // useEffect(() => {
  //   setNum(props.card.quantity);
  // }, [props.card.quantity]);

  const incNum = (e) => {
    e.preventDefault();
    // setNum(num + 1);
    updatedCard("inc");
  };

  const decNum = (e, id) => {
    e.preventDefault();
    if (props.card.quantity > 1) {
      updatedCard("dec");
      // setNum(num - 1);
    }
    if (props.card.quantity === 1) {
      props.alldelete(id);
    }
  };

  const updatedCard = async (type) => {
    setLoading(true);
    const body = {
      productId: props.card.productId._id,
      quantity: type === "inc" ? props.card.quantity + 1 : props.card.quantity - 1,
      userId: userDetails.id,
    };
    const response = await addcartHndlerData(body);
    if (response) {
      setLoading(false);
      if (response.success) {
        props.getcartproductData();
      }
    }
  };

  return (
    <>
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
                <div className="col-md-4" style={{ marginLeft: "-3px" }}>
                  <img
                    className="img-fluid img-responsive rounded product-image"
                    src={URL + props.card.productId.img}
                    alt="cardimg"
                  />
                </div>
                <div className="col-md-5 mt-3">
                  <h5>Product Name: {props.card.productId.name}</h5>
                  <h6 style={{ display: "flex", marginTop: "33px" }}>
                    Product Quantity :
                    <div className="counter justify-content-center">
                      {loading ? (
                        <div
                          className="spinner-border"
                          role="status"
                          style={{ height: "20px", width: "20px" }}
                        ></div>
                      ) : (
                        <>
                          <button
                            className="counterbutton"
                            onClick={(e) => decNum(e, props.card.productId._id)}
                          >
                            -
                          </button>
                          {props.card.quantity}
                          <button
                            className="counterbutton"
                            onClick={(e) => incNum(e)}
                          >
                            +
                          </button>
                        </>
                      )}
                    </div>
                  </h6>
                  <p style={{ marginTop: "33px" }}>
                    Specification: {props.card.productId.specification}
                  </p>
                </div>
                <div
                  className="col-md-3 mt-3"
                  style={{ marginLeft: "49px", width: "18%" }}
                >
                  <h5 className="text">
                    &#x20b9;{" "}
                    {formateNum(props.card.productId.discountPrice * props.card.quantity)}
                    /-
                  </h5>
                  <h6>
                    &#x20b9;
                    <del>
                      {formateNum(props.card.productId.price * props.card.quantity)}
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
              </div>
            </div>
          </span>
        </span>
      </label>
    </>
  );
};
export default Cartproduct;
