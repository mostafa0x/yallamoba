import { StateUserSlices } from "./StateUserSlices";

export interface StateFaces {
  CounterReducer: {
    Counter: number;
  };
  PostsReducer: {
    AllPosts: [];
  };
  UserReducer: StateUserSlices;
  AvatarReducer: {
    avatars: string[];
    currentAvatarIndex: number;
    AvatarAnmition: number;
  };
}
