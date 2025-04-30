type Role = "Roam" | "Exp" | "MM" | "Jungle" | "Mid";

export interface StateUserSlices {
  UserToken: String | null;
  UserData: null | {
    username: null | string;
    avatar: null | string;
    role: null | Role;
    gender: null | string;
    email: null | string;
    friends: number;
    popularity: number;
  };
  UserLoading: boolean;
}
