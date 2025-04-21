import { configureStore } from "@reduxjs/toolkit";
import { CounterReducer } from "./CounterSlices";

export let Store = configureStore({
  reducer: {
    CounterReducer,
  },
});
