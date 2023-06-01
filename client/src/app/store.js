import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from "../features/counter/counterSlice";
// import counterSlice from "../features/counter/counterSlice";
import profileReducer from "../fetures/profileSlice";
import usersReducer from "../fetures/usersSlice";
import viewPostReducer from "../components/Posts/viewPostSlice";

const store = configureStore({
  reducer: {
    profile: profileReducer,
    user: usersReducer,
    posts: viewPostReducer,
  },
});

export default store;
