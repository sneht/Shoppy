import "../Products/Cardskeleton.css";
import Skeleton from "@mui/material/Skeleton";
const Cardskeleton = (props) => {
  return (
    <div className="cardView">
      {/* <img
        src={URL + props.card.img}
        className="card-img-top"
        alt={props.card.name}
      /> */}
      <Skeleton
        variant="rectangular"
        width={235}
        height={232}
        className="imgskeleton"
        animation="wave"
      />
      <div className="div1">
        {/* <h4 style={{ textAlign: "center" }} className="text">
          {props.card.name}
        </h4> */}
        <Skeleton
          variant="rectangular"
          width={130}
          height={30}
          className="Hskeleton"
          animation="wave"
        />
      </div>
      <div className="div1">
        {/* <h6 style={{ textAlign: "center" }} className="text">
          Specification: {props.card.specification}
        </h6> */}
        <Skeleton
          variant="rectangular"
          width={200}
          height={20}
          className="subHskeleton"
          animation="wave"
        />
      </div>

      <div className="row skecarda">
        <div className="col skecarda">
          {/* <b className="text">&#x20b9;{props.card.price}</b>
          <p className="text">
            M.R.P.:
            <span>
              &#x20b9;<del>{props.card.discountPrice + props.card.price}</del>
            </span>
          </p> */}
          <Skeleton
            variant="rectangular"
            width={55}
            height={20}
            className="skelprice"
            animation="wave"
          />
          <Skeleton
            variant="rectangular"
            width={116}
            height={20}
            className="skelprice"
            animation="wave"
          />
        </div>
        <div className="col skecarda">
          {/* <button className="BuyButton text">Buy Now</button> */}
          <Skeleton
            variant="rectangular"
            width={88}
            height={38}
            className="skelbutton"
            animation="wave"
          />
        </div>
      </div>
    </div>
  );
};

export default Cardskeleton;
