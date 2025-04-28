import { createSlice } from "@reduxjs/toolkit";
import {
  StateUserSlices,
  StateUserSlicesPayLoad,
} from "../../InterFaces/StateUserSlices";

const initialState = {
  UserToken: null,
  UserData: {
    username: null,
    avatar: null,
    role: null,
    gender: null,
    email: null,
    friends: 0,
  },
  UserLoading: true,
};

const UserSlices = createSlice({
  name: "UserSlices",
  initialState,
  reducers: {
    ChangeUserToken: (state, action) => {
      state.UserToken = action.payload;
    },
    ChangeUserData: (state, action) => {
      state.UserData = action.payload;
    },
    ChangeUserLoading: (state, action) => {
      state.UserLoading = action.payload;
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

export const { ChangeUserToken, ChangeUserData, ChangeUserLoading, Logging } =
  UserSlices.actions;
