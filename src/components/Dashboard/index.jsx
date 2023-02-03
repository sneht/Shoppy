import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Dashboard.css";
import { Autoplay, Pagination, Navigation } from "swiper";
import { listBody } from "../../utils/helper";
import { headerimgHandle } from "../../service/auth.service";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";

export default function Dashboard(props) {
  const [imgdata, setimgData] = useState([]);

  useEffect(() => {
    getImgData();
  }, []);
  const getImgData = async () => {
    const response = await headerimgHandle(
      listBody({ where: { isActive: true }, perPage: 1000 })
    );
    setimgData(response);
    if (response) {
      props.setTopLoading(false);
    }
  };

  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {imgdata.length > 0 &&
          imgdata.map((data, index) => (
            <SwiperSlide key={`products_${index}}`}>
              <Link
                to={
                  data.categoryId?._id
                    ? `/products?cid=${data.categoryId._id}`
                    : "/products"
                }
              >
                <img className="banner" alt="bg" src={data.Img} />
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
      {imgdata.length === 0 && (
        <Skeleton
          variant="rectangular"
          width={2000}
          height={500}
          animation="wave"
        />
      )}
    </div>
  );
}
