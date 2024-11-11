import { Avatar, AvatarImage } from "@/components/ui/avatar";
import PostActions from "./PostActions";
import PostComment from "./PostComment";
import PostInfo from "./PostInfo";

const Post = ({ post }) => {
  return (
    <div className="flex w-full py-3 px-6">
      <Avatar className="w-9 h-9">
        <AvatarImage src="./light-logo.svg" />
      </Avatar>
      <div className="flex flex-col flex-1 ml-3">
        <PostInfo post={post} />
        <PostComment post={post} />
        <PostActions post={post} />
      </div>
    </div>
  );
};

export default Post;
