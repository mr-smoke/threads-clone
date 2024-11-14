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
import { FaEllipsisH } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import useDeletePost from "@/hooks/useDeletePost";
import useGetProfile from "@/hooks/useGetProfile";
import useFollowUser from "@/hooks/useFollowUser";
import { useEffect, useState } from "react";

const PostInfo = ({ post }) => {
  const { profile, isLoading } = useGetProfile(post.userId);
  const { user } = useAuth();
  const { deletePost } = useDeletePost();
  const { followUser } = useFollowUser();
  const [followed, setFollowed] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);

  useEffect(() => {
    if (isLoading) return;
    setFollowersCount(profile.followers.length);
    if (profile.followers.includes(user._id)) {
      setFollowed(true);
    } else {
      setFollowed(false);
    }
  }, [profile.followers, user?._id]);

  const handleFollow = () => {
    followUser(profile._id);
    setFollowed((prevFollowed) => !prevFollowed);
    setFollowersCount((prevCount) =>
      followed ? prevCount - 1 : prevCount + 1
    );
  };

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
                <div className="flex items-center">
                  <div className="flex-1">
                    <p className="font-semibold text-xl">{profile.name}</p>
                    <p>{profile.username}</p>
                  </div>
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={profile.img} />
                  </Avatar>
                </div>
                <p>{profile.bio}</p>
                <p className="text-gray-500">{followersCount} followers</p>
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
    </>
  );
};

export default PostInfo;
