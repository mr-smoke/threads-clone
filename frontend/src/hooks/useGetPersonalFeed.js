import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const useGetPersonalFeed = () => {
  const [isLoading, setIsLoading] = useState();
  const [feed, setFeed] = useState();
  const { toast } = useToast();

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "http://localhost:3000/api/post/personalFeed",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        setFeed(data);
      } catch (error) {
        toast({
          description: error.message,
          variant: "unsuccess",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeed();
  }, []);

  return { feed, isLoading };
};

export default useGetPersonalFeed;
