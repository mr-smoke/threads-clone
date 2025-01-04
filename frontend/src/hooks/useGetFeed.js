import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const useGetFeed = () => {
  const [isLoading, setIsLoading] = useState();
  const [feed, setFeed] = useState([]);
  const { toast } = useToast();
  const [offset, setOffset] = useState(0);

  const fetchFeed = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/post/feed?limit=10&offset=${offset}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      setFeed([...feed, ...data]);
      setOffset(offset + 10);
    } catch (error) {
      toast({
        description: error.message,
        variant: "unsuccess",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return { feed, isLoading, fetchFeed };
};

export default useGetFeed;
