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
    UID: string;
  };
  PostData: {
    body: string;
    files: File | string;
    likes: number;
    commentsCount: number;
    commentsBody: string;
  };
}

export interface StatePostData {
  body: string;
  files: File | string;
  likes: number;
  commentsCount: number;
  commentsBody: string;
}
