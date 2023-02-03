import { cartHndlerData } from "../../service/auth.service";
import { fetchCartListSuccess } from "../actions";
import { fetchCartListFailure } from "../actions";

export const loggerMiddleware = (store) => (next) => (action) => {
  try {
    switch (action.type) {
        case "FETCH_CART":
        cartHndlerData(action.payload)
          .then((res) => {
            if (res !== null) {
              store.dispatch(fetchCartListSuccess(res[0]?.cartdetail));
            } else {
              store.dispatch(fetchCartListFailure());
              alert("FETCH_CART => RESPONSE => FALSE");
            }
          })
          .catch((err) => {
            store.dispatch(fetchCartListFailure());
            alert("ERROR OCCURED WHILE FETCH_CART DISPATCHED ");
          });
        break;
      default:
        return next(action);
    }
  } catch (error) {
    alert(error);
  }
};
