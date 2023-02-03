const initialState = {
  list: [],
  totalCount: 0,
  page: 1,
  perPage: 10,
};

function cartReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_CART_FAILURE":
      return { ...state, list: [] };
    case "FETCH_CART_SUCCESS":
      return {
        ...state,
        list: action.payload.list ? action.payload.list : action.payload,
        totalCount: action.payload.count,
      };
    case "PAGE_NUMBER_CART":
      return { ...state, page: action.payload };
    case "FETCH_CART_SEARCH_SUCCESS":
      return { ...state, list: action.payload };
    default:
      return state;
  }
}

export default cartReducer;
