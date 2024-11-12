import { FaEllipsisH } from "react-icons/fa";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarImage } from "./ui/avatar";

const Comment = ({ comment }) => {
  return (
    <div className="flex p-3 border-t border-gray-500">
      <Avatar className="w-9 h-9">
        <AvatarImage src={comment.img} />
      </Avatar>
      <div className="flex-1 flex flex-col ml-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <p className="font-semibold">{comment.username}</p>
            <p className="ml-2 text-gray-500">2h</p>
          </div>
          <Popover>
            <PopoverTrigger>
              <FaEllipsisH size={20} className="text-gray-500" />
            </PopoverTrigger>
            <PopoverContent className="bg-gray-900 text-white border-gray-800 items-end">
              Place content for the popover here.
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col flex-1">
          <p>{comment.comment}</p>
          <div className="flex pt-3">
            <img
              src="https://source.unsplash.com/random/800x600"
              alt="Image 1"
              className="max-h-[430px] object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
