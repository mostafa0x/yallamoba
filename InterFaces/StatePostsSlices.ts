export interface StatePostsSlices {
  allPosts: StatePost[];
  userPosts: StatePost[];
}

export interface StatePost {
  id: string;
  body: string;
  files: string;
}
