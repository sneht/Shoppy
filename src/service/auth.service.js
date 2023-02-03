import { get, post, patch, remove } from "./web.request";
import { ENDPOINTURL } from "../utils/helper";

export const categoryHndlerData = (body) => {
  return post(`${ENDPOINTURL}/category/list`, body);
};

export const productHndlerData = (body) => {
  return post(`${ENDPOINTURL}/product/list`, body);
};

export const userHandlerData = (body) => {
  return post(`${ENDPOINTURL}/user/signup`, body);
};

export const verifyHandlerData = (body) => {
  return post(`${ENDPOINTURL}/user/list`, body);
};

export const loginHandlerData = (body) => {
  return post(`${ENDPOINTURL}/user/signin`, body);
};

export const forgotpassHandlerData = (body) => {
  return post(`${ENDPOINTURL}/user/forgotPassword`, body);
};

export const headerimgHandle = (body) => {
  return post(`${ENDPOINTURL}/header/list`, body);
};
export const compassHandlerData = (body, id) => {
  return post(`${ENDPOINTURL}/user/verifyAndChangePassword/${id}`, body);
};

export const userHndlerData = (id) => {
  return get(`${ENDPOINTURL}/user/${id}`);
};

export const userupdateHandlerData = (id, body) => {
  return patch(`${ENDPOINTURL}/user/${id}`, body);
};

export const addcartHndlerData = (body) => {
  return post(`${ENDPOINTURL}/cart`, body);
};

export const cartHndlerData = (body) => {
  return post(`${ENDPOINTURL}/cart/list`, body);
};

export const cartproductdeleteHndlerData = (body) => {
  return remove(`${ENDPOINTURL}/cart`, body);
};

export const cartdeleteHndlerData = (body) => {
  return remove(`${ENDPOINTURL}/cart/clearAll`, body);
};

export const cartseldeleteHndlerData = (body) => {
  return post(`${ENDPOINTURL}/cart/selected`, body);
};

export const addaddressHndlerData = (body) => {
  return post(`${ENDPOINTURL}/address`, body);
};

export const addressHndlerData = (body) => {
  return post(`${ENDPOINTURL}/address/list`, body);
};

export const addressDelHndler = (id) => {
  return remove(`${ENDPOINTURL}/address/${id}`);
};

export const editaddressHndlerData = (id, body) => {
  return patch(`${ENDPOINTURL}/address/${id}`, body);
};

export const promocodeHndlerData = (body) => {
  return post(`${ENDPOINTURL}/promocode/list`, body);
};

export const razorpayDataHandler = (body) => {
  return post(`${ENDPOINTURL}/razorpay`, body);
};

export const orderDataHandler = (body) => {
  return post(`${ENDPOINTURL}/order`, body);
};

export const orderinvoiceDataHandler = (body) => {
  return post(`${ENDPOINTURL}/order/list`, body);
};

export const orderListDataHandler = (body) => {
  return post(`${ENDPOINTURL}/order/list`, body);
};
export const productUpdateHandler = (id, body) => {
  return patch(`${ENDPOINTURL}/product/${id}`, body);
};

export const productUpdate = (body) => {
  return post(`${ENDPOINTURL}/product/updateMany`, body);
};

export const catchSearchData = (body) => {
  return post(`${ENDPOINTURL}/frontSearch`, body);
};

export const orderUpdate = (id, body) => {
  return patch(`${ENDPOINTURL}/order/${id}`, body);
};
export const wishlistDataHandler = (body) => {
  return post(`${ENDPOINTURL}/wishlist`, body);
};
export const wishlistDataListHandler = (body) => {
  return post(`${ENDPOINTURL}/wishlist/list`, body);
};
