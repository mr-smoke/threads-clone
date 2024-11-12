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

const ProfileInfo = () => {
  const { id } = useParams();
  const { profile, isLoading } = useGetProfile(id);
  const { user } = useAuth();
  const isOwner = profile._id === user?._id;
  console.log(isOwner);

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">{profile.name}</h1>
          <p className="">
            {profile.username}
            <span className="bg-gray-800 py-1.5 px-2 ml-1 rounded-lg text-xs text-gray-500 cursor-pointer">
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
        <div className="flex text-gray-500">
          <p className="mr-2">{profile.followers} Followers</p>
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
            <PopoverContent className="bg-gray-900 text-white border-gray-800 items-end">
              {isOwner ? (
                <a href="/freeze">
                  <button className="w-full py-2 px-4 text-left hover:bg-gray-800">
                    Freeze Account
                  </button>
                </a>
              ) : (
                <button
                  className="w-full py-2 px-4 text-left hover:bg-gray-800"
                  onClick={() =>
                    navigator.clipboard.writeText(window.location.href)
                  }
                >
                  Copy Profile URL
                </button>
              )}
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
