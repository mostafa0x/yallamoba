import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const GetAllPosts = createAsyncThunk(
  "PostsSlices/GetAllPosts",
  async () => {
    const data = await axios.get("https://jsonplaceholder.typicode.com/posts");
    console.log(data);

    return data.data;
  }
);

const initialState = { allPosts: [] };

const PostsSlices = createSlice({
  name: "PostsSlices",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(GetAllPosts.fulfilled, (state, action) => {
      state.allPosts = action.payload;
    });
  },
  reducers: {},
});

export const PostsReducer = PostsSlices.reducer;
export const {} = PostsSlices.actions;
