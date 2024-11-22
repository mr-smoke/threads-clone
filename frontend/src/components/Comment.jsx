import { FaEllipsisH } from "react-icons/fa";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarImage } from "./ui/avatar";

const Comment = ({ comment }) => {
  console.log(comment);

  return (
    <div className="flex py-3 px-6 border-t border-neutral-800">
      <Avatar className="w-9 h-9">
        <a href={`/${comment.userId}`}>
          <AvatarImage src={comment.img} />
        </a>
      </Avatar>
      <div className="flex-1 flex flex-col ml-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href={`/${comment.userId}`}>
              <p className="font-semibold hover:underline">
                {comment.username}
              </p>
            </a>
          </div>
          <Popover>
            <PopoverTrigger>
              <FaEllipsisH size={20} className="text-neutral-500" />
            </PopoverTrigger>
            <PopoverContent className="bg-neutral-900 text-white border-neutral-800 items-end">
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
