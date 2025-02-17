import { FaEllipsisH, FaExclamationTriangle, FaTrash } from "react-icons/fa";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useAuth } from "@/context/AuthContext";
import useGetProfile from "@/hooks/useGetProfile";
import ProfileCard from "./ProfileCard";
import ImgDialog from "./ImgDialog";
import Button from "./Button";
import useDeleteComment from "@/hooks/useDeleteComment";

const Comment = ({ comment }) => {
  const { profile, isLoading } = useGetProfile(comment.userId);
  const { user } = useAuth();
  const { deleteComment } = useDeleteComment();

  return (
    <div className="flex py-3 px-6 border-t border-neutral-800">
      <Avatar className="w-9 h-9">
        <a href={`/${comment.userId}`}>
          <AvatarImage src={comment.avatar} />
        </a>
      </Avatar>
      <div className="flex-1 flex flex-col ml-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ProfileCard profile={profile} user={user} isLoading={isLoading} />
          </div>
          <Popover>
            <PopoverTrigger>
              <FaEllipsisH size={20} className="text-neutral-500" />
            </PopoverTrigger>
            <PopoverContent className="p-2 rounded-xl bg-neutral-900 text-white border-neutral-800 items-end">
              {comment.userId === user?._id ? (
                <Button
                  onClick={() => deleteComment(comment._id)}
                  className="text-red-600"
                >
                  Delete
                  <FaTrash />
                </Button>
              ) : (
                <Button className="text-red-600">
                  Report
                  <FaExclamationTriangle />
                </Button>
              )}
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col flex-1 pt-1">
          {comment.text.length > 0 && <p>{comment.text}</p>}
          {comment.img.length === 1 && (
            <ImgDialog img={comment.img[0]} className="max-h-[430px]" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
