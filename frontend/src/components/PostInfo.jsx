import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { FaEllipsisH, FaExclamationTriangle, FaTrash } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import useDeletePost from "@/hooks/useDeletePost";
import useGetProfile from "@/hooks/useGetProfile";
import useFollowUser from "@/hooks/useFollowUser";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import useUserStore from "@/zustand/useUserStore";

const PostInfo = ({ post }) => {
  const { profile, isLoading } = useGetProfile(post.userId);
  const { user } = useAuth();
  const { deletePost } = useDeletePost();
  const { followUser } = useFollowUser();
  const followed = useUserStore((state) => state.followedUsers[profile._id]);
  const setFollowed = useUserStore((state) => state.setFollowed);
  const followersCount = useUserStore(
    (state) => state.followersCount[profile._id]
  );
  const setFollowersCount = useUserStore((state) => state.setFollowersCount);

  useEffect(() => {
    if (profile.followers?.includes(user?._id)) {
      setFollowed(profile._id, true);
    } else {
      setFollowed(profile._id, false);
    }
    setFollowersCount(profile._id, profile.followers?.length);
  }, [profile, user, setFollowed, setFollowersCount]);

  const handleFollow = async () => {
    if (!user) {
      window.location.href = "/login";
      return;
    }
    followUser(profile._id);
    setFollowed(profile._id, !followed);
    setFollowersCount(
      profile._id,
      followed ? followersCount - 1 : followersCount + 1
    );
  };

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
          <HoverCard>
            <HoverCardTrigger>
              <a href={`/${profile._id}`}>
                <p className="font-semibold hover:underline">{profile.name}</p>
              </a>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="flex flex-col p-2 gap-2">
                <a href={`/${profile._id}`}>
                  <div className="flex items-center">
                    <div className="flex-1">
                      <p className="font-semibold text-xl">{profile.name}</p>
                      <p>{profile.username}</p>
                    </div>
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={profile.img} />
                    </Avatar>
                  </div>
                </a>
                <p>{profile.bio}</p>
                <p className="text-neutral-500">{followersCount} followers</p>
                {profile._id !== user?._id && (
                  <button
                    className="text-white bg-blue-500 px-4 py-1 rounded-md"
                    onClick={handleFollow}
                  >
                    {followed ? "Unfollow" : "Follow"}
                  </button>
                )}
              </div>
            </HoverCardContent>
          </HoverCard>
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
              <button
                className="flex justify-between items-center w-full px-4 py-2 font-semibold text-red-600 rounded-lg hover:bg-neutral-800"
                onClick={() => deletePost(post._id)}
              >
                Delete
                <FaTrash />
              </button>
            ) : (
              <button className="flex justify-between items-center w-full px-4 py-2 font-semibold text-red-600 rounded-lg hover:bg-neutral-800">
                Report
                <FaExclamationTriangle />
              </button>
            )}
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export default PostInfo;
