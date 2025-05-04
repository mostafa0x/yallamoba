import { createSlice } from "@reduxjs/toolkit";
import { StateProfileSlices } from "../../InterFaces/StateProfileSlices";

const initialState = {
  ProfileData: null as StateProfileSlices | null,
};

const ProfileSlices = createSlice({
  name: "ProfileSlices",
  initialState,
  reducers: {
    SetProfileData: (state, action) => {
      state.ProfileData = action.payload;
    },
  },
});

export const ProfileReducer = ProfileSlices.reducer;
export const { SetProfileData } = ProfileSlices.actions;
