import { StatePostsSlices } from "./StatePostsSlices";
import { StateProfileSlices } from "./StateProfileSlices";
import { StateUserSlices } from "./StateUserSlices";

export interface StateFaces {
  CounterReducer: {
    Counter: number;
  };
  PostsReducer: StatePostsSlices;
  UserReducer: StateUserSlices;
  AvatarReducer: {
    avatars: string[];
    currentAvatarIndex: number;
    AvatarAnmition: number;
  };
  ProfileReducer: { ProfileData: StateProfileSlices };
}
