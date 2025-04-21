import { createSlice } from "@reduxjs/toolkit";

const CounterSlices = createSlice({
  name: "CounterSlices",
  initialState: { Counter: 0 },
  reducers: {
    Up: (state, action) => {
      state.Counter += action.payload;
    },
    Down: () => {
      console.log("Down");
    },
  },
});
export const CounterReducer = CounterSlices.reducer;

export const { Up, Down } = CounterSlices.actions;
