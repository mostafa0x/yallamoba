export interface StateUserSlices {
  UserToken: String | null;
  UserData: {
    Username: null | string;
    Avatar: null | string;
    Role: null | string;
    Gender: null | string;
    Email: null | string;
    Friends: number;
  };
}

export interface StateUserSlicesPayLoad {
  payload: {
    UserToken: String | null;
    UserData: {
      Username: null | string;
      Avatar: null | string;
      Role: null | string;
      Gender: null | string;
      Email: null | string;
      Friends: number;
    };
  };
}
