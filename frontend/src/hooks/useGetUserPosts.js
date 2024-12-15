import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "react-router-dom";

const useGetUserPosts = () => {
  const [isLoading, setIsLoading] = useState();
  const [posts, setPosts] = useState([]);
  const { toast } = useToast();
  const { id } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:3000/api/post/user/${id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        toast({
          description: error.message,
          variant: "unsuccess",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [id]);

  return { posts, isLoading };
};

export default useGetUserPosts;
