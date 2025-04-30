export interface StatePostsSlices {
  allPosts: StatePost[];
  userPosts: StatePost[];
}

export interface StatePost {
  id: string;
  body: string;
  files: string;
}

export interface StatePostData {
  OwenData: {
    userName: string;
    avatar: string;
  };
  PostData: {
    body: string;
    Files: File;
  };
}
