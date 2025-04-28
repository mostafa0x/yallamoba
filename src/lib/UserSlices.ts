import { createSlice } from "@reduxjs/toolkit";
import {
  StateUserSlices,
  StateUserSlicesPayLoad,
} from "../../InterFaces/StateUserSlices";

const initialState = {
  UserToken: null,
  UserData: {
    Username: null,
    Avatar: null,
    Role: null,
    Gender: null,
    Email: null,
    Friends: 0,
  },
};

const UserSlices = createSlice({
  name: "UserSlices",
  initialState,
  reducers: {
    ChangeUserToken: (state, action) => {
      state.UserToken = action.payload;
    },
    Logging: (state, action) => {
      state.UserToken = action.payload.UserToken;
      state.UserData = action.payload.UserData;
      const UserDataTxT = JSON.stringify(action.payload.UserData);
      localStorage.setItem("UserToken", action.payload.UserToken);
      localStorage.setItem("UserData", UserDataTxT);
    },
  },
});

export const UserReducer = UserSlices.reducer;

export const { ChangeUserToken, Logging } = UserSlices.actions;
