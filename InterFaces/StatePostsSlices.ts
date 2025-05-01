export interface StatePostsSlices {
  allPosts: StatePost[];
  userPosts: any[];
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

export interface postData {
  user_id: number;
  body: string;
  files: string[];
  created_at: string;
  updated_at: string;
}
