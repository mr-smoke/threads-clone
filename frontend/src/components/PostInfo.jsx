import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "./ui/skeleton";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { FaEllipsisH, FaExclamationTriangle, FaTrash } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import useDeletePost from "@/hooks/useDeletePost";
import useGetProfile from "@/hooks/useGetProfile";
import Button from "./Button";
import ProfileCard from "./ProfileCard";

const PostInfo = ({ post }) => {
  const { profile, isLoading } = useGetProfile(post.userId);
  const { user } = useAuth();
  const { deletePost } = useDeletePost();

  if (isLoading) {
    return (
      <>
        <Skeleton className="h-9 w-9 rounded-full absolute top-3 left-6" />
        <Skeleton className="h-4 w-[150px]" />
      </>
    );
  }

  return (
    <>
      <a href={`/${profile._id}`}>
        <Avatar className="w-9 h-9 absolute top-3 left-6">
          <AvatarImage src={profile.img} />
        </Avatar>
      </a>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <ProfileCard profile={profile} user={user} />
          <a href={`/post/${post._id}`}>
            <p className="ml-2 text-neutral-500 hover:underline">
              {formatDistanceToNow(new Date(post.createdAt))} ago
            </p>
          </a>
        </div>
        <Popover>
          <PopoverTrigger>
            <FaEllipsisH size={20} className="text-neutral-500" />
          </PopoverTrigger>
          <PopoverContent className="p-2 rounded-xl bg-neutral-900 text-white border-neutral-800 items-end">
            {post.userId === user?._id ? (
              <Button
                onClick={() => deletePost(post._id)}
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
    </>
  );
};

export default PostInfo;
