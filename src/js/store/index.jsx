import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { rootReducer } from "../reducer";

import { loggerMiddleware } from "../middleware";

const reducer = combineReducers(rootReducer);
const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(loggerMiddleware);

const store = configureStore({
  reducer,
  middleware,
});

export default store;
