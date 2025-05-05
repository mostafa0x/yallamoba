import { configureStore } from "@reduxjs/toolkit";
import { CounterReducer } from "./CounterSlices";
import { PostsReducer } from "./PostsSlices";
import { UserReducer } from "./UserSlices";
import { AvatarReducer } from "./AvatarSlices";
import { ProfileReducer } from "./ProfileSlices";

export const Store = configureStore({
  reducer: {
    CounterReducer,
    PostsReducer,
    UserReducer,
    AvatarReducer,
    ProfileReducer,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
