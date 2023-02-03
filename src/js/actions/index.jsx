export function fetchCartListFailure() {
  return { type: "FETCH_CART_FAILURE" };
}

export function fetchCartListSuccess(payload) {
  return { type: "FETCH_CART_SUCCESS", payload };
}

export function fetchCartList(payload) {
  return { type: "FETCH_CART", payload };
}
