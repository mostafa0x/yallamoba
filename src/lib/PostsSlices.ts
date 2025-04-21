import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export let GetAllPosts = createAsyncThunk(
  "PostsSlices/GetAllPosts",
  async () => {
    const data = await axios.get("https://jsonplaceholder.typicode.com/posts");
    console.log(data);

    return data.data;
  }
);

const PostsSlices = createSlice({
  name: "PostsSlices",
  initialState: { AllPosts: [] },
  extraReducers: (builder) => {
    builder.addCase(GetAllPosts.fulfilled, (state, action) => {
      state.AllPosts = action.payload;
    });
  },
  reducers: {},
});

export const PostsReducer = PostsSlices.reducer;
