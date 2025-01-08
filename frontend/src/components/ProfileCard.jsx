import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import useFollowUser from "@/hooks/useFollowUser";

const ProfileCard = ({ profile, user }) => {
  const { followed, followersCount, handleFollow } = useFollowUser(profile);

  return (
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
  );
};

export default ProfileCard;
