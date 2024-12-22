import { useAuth } from "@/context/AuthContext";
import useLikePost from "@/hooks/useLikePost";
import { useEffect, useState } from "react";
import {
  FaRegComment,
  FaRegHeart,
  FaRegPaperPlane,
  FaCopy,
} from "react-icons/fa6";
import CreateComment from "./CreateComment";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import Button from "./button";

const PostActions = ({ post }) => {
  const { user } = useAuth();
  const { likePost } = useLikePost();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes.length);
  const [commentsCount, setCommentsCount] = useState(post.comments.length);
  const { toast } = useToast();

  useEffect(() => {
    if (user && post.likes.includes(user._id)) {
      setLiked(true);
    }
  }, [user, post.likes]);

  const handleLike = () => {
    if (!user) {
      window.location.href = "/login";
      return;
    }
    likePost(post._id);
    setLiked((prevLiked) => !prevLiked);
    setLikesCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
  };

  const copyLink = () => {
    navigator.clipboard.writeText(`http://localhost:5173/post/${post._id}`);
    toast({
      description: "Copied to clipboard",
      variant: "success",
    });
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
        <CreateComment postId={post._id} setCommentsCount={setCommentsCount} />
        {commentsCount}
      </div>
      <Popover>
        <PopoverTrigger>
          <FaRegPaperPlane size={17} />
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="p-2 rounded-xl bg-neutral-900 text-white border-neutral-800"
        >
          <Button onClick={copyLink}>
            Copy Post Link
            <FaCopy />
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default PostActions;
