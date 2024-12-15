import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IoEllipsisHorizontalCircle } from "react-icons/io5";
import useGetProfile from "@/hooks/useGetProfile";
import { useParams } from "react-router-dom";
import { FaInstagram } from "react-icons/fa6";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import Loading from "./Loading";
import useFollowUser from "@/hooks/useFollowUser";
import Button from "./button";

const ProfileInfo = () => {
  const { id } = useParams();
  const { profile, isLoading } = useGetProfile(id);
  const { user } = useAuth();
  const { toast } = useToast();
  const isOwner = profile._id === user?._id;
  const { followed, followersCount, handleFollow } = useFollowUser(profile);

  const copyLink = () => {
    navigator.clipboard.writeText(`http://localhost:5173/${id}`);
    toast({
      description: "Copied to clipboard",
      variant: "success",
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">{profile.name}</h1>
          <p className="">
            {profile.username}
            <span className="bg-neutral-800 py-1.5 px-2 ml-1 rounded-lg text-xs text-neutral-500 cursor-pointer">
              threads.net
            </span>
          </p>
        </div>
        <Avatar className="w-20 h-20">
          <AvatarImage src={profile.img} />
        </Avatar>
      </div>
      <p className="mt-4">{profile.bio}</p>
      <div className="flex justify-between items-center mt-3">
        <div className="flex text-neutral-500">
          <p className="mr-2">{followersCount} Followers</p>
        </div>
        <div className="flex items-center">
          <a
            href={`https://instagram.com/${profile.username}`}
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram size={24} className="mx-1.5" />
          </a>
          <Popover>
            <PopoverTrigger>
              <IoEllipsisHorizontalCircle size={24} className="mx-1.5" />
            </PopoverTrigger>
            <PopoverContent className="p-2 rounded-xl bg-neutral-900 text-white border-neutral-800 items-end">
              {isOwner ? (
                <>
                  <a href="/freeze">
                    <Button>Freeze Account</Button>
                  </a>
                  <a href="/update">
                    <Button>Update Profile</Button>
                  </a>
                </>
              ) : (
                <Button onClick={copyLink}>Copy Profile URL</Button>
              )}
            </PopoverContent>
          </Popover>
        </div>
      </div>
      {!isOwner && (
        <div className="flex gap-3 mt-3">
          <button
            className="w-full text-center py-2 font-semibold rounded-lg bg-neutral-800 hover:bg-neutral-700"
            onClick={handleFollow}
          >
            {followed ? "Unfollow" : "Follow"}
          </button>
          <a href={`/chat/${id}`} className="w-full">
            <button className="w-full text-center py-2 font-semibold rounded-lg bg-neutral-800 hover:bg-neutral-700">
              Message
            </button>
          </a>
        </div>
      )}
    </>
  );
};

export default ProfileInfo;
