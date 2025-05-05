import { PostDataType } from "./StateProfileSlices";

export type TypeRole = "Roam" | "Exp" | "MM" | "Jungle" | "Mid";

export interface StateUserSlices {
  UserToken?: String | null;
  headers?: { authorization: string };
  UserData?: null | {
    username: null | string;
    avatar: null | string;
    role: null | TypeRole;
    gender: null | string;
    email: null | string;
    mobaCoin: null | number;
    popularity: null | number;
    UID: null | number;
  };
  UserLoading?: boolean;
  UserPosts?: null | PostDataType[];
}

export interface UserDataType {
  username: null | string;
  avatar: null | string;
  role: null | TypeRole;
  gender: null | string;
  email?: null | string;
  mobaCoin?: null | number;
  popularity: null | number;
  UID: null | number;
}
