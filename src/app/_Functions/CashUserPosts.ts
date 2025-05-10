import { PostDataType } from "../../../InterFaces/StateProfileSlices";

export default function CashUserPosts(post: PostDataType) {
  const cashPosts = localStorage.getItem("UserPosts");
  if (cashPosts) {
    const parsedPosts: PostDataType[] = JSON.parse(cashPosts);
    parsedPosts.unshift(post);
    parsedPosts.length > 3 && parsedPosts.pop();
    const updatedPosts = parsedPosts;
    localStorage.setItem("UserPosts", JSON.stringify(updatedPosts));
  } else {
    localStorage.setItem("UserPosts", JSON.stringify([post]));
  }
}
