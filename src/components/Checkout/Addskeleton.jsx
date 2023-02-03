import Skeleton from "@mui/material/Skeleton";
import "./Addskeleton.css";
const Addskeleton = (props) => {
  return (
    <>
      <label className="col-md-6 mb-3">
        <div className="mainskeleton">
          <Skeleton
            variant="rectangular"
            width={70}
            height={25}
            className="s1"
            animation="wave"
          />
           <Skeleton
            variant="rectangular"
            width={375}
            height={20}
            className="s1"
            animation="wave"
          />
          <Skeleton
            variant="rectangular"
            width={250}
            height={20}
            className="s1"
            animation="wave"
          />
        </div>
      </label>
    </>
  );
};

export default Addskeleton;
