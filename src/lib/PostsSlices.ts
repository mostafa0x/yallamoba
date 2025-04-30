import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { StatePostsSlices } from "../../InterFaces/StatePostsSlices";

export const GetAllPosts = createAsyncThunk(
  "PostsSlices/GetAllPosts",
  async () => {
    const data = await axios.get("https://jsonplaceholder.typicode.com/posts");
    console.log(data);

    return data.data;
  }
);

const initialState: StatePostsSlices = { allPosts: [], userPosts: [] };

const PostsSlices = createSlice({
  name: "PostsSlices",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(GetAllPosts.fulfilled, (state, action) => {
      state.allPosts = action.payload;
    });
  },
  reducers: {
    AddPostTouserPost: (state, action) => {
      state.userPosts.push(action.payload);
    },
  },
});

export const PostsReducer = PostsSlices.reducer;
export const { AddPostTouserPost } = PostsSlices.actions;
