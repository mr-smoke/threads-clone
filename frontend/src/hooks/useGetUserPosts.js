import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "react-router-dom";

const useGetUserPosts = () => {
  const [isLoading, setIsLoading] = useState();
  const [posts, setPosts] = useState([]);
  const { toast } = useToast();
  const { id } = useParams();
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async () => {
    if (!hasMore) return;

    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/post/user/${id}?limit=10&offset=${offset}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.length < 10) {
        setHasMore(false);
      }

      setPosts([...posts, ...data]);
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
    fetchPosts();
  }, []);

  return { posts, isLoading, fetchPosts };
};

export default useGetUserPosts;
