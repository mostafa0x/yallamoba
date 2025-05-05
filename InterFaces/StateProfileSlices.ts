import { TypeRole } from "./StateUserSlices";

export interface StateProfileSlices {
  ownerData: {
    username: null | string;
    avatar: null | string;
    role: null | TypeRole;
    gender: null | string;
    popularity: number;
    UID: null | number;
  };
  ownerPosts: PostDataType[];
}

export interface PostDataType {
  id: number;
  body: string;
  files: string[];
  created_at: string;
  updated_at: string;
}
