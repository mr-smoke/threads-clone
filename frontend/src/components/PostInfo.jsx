import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaEllipsisH } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import useDeletePost from "@/hooks/useDeletePost";
import useGetProfile from "@/hooks/useGetProfile";

const PostInfo = ({ post }) => {
  const { profile, isLoading } = useGetProfile(post.userId);
  const { user } = useAuth();
  const { deletePost } = useDeletePost();

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <p className="font-semibold">{profile.name}</p>
        <p className="ml-2 text-gray-500">2h</p>
      </div>
      <Popover>
        <PopoverTrigger>
          <FaEllipsisH size={20} className="text-gray-500" />
        </PopoverTrigger>
        <PopoverContent className="bg-gray-900 text-white border-gray-800 items-end">
          {post.userId === user?._id ? (
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-left"
              onClick={() => deletePost(post._id)}
            >
              Delete
            </button>
          ) : (
            <button className="flex items-center w-full px-4 py-2 text-sm text-left">
              Report
            </button>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default PostInfo;
