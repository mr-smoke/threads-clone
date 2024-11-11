import { useAuth } from "@/context/AuthContext";
import useCommentPost from "@/hooks/useCommentPost";
import useLikePost from "@/hooks/useLikePost";
import { useEffect, useState } from "react";
import { FaRegComment, FaRegHeart, FaRegPaperPlane } from "react-icons/fa6";
import CreateComment from "./CreateComment";

const PostActions = ({ post }) => {
  const { user } = useAuth();
  const { likePost } = useLikePost();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes.length);

  useEffect(() => {
    if (user) {
      setLiked(post.likes.some((like) => like.userId === user._id));
    }
  }, [user, post.likes]);

  const handleLike = () => {
    likePost(post._id);
    setLiked((prevLiked) => !prevLiked);
    setLikesCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
  };

  const copyLink = () => {
    navigator.clipboard.writeText(`http://localhost:5173/post/${post._id}`);
  };

  return (
    <div className="flex items-center gap-6 mt-3 text-sm">
      <div className="flex items-center  gap-1.5">
        <button onClick={handleLike}>
          <svg width="20" height="20" viewBox="0 0 24 24">
            <g transform="translate(0 -1028.4)">
              <path
                d="m7 1031.4c-1.5355 0-3.0784 0.5-4.25 1.7-2.3431 2.4-2.2788 6.1 0 8.5l9.25 9.8 9.25-9.8c2.279-2.4 2.343-6.1 0-8.5-2.343-2.3-6.157-2.3-8.5 0l-0.75 0.8-0.75-0.8c-1.172-1.2-2.7145-1.7-4.25-1.7z"
                strokeWidth={2}
                stroke={liked ? "red" : "currentColor"}
                fill={liked ? "red" : "none"}
              />
            </g>
          </svg>
        </button>
        {likesCount}
      </div>
      <div className="flex items-center gap-1.5">
        <CreateComment postId={post._id} />
        {post.comments.length}
      </div>
      <div className="flex items-center">
        <button onClick={copyLink}>
          <FaRegPaperPlane size={17} />
        </button>
      </div>
    </div>
  );
};

export default PostActions;
