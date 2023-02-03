import React from "react";
import "./Ordercardskel.css";
import Skeleton from "@mui/material/Skeleton";
const Ordercard = () => {
  return (
    <div className="ordercard-main">
      <div className="row ordercard">
        <div className="col-sm-3">
          <Skeleton
            variant="rectangular"
            width={200}
            height={27}
            className="subHskeleton"
            animation="wave"
          />
          <Skeleton
            variant="rectangular"
            width={150}
            height={27}
            className="subHskeleton"
            animation="wave"
          />
        </div>
       
        <div className="col-sm-4">
          <Skeleton
            variant="rectangular"
            width={200}
            height={27}
            className="subHskeleton"
            animation="wave"
          />
          <Skeleton
            variant="rectangular"
            width={150}
            height={27}
            className="subHskeleton"
            animation="wave"
          />
        </div>
        <div className="col-sm-3">
          <Skeleton
            variant="rectangular"
            width={200}
            height={27}
            className="subHskeleton"
            animation="wave"
          />
          <Skeleton
            variant="rectangular"
            width={150}
            height={27}
            className="subHskeleton"
            animation="wave"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-7">
          <div className="row">
            <div className="ordercard-h1">
              <Skeleton
                variant="rectangular"
                width={400}
                height={20}
                className="subHskeleton"
                animation="wave"
              />
              
              <Skeleton
                variant="rectangular"
                width={200}
                height={20}
                className="subHskeleton"
                animation="wave"
              />
            </div>
            <div className="col-5">
              <Skeleton
                variant="rectangular"
                width={200}
                height={200}
                className="subHskeleton"
                animation="wave"
              />
            </div>
            <div className="col-7 card-content">
              <h5 className="text ">
                <Skeleton
                  variant="rectangular"
                  width={200}
                  height={20}
                  className="subHskeleton"
                  animation="wave"
                />
              </h5>
              <p className="textcard">
                <Skeleton
                  variant="rectangular"
                  width={100}
                  height={20}
                  className="subHskeleton"
                  animation="wave"
                />
              </p>
              <p className="textcard">
                <Skeleton
                  variant="rectangular"
                  width={200}
                  height={20}
                  className="subHskeleton"
                  animation="wave"
                />
              </p>
            </div>
          </div>
        </div>

        <div className="col-5 card-button">
          <Skeleton
            variant="rectangular"
            width={350}
            height={150}
            className=""
            animation="wave"
          />
        </div>
      </div>
    </div>
  );
};
export default Ordercard;
