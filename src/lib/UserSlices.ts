import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  UserToken: null,
  UserData: {
    Username: null,
    Avatar: null,
    Role: null,
    Gender: null,
    email: null,
  },
};

const UserSlices = createSlice({
  name: "UserSlices",
  initialState,
  reducers: {
    ChangeUserToken: (state, action) => {
      state.UserToken = action.payload;
    },
  },
});

export const UserReducer = UserSlices.reducer;

export const { ChangeUserToken } = UserSlices.actions;
