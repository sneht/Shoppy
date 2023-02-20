import "../Products/product.css";
import { formateNum, URL } from "../../utils/helper";

const Products = (props) => {
  const passtoParent = () => {
    props.parentFunc();
    props.takeData(props.card);
  };
  return (
    // <div className="cardView">
    //   <div className="header">
    //     <div className="text-label text-uppercase">
    //       {props.card.quantity > 10 ? (
    //         <span className=" text instock">In Stock</span>
    //       ) : (
    //         <></>
    //       )}
    //       {props.card.quantity < 11 && props.card.quantity > 6 ? (
    //         <span className=" text lowstock">Selling fast</span>
    //       ) : (
    //         <></>
    //       )}
    //       {props.card.quantity === 0 ? (
    //         <span className=" text outofstock">Out of Stock</span>
    //       ) : (
    //         <></>
    //       )}
    //       {props.card.quantity < 6 && props.card.quantity > 0 ? (
    //         <span className="lowstock">
    //           Hurry up only {props.card.quantity} left{" "}
    //         </span>
    //       ) : (
    //         <></>
    //       )}
    //     </div>
    //     <div className="image">
    //       <img
    //         src={URL + props.card.img}
    //         className="card-img-top"
    //         alt={props.card.name}
    //         onClick={(e) => (props.card.quantity === 0 ? "" : passtoParent(e))}
    //       />
    //     </div>
    //   </div>
    //   <div className="div1">
    //     <h4 style={{ textAlign: "center" }} className="text">
    //       {props.card.name}
    //     </h4>
    //   </div>
    //   <div className="div1">
    //     <h6 style={{ textAlign: "center" }} className="text">
    //       Specification: {props.card.specification}
    //     </h6>
    //   </div>

    //   <div className="div3">
    //     <div className="div4">
    //       <b className="text">&#x20b9;{formateNum(props.card.discountPrice)}</b>
    //       <p className="text">
    //         M.R.P.:
    //         <span>
    //           &#x20b9;<del>{formateNum(props.card.price)}</del>
    //         </span>
    //       </p>
    //     </div>
    //     <div className="div5">
    //       {props.card.quantity === 0 ? (
    //         <div className="div4">
    //           <p className="text  div4">Out Of Stock</p>
    //         </div>
    //       ) : (
    // <button className="BuyButton text" onClick={(e) => passtoParent(e)}>
    //   Buy Now
    // </button>
    //       )}
    //     </div>
    //   </div>
    // </div>
    <div className="cards">
      <div className="topBarCard">
        {props.card.quantity > 10 ? (
          <span className="instock text-uppercase">In Stock</span>
        ) : (
          <></>
        )}
        {props.card.quantity < 11 && props.card.quantity > 6 ? (
          <span className="lowstock text-uppercase">Selling fast !</span>
        ) : (
          <></>
        )}
        {props.card.quantity < 6 && props.card.quantity > 0 ? (
          <span className="lowstock text-uppercase">
            Hurry up only {props.card.quantity} left{" "}
          </span>
        ) : (
          <></>
        )}
        {props.card.quantity === 0 ? (
          <span className="outofstock text-uppercase">Out of Stock</span>
        ) : (
          <></>
        )}
      </div>
      <img
        src={URL + props.card.img}
        className="card-image"
        onClick={(e) => (props.card.quantity === 0 ? "" : passtoParent(e))}
        alt={props.card.name}
      />
      <div className="container">
        <div className="div1">
          <p className="font_cardView text">
            {props.card.name}
            <br />
          </p>
        </div>
        <p>Specification : {props.card.specification}</p>
        <div className="fourth_container d-flex">
          &#x20b9;<del>{formateNum(props.card.price)}</del>
          {/* <br /> */}
          &#x20b9; {formateNum(props.card.discountPrice)}
        </div>
      </div>
      <div className="third_container">
        <div className="fifth_conatiner">
          {props.card.quantity === 0 ? (
            <button className="outofstockhomeButton" disabled>
              Out Of Stock
            </button>
          ) : (
            <button className="BuyNowButton" onClick={(e) => passtoParent(e)}>
              Buy Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
