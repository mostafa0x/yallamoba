import { configureStore } from "@reduxjs/toolkit";
import { CounterReducer } from "./CounterSlices";
import { PostsReducer } from "./PostsSlices";
import { UserReducer } from "./UserSlices";
import { AvatarReducer } from "./AvatarSlices";

export let Store = configureStore({
  reducer: {
    CounterReducer,
    PostsReducer,
    UserReducer,
    AvatarReducer,
  },
});
