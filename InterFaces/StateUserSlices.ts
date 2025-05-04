export type TypeRole = "Roam" | "Exp" | "MM" | "Jungle" | "Mid";

export interface StateUserSlices {
  UserToken?: String | null;
  UserData?: null | {
    username: null | string;
    avatar: null | string;
    role: null | TypeRole;
    gender: null | string;
    email: null | string;
    mobaCoin: number;
    popularity: number;
    UID: null | number;
  };
  UserLoading: boolean;
  UserPosts: null | any[];
}

export interface StateUserData {
  username: null | string;
  avatar: null | string;
  role: null | TypeRole;
  gender: null | string;
  email: null | string;
  mobaCoin: number;
  popularity: number;
  UID: null | number;
}
