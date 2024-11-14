import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const useFollowUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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
        });
      } else {
        toast({
          description: data,
        });
      }
    } catch (error) {
      toast({
        description: error.message,
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { followUser, isLoading };
};

export default useFollowUser;
