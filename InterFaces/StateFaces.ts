import { UserSlices } from "./UserSlices";

export interface StateFaces {
  CounterReducer: {
    Counter: number;
  };
  PostsReducer: {
    AllPosts: [];
  };
  UserReducer: UserSlices;
}
