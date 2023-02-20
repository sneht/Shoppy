/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "../ProductList/ProductList.css";
import Products from "../Products";
import CartModal from "../cartModalview";
import SeeMore from "../SeemoreCard";
// import { EventEmitter } from "../../utils/helper";
import { listBody } from "../../utils/helper";
import {
  productHndlerData,
  addcartHndlerData,
} from "../../service/auth.service";
import Cardskeleton from "../Products/Cardskeleton";
import Box from "@mui/material/Box";
//
// import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { fetchCartList } from "../../js/actions";
import toast from "react-hot-toast";
const html = document.getElementById("mainHtml");

const ProductList = (props) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [childata, setChildata] = useState([]);
  const [userData, setuserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const userDetails = JSON.parse(localStorage.getItem("Data"));

  const successnotify = (msg) => {
    userDetails
      ? toast.success(msg, { duration: 4000, id: msg })
      : toast.error(msg, { duration: 4000, id: msg });
  };

  const parentFunc = () => {
    setShow(true);
    html.classList.add("html");
  };

  const closeHandle = () => {
    setShow(false);
    html.classList.remove("html");
    setChildata([]);
  };
  const takeData = (info) => {
    setChildata(info);
  };
  const cartFunc = async (cartdata) => {
    setChildata([]);

    const body = {
      userId: cartdata.userId,
      productId: cartdata.productId,
      quantity: cartdata.quantity,
    };
    // localStorage.setItem("Data", JSON.stringify(cartdata));
    // eslint-disable-next-line
    const response = await addcartHndlerData(body);
    dispatch(fetchCartList(listBody({ where: { userId: cartdata.userId } })));
    // EventEmitter.dispatch("DATA", body.quantity.length);
    if (response) {
      if (userDetails) {
        successnotify("Product added to cart successfully!");
      } else {
        successnotify("Please Log in");
      }
    }
  };

  const [productData, setproductData] = useState([]);
  // console.log("productData: ", productData);
  useEffect(() => {
    getProductData();
    setuserData(JSON.parse(localStorage.getItem("Data")) || []);
  }, []);

  const getProductData = async () => {
    try {
      const response = await productHndlerData(
        listBody({ where: { isActive: true } })
      );
      if (response) {
        setproductData(response);
        setLoading(false);
        props.setTopLoading(false);
      }
    } catch {
      console.error("Somthing went wrong");
    }
  };

  return (
    <>
      <div>
        <div>
          <h1 className="header_one">The One-stop Shopping Destination</h1>
          <p className="header_two">
            E-commerce is revolutionizing the way we all shop in India.
          </p>
            <div className="MainHomeCard">
              {productData.length > 0 &&
                productData.slice(0, 5).map((card, index) => {
                  return (
                    <Products
                      index={index}
                      parentFunc={parentFunc}
                      takeData={takeData}
                      card={card}
                      key={card.id}
                    />
                  );
                })}
                <SeeMore />
            </div>
          {loading && (
            <Box>
              <Cardskeleton />
              <Cardskeleton />
              <Cardskeleton />
              <Cardskeleton />
              <Cardskeleton />
              <Cardskeleton />
              <Cardskeleton />
            </Box>
          )}
        </div>
        {show && (
          <CartModal
            childata={childata}
            cartFunc={cartFunc}
            closeHandle={closeHandle}
            userData={userData}
          />
        )}
      </div>
      <br />
    </>
  );
};

export default ProductList;
