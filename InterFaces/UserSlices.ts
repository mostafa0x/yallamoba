export interface UserSlices {
  UserToken: String | null;
  UserData: {
    Username: null | string;
    Avatar: null | string;
    Role: null | string;
    Gender: null | string;
    email: null | string;
    Friends: number;
  };
}
