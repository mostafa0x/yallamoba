import { UserSlices } from "./UserSlices";

export interface StateFaces {
  CounterReducer: {
    Counter: number;
  };
  PostsReducer: {
    AllPosts: [];
  };
  UserReducer: UserSlices;
  AvatarReducer: {
    avatars: string[];
    currentAvatarIndex: number;
    AvatarAnmition: number;
  };
}
