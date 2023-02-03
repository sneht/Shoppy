import Skeleton from "@mui/material/Skeleton";
const AllproductSkeleton = (props) => {
  return (
    
    <div className="cardView ">
      <Skeleton
        variant="rectangular"
        width={90}
        height={21}
        animation="wave"
        className="skeLabel"
      />
      <Skeleton
        variant="rectangular"
        width={175}
        height={175}
        className="skeimg"
        animation="wave"
      />
      <p className="">
        <Skeleton
          variant="rectangular"
          width={100}
          height={28}
          className="skeHeading"
          animation="wave"
        />

        <Skeleton
          variant="rectangular"
          width={75}
          height={20}
          className="skesubHeading"
          animation="wave"
        />
      </p>
      <div className="third_container">
        <div className="fourth_container">
          <Skeleton
            variant="rectangular"
            width={55}
            height={20}
            className="skeprice"
            animation="wave"
          />
        </div>
        <div className="fifth_conatiner">
          <Skeleton
            variant="rectangular"
            width={85}
            height={35}
            className="skebutton"
            animation="wave"
          />
        </div>
      </div>
    </div>
  );
};

export default AllproductSkeleton;
