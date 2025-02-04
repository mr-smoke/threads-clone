import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "react-router-dom";

const useGetPost = () => {
  const [isLoading, setIsLoading] = useState();
  const [post, setPost] = useState(null);
  const { toast } = useToast();
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/post/${id}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();

        if (data.error) {
          toast({
            description: data.error,
            variant: "unsuccess",
          });
        } else {
          setPost(data);
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

    fetchPost();
  }, [id]);

  return { post, isLoading };
};

export default useGetPost;
