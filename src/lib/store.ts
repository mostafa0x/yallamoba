import { configureStore } from "@reduxjs/toolkit";
import { CounterReducer } from "./CounterSlices";
import { PostsReducer } from "./PostsSlices";

export let Store = configureStore({
  reducer: {
    CounterReducer,
    PostsReducer,
  },
});
