import React, { useEffect, useState } from "react";
import "../AllCategories/AllCategories.css";
import { listBody, URL } from "../../utils/helper";
import { categoryHndlerData } from "../../service/auth.service";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router";

const AllCategories = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [checkbox, setCheckbox] = useState([
    {
      id: "11",
      value: "1,000",
      checked: false,
    },
    {
      id: "12",
      value: "10,000",
      checked: false,
    },
    {
      id: "13",
      value: "50,000",
      checked: false,
    },
    {
      id: "14",
      value: "1,00,000",
      checked: false,
    },
  ]);
  const [categoriesData, setcategoriesData] = useState([]);
  const [uid, setuid] = useState(undefined);
  const [inStock, setInStock] = useState(false);
  const { search } = location;
  useEffect(() => {
    getcategoryData();
  }, []);
  useEffect(() => {
    let userId;
    if (search.split("=").length > 0) {
      userId = search.split("=")[1];
      setuid(userId);
    } else {
      setuid(null);
    }
    checkSearch(); // eslint-disable-next-line
  }, [search]);

  const checkSearch = () => {
    try {
      if (search.split("filter=")[1]?.includes("From")) {
        setInStock(false);
        const From = search.split("From")[1].split("To")[0];

        const To = search.split("From")[1].split("To")[1];

        const Together = `${From}${To}`;

        switch (Together) {
          case "01000":
            const C1 = checkbox.map((c) =>
              c.id === "11" ? { ...c, checked: true } : { ...c, checked: false }
            );
            setCheckbox(C1);
            break;
          case "010000":
            const C2 = checkbox.map((c) =>
              c.id === "12" ? { ...c, checked: true } : { ...c, checked: false }
            );
            setCheckbox(C2);
            break;
          case "050000":
            const C3 = checkbox.map((c) =>
              c.id === "13" ? { ...c, checked: true } : { ...c, checked: false }
            );
            setCheckbox(C3);
            break;
          case "0100000":
            const C4 = checkbox.map((c) =>
              c.id === "14" ? { ...c, checked: true } : { ...c, checked: false }
            );
            setCheckbox(C4);
            break;
          default:
            reset({
              from: From,
              to: To,
            });
        }
      } else if (search.split("filter=")[1]?.includes("InStock")) {
        setInStock(true);
      } else {
        setInStock(false);
        getcategoryData();
      }
    } catch (error) {
      alert(error);
    }
  };

  const getcategoryData = async () => {
    const response = await categoryHndlerData(
      listBody({ where: { isActive: true }, perPage: 1000 })
    );
    setcategoriesData(response);
  };

  const handleClick = (id) => {
    if (id) {
      navigate(`/products?cid=${id}`);
    } else {
      navigate(`/products`);
    }
  };

  const checkfunction = (e, id) => {
    try {
      const seek = checkbox.map((c) =>
        c.id === id ? { ...c, checked: e } : { ...c, checked: false }
      );
      setCheckbox(seek);
      reset({
        from: "",
        to: "",
      });

      if (e === false) {
        navigate(`/products`);
      } else {
        switch (id) {
          case "11":
            navigate(`/products?filter=From0To1000`);

            break;
          case "12":
            navigate(`/products?filter=From0To10000`);

            break;
          case "13":
            navigate(`/products?filter=From0To50000`);

            break;
          case "14":
            navigate(`/products?filter=From0To100000`);
            break;
          case "15":
            navigate(`/products?filter=InStock`);
            break;
          default:
            navigate(`/products?filter=Allproduct`);
        }
      }
    } catch (error) {
      alert(error);
    }
  };

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      from: null,
      to: null,
    },
  });

  const handleForm = (data) => {
    const seek = checkbox.map((c) =>
      c !== null ? { ...c, checked: false } : ""
    );
    setCheckbox(seek);
    navigate(`/products?filter=From${data.from}To${data.to}`);
  };

  return (
    <div className="scroll_filter">
      {categoriesData.length > 0 && (
        <>
          <div className="sidebar">
            <span>Shop by category</span>
          </div>
          <div
            className={
              uid !== undefined ? "sidenavbar" : "sidenavbar sidenavbarafter"
            }
            onClick={() => handleClick(undefined)}
          >
            <label htmlFor="touch" className="label_nav">
              <span className="categoryList">
                <img
                  className="imgcategory"
                  src="/images/allproduct.png"
                  alt="img"
                ></img>
                <div className="text textCard">All Products</div>
              </span>
            </label>
            <label htmlFor="touch" className="categoryList"></label>
          </div>
        </>
      )}
      {categoriesData.length > 0 &&
        categoriesData.map((card, index) => {
          return (
            <div
              className={
                uid === card._id ? "sidenavbar sidenavbarafter" : "sidenavbar"
              }
              id={card._id}
              key={`categories_${index}}`}
              onClick={() => handleClick(card._id)}
            >
              <label htmlFor="touch" className="label_nav">
                <span className="categoryList">
                  <img
                    className="imgcategory"
                    src={URL + card.categoryImg}
                    alt={card.categoryName}
                  ></img>
                  <div className="text textCard"> {card.categoryName}</div>
                </span>
              </label>
            </div>
          );
        })}
      <div className="sidebar">
        <span>Filters</span>
      </div>
      <div className="filterClass">
        <span className="filterSpan">
          <div className="priceHead">
            <p className="headTag">Price</p>
          </div>
          <div className="priceCheckbox">
            {checkbox.map((c) => (
              <>
                <input
                  key={c?.id}
                  name="myCheckbox"
                  class="form-check-input"
                  type="checkbox"
                  checked={c.checked}
                  onChange={(e) => checkfunction(e.target.checked, c.id)}
                />
                <label class="form-check-label">Under ₹ {c?.value}</label>
                <br />
              </>
            ))}
          </div>
          <div className="selfinput">
            <form onSubmit={handleSubmit(handleForm)}>
              <Controller
                name="from"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <input
                    className="inputselfField"
                    placeholder="From ₹ Price"
                    type={"number"}
                    name="from"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error?.message ? error.message : ""}
                  />
                )}
                control={control}
                rules={{
                  required: "Number only",
                }}
              />
              <Controller
                name="to"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <input
                    className="inputselfField"
                    placeholder="To ₹ Price"
                    type={"number"}
                    name="to"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error?.message ? error.message : ""}
                  />
                )}
                control={control}
                rules={{
                  required: "Number only",
                }}
              />

              <button type={"submit"} className="selfInputButton">
                Go
              </button>
            </form>
          </div>
        </span>
        <span className="filterSpan">
          <div className="priceHead">
            <p className="headTag">Availability</p>
          </div>
          <div className="priceCheckbox">
            <input
              name="myCheckbox"
              class="form-check-input"
              type="checkbox"
              checked={inStock}
              onChange={(e) => checkfunction(e.target.checked, "15")}
            />
            <label class="form-check-label">In Stock</label>
            <br />
          </div>
        </span>
      </div>
      {categoriesData.length === 0 && (
        <Box className="skeleton_box">
          <Skeleton
            variant="rectangular"
            className="skeleton"
            height={42}
            animation="wave"
          />
          <Skeleton
            variant="rectangular"
            className="skeleton"
            height={42}
            animation="wave"
          />
          <Skeleton
            variant="rectangular"
            className="skeleton"
            height={42}
            animation="wave"
          />
          <Skeleton
            variant="rectangular"
            className="skeleton"
            height={42}
            animation="wave"
          />
          <Skeleton
            variant="rectangular"
            className="skeleton"
            height={42}
            animation="wave"
          />
          <Skeleton
            variant="rectangular"
            className="skeleton"
            height={42}
            animation="wave"
          />
          <Skeleton
            variant="rectangular"
            className="skeleton"
            height={42}
            animation="wave"
          />
          <Skeleton
            variant="rectangular"
            className="skeleton"
            height={42}
            animation="wave"
          />
          <Skeleton
            variant="rectangular"
            className="skeleton"
            height={42}
            animation="wave"
          />
          <Skeleton
            variant="rectangular"
            className="skeleton"
            height={42}
            animation="wave"
          />
        </Box>
      )}
    </div>
  );
};
export default AllCategories;
