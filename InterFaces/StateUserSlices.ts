export interface StateUserSlices {
  UserToken: String | null;
  UserData: {
    username: null | string;
    avatar: null | string;
    role: null | string;
    gender: null | string;
    email: null | string;
    friends: number;
  };
  UserLoading: boolean;
}

export interface StateUserSlicesPayLoad {
  payload: {
    UserToken: String | null;
    UserData: {
      username: null | string;
      avatar: null | string;
      role: null | string;
      gender: null | string;
      email: null | string;
      friends: number;
    };
  };
}
