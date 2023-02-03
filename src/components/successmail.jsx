import React from "react";
import { Link } from "react-router-dom";
import "./Verify/verify.css";

export default function Successmail() {
  // const location = useLocation();
  // const { search } = location; // eslint-disable-next-line
  // const [verifyId, setverifyId] = useState(); // eslint-disable-next-line
  // const [Data, setData] = useState();
  // useEffect(() => {
  //   let verifyId;
  //   if (search.split("=").length > 0) {
  //     verifyId = search.split("=")[1];
  //   } else {
  //     verifyId = "";
  //   }
  //   setverifyId(verifyId);
  //   getverifyData(verifyId);
  // }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

  // const getverifyData = async (verifyId) => {
  //   const response = await emailHandlerData(
  //     listBody({
  //       where: {
  //         _id: verifyId,
  //       },
  //       perPage: 1000,
  //     })
  //   );
  //   setData(response.data.list[0].firstName);
  //   console.log(response.data);
  // };
  // console.log(Data)

  return (
    <section className="mail-seccess section">
      <div className="success-inner">
        <h1 className="text">
          <i className="fa fa-envelope" />
          <span>Your Account Verification Successfully !</span>
        </h1>
        <p>Hi, Welcome to eCommerece</p>
        <Link to="/login" className="button">
          Sign in
        </Link>
      </div>
    </section>
  );
}
