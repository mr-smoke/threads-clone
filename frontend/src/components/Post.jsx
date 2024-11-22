import PostActions from "./PostActions";
import PostContent from "./PostContent";
import PostInfo from "./PostInfo";

const Post = ({ post }) => {
  return (
    <div className="flex w-full py-3 px-6 relative border-b border-neutral-700">
      <div className="w-9 h-9"></div>
      <div className="flex flex-col flex-1 ml-3">
        <PostInfo post={post} />
        <PostContent post={post} />
        <PostActions post={post} />
      </div>
    </div>
  );
};

export default Post;
