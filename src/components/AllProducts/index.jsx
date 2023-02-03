import React, { useEffect, useState } from "react";
import "../AllProducts/Allproducts.css";
// import { PopularData } from "../../Data/PopularData";
import CartModal from "../cartModalview";
// import { EventEmitter } from "../../utils/helper";
import AllCategories from "../AllCategories";
import { listBody } from "../../utils/helper";
import {
  productHndlerData,
  addcartHndlerData,
  orderListDataHandler,
  wishlistDataHandler,
  wishlistDataListHandler,
} from "../../service/auth.service";
import { URL } from "../../utils/helper";
import { Link, useLocation } from "react-router-dom";
import AllproductSkeleton from "./AllproductSkeleton";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { fetchCartList } from "../../js/actions";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const Allproducts = (props) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [childata, setChildata] = useState([]);
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishloading, setWishLoading] = useState(null);
  const [dataNotFound, setDataNotFound] = useState(false);
  const location = useLocation();
  const { search } = location;
  const [userData, setuserData] = useState([]);
  const [index, setIndex] = useState();
  const navigate = useNavigate();
  const successnotify = (msg) =>
    toast.success(msg, { duration: 3000, id: msg });
  useEffect(() => {
    setuserData(JSON.parse(localStorage.getItem("userData")) || []);
    let categoryId;
    let filter;
    let from;
    let to;
    if (search.includes("cid")) {
      categoryId = search.split("=")[1];
      setIndex(categoryId);
    } else if (search.includes("filter")) {
      if (search.includes("From")) {
        from = search.split("From")[1]?.split("To")[0];
        to = search.split("From")[1]?.split("To")[1];
        filter = "From";
      } else {
        filter = search.split("=")[1];
      }

      setIndex(filter);
    } else {
      setIndex("ALL");
    }

    getproductData(filter, categoryId, from, to);
  }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

  const onChnageIndex = (i) => {
    setProductData([]);
    setIndex(i);
    switch (i) {
      case "ALL":
        navigate(`/products`);
        break;
      case "Popularity":
        navigate(`/products?filter=Popularity`);
        getproductData("Popularity");
        break;
      case "NewestFirst":
        navigate(`/products?filter=NewestFirst`);
        getproductData("NewestFirst");
        break;
      case "LowToHigh":
        navigate(`/products?filter=LowToHigh`);
        getproductData("LowToHigh");
        break;
      case "HighToLow":
        navigate(`/products?filter=HighToLow`);
        getproductData("HighToLow");
        break;
      default:
        navigate(`/products`);
    }
  };
  const getproductData = async (filter, log = "", from, to) => {
    setProductData([]);
    setLoading(true);
    let body;
    if (filter) {
      body = listBody({
        where: {
          isActive: true,
        },
        perPage: 1000,
      });
    } else if (!log) {
      body = listBody({
        where: {
          isActive: true,
        },
        perPage: 1000,
      });
    } else {
      body = listBody({
        where: {
          isActive: true,
          categoryId: log,
        },
        perPage: 1000,
      });
    }
    const response = await productHndlerData(body);
    if (response.length > 0) {
      setDataNotFound(false);
      switch (filter) {
        case "LowToHigh":
          setProductData([]);
          setLoading(true);
          wishlist(
            response
              .map((obj) => ({ ...obj, isShow: false }))
              ?.sort(function (a, b) {
                return (
                  parseFloat(a.discountPrice) - parseFloat(b.discountPrice)
                );
              })
          );

          break;
        case "HighToLow":
          setProductData([]);
          setLoading(true);
          wishlist(
            response
              .map((obj) => ({ ...obj, isShow: false }))
              .sort(function (a, b) {
                return (
                  parseFloat(b.discountPrice) - parseFloat(a.discountPrice)
                );
              })
          );
          break;
        case "NewestFirst":
          setProductData([]);
          setLoading(true);
          wishlist(response.map((obj) => ({ ...obj, isShow: false })));
          break;
        case "Popularity":
          setLoading(true);
          const responses = await orderListDataHandler(
            listBody({
              where: {
                isActive: true,
              },
            })
          );
          if (responses) {
            const updatedList = []; // eslint-disable-next-line
            responses.filter((res) => {
              // eslint-disable-next-line
              res.cartdetail.filter((res1) => {
                updatedList.push({
                  id: res1?.productId?._id,
                  qua: res1?.quantity,
                });
              });
            });
            var filterMap = {};
            updatedList.forEach(function (item) {
              if (!filterMap[item.id] || filterMap[item.id].qua < item.qua) {
                filterMap[item.id] = item;
              }
            });
            var result = [];
            for (var id in filterMap) {
              result.push(filterMap[id]);
            }
            result.sort(function (a, b) {
              return b.qua - a.qua;
            });
            var output = [];
            result.forEach((item) => {
              const match = response.find((item2) => item.id === item2._id);
              if (match) {
                output.push({ ...item, ...match });
              }
            });
            setLoading(false);
            setProductData([]);
            setLoading(true);
            wishlist(output);
          } else {
            setProductData([]);
            setLoading(true);
            wishlist([]);
          }

          break;
        case "InStock":
          var newArray = response
            .map((obj) => ({ ...obj, isShow: false }))
            .filter(function (obj) {
              return obj.quantity > 0;
            });
          setProductData([]);
          setLoading(true);
          wishlist(newArray);
          break;
        case "From":
          let newData = response
            .map((obj) => ({ ...obj, isShow: false }))
            .filter(function (obj) {
              return obj.discountPrice >= from && obj.discountPrice <= to;
            }); // eslint-disable-next-line
          var result = [];
          for (var discountPrice in newData) {
            result.push(newData[discountPrice]);
          }
          result.sort(function (a, b) {
            return a.discountPrice - b.discountPrice;
          });

          if (result.length > 0) {
            setProductData([]);
            setLoading(true);
            wishlist(result);
          } else {
            setDataNotFound(true);
          }

          break;
        default:
          setProductData([]);
          setLoading(true);
          wishlist(response.map((obj) => ({ ...obj, isShow: false })));
      }
    } else {
      setDataNotFound(true);
    }
  };

  const parentFunc = (card) => {
    setChildata(card);
    setShow(true);
  };
  const closeHandle = () => {
    setShow(false);
    setChildata([]);
  };
  const cartFunc = async (cartdata) => {
    setChildata([]);

    const body = {
      userId: cartdata.userId,
      productId: cartdata.productId,
      quantity: cartdata.quantity,
    };
    const response = await addcartHndlerData(body); // eslint-disable-next-line
    dispatch(fetchCartList(listBody({ where: { userId: cartdata.userId } })));
    if (response) {
      successnotify("Product added to cart successfully!");
    }
  };

  const wishlist = async (resData, id) => {
    setWishLoading(id);
    let data = JSON.parse(localStorage.getItem("userData") || "[]");
    if (id) {
      const res = await wishlistDataHandler({
        userId: data?.id,
        productId: id,
      });

      if (res) {
        successnotify(res.message);

        const res2 = await wishlistDataListHandler(
          listBody({ where: { userId: data?.id } })
        );
        console.log(res2);
        setProductData(
          productData.map((obj) =>
            res2[0].wishlist.some((w) => w.productId._id === obj._id)
              ? { ...obj, isShow: true }
              : { ...obj, isShow: false }
          )
        );
        props.setTopLoading(false);

        setLoading(false);
        setWishLoading(null);
      }
    } else {
      const res = await wishlistDataListHandler(
        listBody({ where: { userId: data?.id } })
      );
      if (res.success) {
      }
      setProductData(
        resData.map((obj) =>
          res[0].wishlist.some((w) => w.productId._id === obj._id)
            ? { ...obj, isShow: true }
            : { ...obj, isShow: false }
        )
      );
      setLoading(false);
      setWishLoading(null);
      props.setTopLoading(false);
    }
  };

  return (
    <>
      <div className="row no-gutters datas_container text">
        <div className="col-3 filter_div">
          <div className="row text">
            <div className="col-12 productBrud">
              <div className="page-title-box">
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link className="breadcrumb-item active text" to="/">
                        Home
                      </Link>
                    </li>
                    <li className="breadcrumb-item active">Products</li>
                  </ol>
                </div>
                <h4 className="page-title text">Products</h4>
              </div>
            </div>
          </div>
          <AllCategories id={getproductData} />
        </div>
        <div className="col-9 data_div">
          <div className="data_container">
            <div className="sortby">
              Sort By :
              <span
                className={index === "ALL" ? "sortbyspan" : "sortbynone"}
                onClick={() => onChnageIndex("ALL")}
              >
                All Products
              </span>
              <span
                className={index === "Popularity" ? "sortbyspan" : "sortbynone"}
                onClick={() => onChnageIndex("Popularity")}
              >
                Popularity
              </span>
              <span
                className={
                  index === "NewestFirst" ? "sortbyspan" : "sortbynone"
                }
                onClick={() => onChnageIndex("NewestFirst")}
              >
                Newest First
              </span>
              <span
                className={index === "LowToHigh" ? "sortbyspan" : "sortbynone"}
                onClick={() => onChnageIndex("LowToHigh")}
              >
                Price - Low to High
              </span>
              <span
                className={index === "HighToLow" ? "sortbyspan" : "sortbynone"}
                onClick={() => onChnageIndex("HighToLow")}
              >
                Price - High to Low
              </span>
              <span className="productLength">
                Showing {productData.length} results
              </span>
            </div>
            {productData.length > 0 &&
              productData.map((card) => {
                return (
                  <div className="cardView">
                    <div className="topBarCard">
                      {card.quantity > 10 ? (
                        <span class=" text instock">In Stock</span>
                      ) : (
                        <></>
                      )}
                      {card.quantity < 11 && card.quantity > 0 ? (
                        <span class=" text lowstock">Selling fast!</span>
                      ) : (
                        <></>
                      )}
                      {card.quantity === 0 ? (
                        <span class=" text outofstock">Out of Stock</span>
                      ) : (
                        <></>
                      )}

                      {card.isShow ? (
                        <div
                          className="saveIcon"
                          onClick={() => wishlist(null, card._id)}
                        >
                          {card._id === wishloading ? (
                            <div class="spinner-border spinner-border-sm" />
                          ) : (
                            <span>&#9829;</span>
                          )}
                        </div>
                      ) : (
                        <div
                          className="saveIcon"
                          onClick={() => wishlist(null, card._id)}
                        >
                          {card._id === wishloading ? (
                            <div class="spinner-border spinner-border-sm " />
                          ) : (
                            <span>&#9825;</span>
                          )}
                        </div>
                      )}
                    </div>
                    <img
                      src={URL + card.img}
                      className="card-img-top"
                      alt={card.name}
                    />

                    <div className="div1">
                      <p className="font_cardView text">
                        <b className="text">{card.name}</b>
                        <br />
                        &#x20b9;{card.discountPrice}
                      </p>
                    </div>
                    <div className="third_container">
                      <div className="fourth_container">
                        &#x20b9;
                        <del>{card.price}</del>
                      </div>
                      <div className="fifth_conatiner">
                        {card.quantity === 0 ? (
                          <div className="fourth_container">Out Of Stock</div>
                        ) : (
                          <button
                            className="BuyButton"
                            onClick={(e) => parentFunc(card)}
                          >
                            Buy Now
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

            {dataNotFound && (
              <div className="col-md-12 main pt-5">
                <img
                  src="/images/noproduct.png"
                  className=" mx-auto d-block"
                  alt="..."
                />
                <p className="header_one">No Products Found!</p>
                {/* <p className="header_two">Please add product to your cart list</p> */}
              </div>
            )}
            {!dataNotFound && loading && (
              <>
                <Box>
                  <AllproductSkeleton />
                  <AllproductSkeleton />
                  <AllproductSkeleton />
                  <AllproductSkeleton />
                  <AllproductSkeleton />
                  <AllproductSkeleton />
                  <AllproductSkeleton />
                  <AllproductSkeleton />
                </Box>
              </>
            )}

            {show && (
              <CartModal
                childata={childata}
                cartFunc={cartFunc}
                closeHandle={closeHandle}
                userData={userData}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Allproducts;
