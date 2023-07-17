import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./authSlice";
import productReducer from "./productSlice";

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
