import { createSlice } from "@reduxjs/toolkit";
import { StateUserSlices } from "../../InterFaces/StateUserSlices";
import { toast } from "react-toastify";

const initialState: StateUserSlices = {
  UserToken: null,
  headers: { authorization: "" },
  UserData: {
    username: null,
    avatar: null,
    role: null,
    gender: null,
    email: null,
    popularity: 0,
    mobaCoin: 0,
    UID: null,
  },
  UserLoading: true,
  UserPosts: null,
};

const UserSlices = createSlice({
  name: "UserSlices",
  initialState,
  reducers: {
    ChangeUserToken: (state, action) => {
      state.UserToken = action.payload;
      state.headers = {
        authorization: `Bearer ${action.payload}`,
      };
    },
    ChangeUserData: (state, action) => {
      state.UserData = action.payload;
    },
    fillUserData: (state, action) => {
      if (state.UserData) {
        state.UserData.username = action.payload.username;
        state.UserData.role = action.payload.role;
        state.UserData.avatar = action.payload.avatar;
        localStorage.setItem("UserData", JSON.stringify(state.UserData));
      }
    },
    ChangeUserLoading: (state, action) => {
      state.UserLoading = action.payload;
    },
    ChangeUserPosts: (state, action) => {
      state.UserPosts = action.payload;
    },
    AddToUserPosts: (state, action) => {
      state.UserPosts?.unshift(action.payload);
    },
    RemovePostFromUserPosts: (state, action) => {
      const newUserPosts: any | undefined[] = state.UserPosts?.filter(
        (post) => {
          return post.id !== action.payload;
        }
      );
      state.UserPosts = newUserPosts;
    },
    Logging: (state, action) => {
      state.UserToken = action.payload.UserToken;
      state.UserData = action.payload.UserData;
      const UserDataTxT = JSON.stringify(action.payload.UserData);
      localStorage.setItem("UserToken", action.payload.UserToken);
      localStorage.setItem("UserData", UserDataTxT);
    },
    logOut: (state, action) => {
      const WaitingLogOut = toast.loading("Wait to logout...");
      state.UserToken = null;
      state.UserData = null;
      localStorage.removeItem("UserToken");
      localStorage.removeItem("UserData");
      // state.UserLoading = true;
      toast.dismiss(WaitingLogOut);
      toast.dismiss();
      toast.success("You have successfully logged out");
    },
  },
});

export const UserReducer = UserSlices.reducer;

export const {
  ChangeUserToken,
  ChangeUserData,
  ChangeUserLoading,
  ChangeUserPosts,
  AddToUserPosts,
  fillUserData,
  RemovePostFromUserPosts,
  Logging,
  logOut,
} = UserSlices.actions;
