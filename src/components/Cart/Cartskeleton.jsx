import Skeleton from "@mui/material/Skeleton";
import "./Cartskeleton.css";
const Cartskeleton = (props) => {
  return (
    <>
      <div className="containerBig">
        <div className="mb-5 row">
          <div className="pe-xl-3 col-lg-8 card">
            <div className="cart mb-3">
              <div className="cart-body" />
              <div className="main-content">
                {/* <h4 className="main-heading main">Shopping Cart</h4> */}
                <Skeleton
                  variant="rectangular"
                  width={190}
                  height={33}
                  animation="wave"
                />
                <div className="text">
                  {/* <p>You have {cart.length} items in your cart.</p>{" "} */}
                  <Skeleton
                    variant="rectangular"
                    width={240}
                    height={20}
                    className="s1"
                    animation="wave"
                  />
                </div>
                <div>
                  {/* <button className="dbutton" type="button">
                    Remove All Products
                  </button> */}
                  <Skeleton
                    variant="rectangular"
                    width={160}
                    height={35}
                    className="s1"
                    animation="wave"
                  />
                </div>
              </div>
              <div>
                <div className="d-flex justify-content-center row">
                  <Skeleton
                    variant="rectangular"
                    width={609}
                    height={133}
                    className="s2"
                    animation="wave"
                  />
                  <Skeleton
                    variant="rectangular"
                    width={609}
                    height={133}
                    className="s2"
                    animation="wave"
                  />
                  <Skeleton
                    variant="rectangular"
                    width={609}
                    height={133}
                    className="s2"
                    animation="wave"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 main">
            <div className="mb-5 card">
              <div className="card-header">
                {/* <h6 className="mb-0">Order Summary</h6> */}
                <Skeleton
                  variant="rectangular"
                  width={128}
                  height={20}
                  className="s3"
                  animation="wave"
                />
              </div>
              <div className="py-4 card-body">
                {/* <p className="text-muted text-sm">
                  Shipping and additional costs are calculated based on values
                  you have entered.
                </p> */}
                <Skeleton
                  variant="rectangular"
                  width={190}
                  height={20}
                  className="s1"
                  animation="wave"
                />
                <Skeleton
                  variant="rectangular"
                  width={260}
                  height={20}
                  className="s1"
                  animation="wave"
                />
                <Skeleton
                  variant="rectangular"
                  width={140}
                  height={20}
                  className="s1"
                  animation="wave"
                />

                <Skeleton
                  variant="rectangular"
                  width={305}
                  height={50}
                  className="stable"
                  animation="wave"
                />
                <Skeleton
                  variant="rectangular"
                  width={305}
                  height={50}
                  className="stabledata"
                  animation="wave"
                />
                <Skeleton
                  variant="rectangular"
                  width={305}
                  height={50}
                  className="stabledata"
                  animation="wave"
                />
                <Skeleton
                  variant="rectangular"
                  width={305}
                  height={50}
                  className="stabledata"
                  animation="wave"
                />

                <Skeleton
                  variant="rectangular"
                  width={190}
                  height={20}
                  className="s1"
                  animation="wave"
                />
                <Skeleton
                  variant="rectangular"
                  width={260}
                  height={20}
                  className="s1"
                  animation="wave"
                />
                <Skeleton
                  variant="rectangular"
                  width={140}
                  height={20}
                  className="s1"
                  animation="wave"
                />

                {/* <p className="text-muted text-sm">
                  Final price and discounts will be determined at the time of
                  payment process
                  ing.
                </p> */}
                <Skeleton
                  variant="rectangular"
                  width={305}
                  height={35}
                  className="s2"
                  animation="wave"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cartskeleton;
