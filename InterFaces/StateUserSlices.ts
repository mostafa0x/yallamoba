export interface StateUserSlices {
  UserToken: String | null;
  UserData: null | {
    username: null | string;
    avatar: null | string;
    role: null | string;
    gender: null | string;
    email: null | string;
    friends: number;
  };
  UserLoading: boolean;
}
