import React from "react";
import { Link } from "react-router-dom";
import "../Footer/footer.css";
export default function Footer() {
  let date = new Date().getFullYear();

  return (
    <div className="footer">
      <footer
        className="text-center text-lg-start text-white"
        style={{ backgroundColor: "#25316d" }}
      >
        <section
          className="d-flex justify-content-between p-4"
          // style={{ backgroundColor: "#6351ce" }}
        >
          {/* <div>
            <Link to="" className="text-white me-4">
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link to="" className="text-white me-4">
              <i className="fab fa-twitter"></i>
            </Link>
            <Link to="" className="text-white me-4">
              <i className="fab fa-google"></i>
            </Link>
            <Link to="" className="text-white me-4">
              <i className="fab fa-instagram"></i>
            </Link>
            <Link to="" className="text-white me-4">
              <i className="fab fa-linkedin"></i>
            </Link>
            <Link to="" className="text-white me-4">
              <i className="fab fa-github"></i>
            </Link>
          </div> */}
        </section>
        <section className="" style={{marginTop:"-4%"}}>
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3  mb-4">
                {/* <h6 className="text-uppercase fw-bold">Company name</h6> */}
                {/* <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: "133px",
                    backgroundColor: "#7c4dff",
                    height: "2px",
                  }}
                /> */}
                <img
                  src="./images/logo.png"
                  style={{
                    width: "150px",
                    marginLeft: "-50px",
                    marginTop: "-10px",
                  }}
                  alt=""
                />
                <p style={{ marginLeft: "-50px", marginTop: "10px" }}>
                  We offer high-quality foods and the best delivery service, and
                  the food market you can blindly trust
                </p>
              </div>
              {/* <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Products</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: "60px",
                    backgroundColor: "#7c4dff",
                    height: "2px",
                  }}
                />
                <p>
                  <a href="#!" className="text-white">
                    MDBootstrap
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-white">
                    MDWordPress
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-white">
                    BrandFlow
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-white">
                    Bootstrap Angular
                  </a>
                </p>
              </div> */}
              {/* <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Useful links</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: "60px",
                    backgroundColor: "#7c4dff",
                    height: "2px",
                  }}
                />
                <p>
                  <a href="#!" className="text-white">
                    Your Account
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-white">
                    Become an Affiliate
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-white">
                    Shipping Rates
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-white">
                    Help
                  </a>
                </p>
              </div> */}
              <div
                className="col-md-4 col-lg-3 col-xl-3"
                style={{ marginLeft: "100px" }}
              >
                <h6 className="text-uppercase fw-bold">Pages</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: "50px",
                    backgroundColor: "#7c4dff",
                    height: "2px",
                  }}
                />
                <p>
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </p>
                <p>
                  <Link
                    className="nav-link"
                    to="/products"
                    state={{ data: "seeall" }}
                  >
                    Products
                  </Link>
                </p>
                <p>
                  <Link className="nav-link" to="/order">
                    Orders
                  </Link>
                </p>
                <p>
                  <Link className="nav-link" to="/wishlist">
                    Wishlist
                  </Link>
                </p>
              </div>
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold">Subscribe Now</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: "125px",
                    backgroundColor: "#7c4dff",
                    height: "2px",
                  }}
                />
                <p>
                  Subscribe your email for newsletter and featured news based on
                  your interest
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
          {`© Copyright ${date}  Shoppy, Inc. All rights reserved`}
        </div>
      </footer>
    </div>
  );
}
