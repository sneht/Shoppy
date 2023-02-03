import React from "react";
import { Link } from "react-router-dom";
import "../PageNotFound/pagenotfound.css";
export default function PageNotFound() {
  return (
    <section className="page_404">
      <div className="four_zero_four_bg">
        <h1 className="text-center text ">404</h1>
      </div>
      <div className="contant_box_404">
        <h3 className="h2 text">Look like you're lost</h3>
        <p className="text">the page you are looking for not avaible!</p>
        <Link className="link_404 text" to="/">
          Go to Home
        </Link>
      </div>
    </section>
  );
}
