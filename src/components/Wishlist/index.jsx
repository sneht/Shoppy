import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  wishlistDataHandler,
  wishlistDataListHandler,
} from "../../service/auth.service";
import { listBody, URL } from "../../utils/helper";
import "../Wishlist/wishlist.css";
export default function Wishlist() {
  const [wishlistData, setWishlistData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(null);
  const successnotify = (msg) => toast.success(msg, { duration: 4000, id: msg });

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let data = JSON.parse(localStorage.getItem("userData") || "[]");
    const res = await wishlistDataListHandler(
      listBody({ where: { userId: data?.id } })
    );
    if (res) {
      setWishlistData(res[0]?.wishlist);
      setLoading(false);
    } else setWishlistData([]);
    setLoading(false);
  };
  const wishlist = async (id) => {
    setButtonLoading(id);
    let data = JSON.parse(localStorage.getItem("userData") || "[]");
    const res = await wishlistDataHandler({
      userId: data?.id,
      productId: id,
    });
    if (res.success) {
      getData();
      successnotify(res.message);
    }
  };
  return (
    <div className="wishCard">
      <div className="row text">
        <div className="col-12 ">
          <div className="page-title-box">
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <Link className="breadcrumb-item active text" to="/">
                    Home
                  </Link>
                </li>
                <li className="breadcrumb-item active">Wishlist</li>
              </ol>
            </div>
            <h4 className="page-title text">Your Wishlist</h4>
            <h6 className="page-title text">
              Total Wishlist {wishlistData.length}
            </h6>
          </div>
        </div>
      </div>

      <div class="row cardSec">
        {loading ? (
          <div class="d-flex justify-content-center mainLoading ">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {wishlistData?.length > 0 ? (
              wishlistData?.map((data) => {
                return (
                  <div class=" maincard col-3 row ">
                    <img
                      src={URL + data.productId.img}
                      alt={data.productId.name}
                      className="WishListimg col-4"
                    />
                    <div className="text col-4">
                      {data?.productId.name} <br />
                      Rs: {data?.productId.discountPrice}
                    </div>

                    {buttonLoading === data?.productId._id ? (
                      <button class="remove text " type="button" disabled>
                        <span
                          class="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      </button>
                    ) : (
                      <button
                        type="button "
                        className=" remove text"
                        onClick={() => wishlist(data?.productId._id)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="noWishList">
                <img
                  src="https://easeupgrade.com/asset/no_data_found.png"
                  alt="NoWishList"
                  className="NOWishListimg"
                ></img>
                <div className="noWishList text">No Wishlist Found!</div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
