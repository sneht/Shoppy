import React from "react";
import { Link } from "react-router-dom";
import "../SeemoreCard/SeemoreCard.css";

const SeeMore = () => {
  return (
    <div className="see_more_card">
      <div className="display_container">
        <Link to="/products">
          <button className="button text">More Products..</button>
        </Link>
      </div>
    </div>
  );
};

export default SeeMore;
