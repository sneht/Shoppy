import "../cartModalview/cartModalview.css";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { URL } from "../../utils/helper";
const CartModal = (props) => {
  const data = props.childata;
  const userData = props.userData;
  const quantity = props.childata.quantity;
  const [num, setNum] = useState(1);
  const [quantityCheck, setQuantityCheck] = useState(false);

  const goBack = () => {
    props.closeHandle();
  };
  useEffect(() => {
    setQuantityCheck(false);
  }, [num]);

  const addFunc = () => {
    localStorage.setItem("CartNum", num);
    if (quantity >= num) {
      setQuantityCheck(false);
      const body = {
        userId: userData.id,
        productId: data._id,
        quantity: num,
      };
      props.cartFunc(body);
      props.closeHandle();
    } else {
      setQuantityCheck(true);
    }
  };
  const incNum = (e) => {
    e.preventDefault();
    setNum(Number(num) + 1);
  };
  const decNum = (e) => {
    e.preventDefault();
    if (num > 1) {
      setNum(num - 1);
    }
  };

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      show={true}
      centered
    >
      <Modal.Header className="headerModal text">
        <Modal.Title>Product Details</Modal.Title>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          class="bi bi-x-circle-fill"
          viewBox="0 0 16 16"
          onClick={goBack}
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
        </svg>
      </Modal.Header>
      <Modal.Body>
        <div className=" text row">
          <div className=" col">
            <img src={URL + data.img} className="card-img-top" alt="..." />
          </div>
          <div className=" col">
            <div className="nameModal">
              <b>{data.name}</b>
            </div>
            <div className="priceModal">&#x20b9;{data.discountPrice * num}</div>
            <div className="descriptionModal">
              M.R.P.:&#x20b9;
              <del>{data.price * num}</del>
            </div>
            <div className="descriptionModal">
              <b>Specification : </b>
              {data.specification}
            </div>

            <div className="counterModal d-flex justify-content-center">
              <button className="counterbuttonModal" onClick={(e) => decNum(e)}>
                -
              </button>
              <b className="counterNum">{num}</b>

              <button className="counterbuttonModal" onClick={(e) => incNum(e)}>
                +
              </button>
            </div>
            <div className="addcartToModal d-flex justify-content-center">
              <button className="button" onClick={addFunc}>
                Add to Cart
              </button>
            </div>
            {quantityCheck ? (
              <p className="errorstyle">{num} Quantity not available! </p>
            ) : (
              <></>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CartModal;
