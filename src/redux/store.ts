// // store.ts

// import { configureStore } from '@reduxjs/toolkit';
// import authReducer ,{ AuthState } from './authSlice';

// interface RootState {
//     auth: AuthState;
//     // Add other slice state types here
//   }

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });

// export type { RootState };
// export default store;

// import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './authSlice';

// const store = configureStore({
//   reducer: {
//     user: userReducer,
//   },
// });

// export default store;

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
