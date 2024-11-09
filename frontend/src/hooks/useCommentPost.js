import { useState } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const useCommentPost = () => {
  const [isLoading, setIsLoading] = useState();
  const { id } = useParams();
  const { toast } = useToast();

  const commentPost = async (comment) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/post/comment/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(comment),
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
          description: "Comment added",
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

  return { commentPost, isLoading };
};

export default useCommentPost;
