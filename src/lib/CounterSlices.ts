import { createSlice } from "@reduxjs/toolkit";

const CounterSlices = createSlice({
  name: "CounterSlices",
  initialState: { Counter: 0 },
  reducers: {
    Up: () => {
      console.log("Up");
    },
    Down: () => {
      console.log("Down");
    },
  },
});
export const CounterReducer = CounterSlices.reducer;

export const { Up, Down } = CounterSlices.actions;
