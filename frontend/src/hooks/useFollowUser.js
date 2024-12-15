import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import useUserStore from "@/zustand/useUserStore";
import { useAuth } from "@/context/AuthContext";

const useFollowUser = (profile) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const followed = useUserStore((state) => state.followedUsers[profile._id]);
  const setFollowed = useUserStore((state) => state.setFollowed);
  const followersCount = useUserStore(
    (state) => state.followersCount[profile._id]
  );
  const setFollowersCount = useUserStore((state) => state.setFollowersCount);
  const { user } = useAuth();

  useEffect(() => {
    if (profile.followers?.includes(user?._id)) {
      setFollowed(profile._id, true);
    } else {
      setFollowed(profile._id, false);
    }
    setFollowersCount(profile._id, profile.followers?.length);
  }, [profile, user, setFollowed, setFollowersCount]);

  const followUser = async (followId) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/user/follow/${followId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();

      if (data.error) {
        toast({
          description: data.error,
          variant: "unsuccess",
        });
      } else {
        toast({
          description: data,
          variant: "success",
        });
      }
    } catch (error) {
      toast({
        description: error.message,
        variant: "unsuccess",
      });
    } finally {
      setIsLoading(false);
    }
  };

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

  return { followed, followersCount, handleFollow };
};

export default useFollowUser;
