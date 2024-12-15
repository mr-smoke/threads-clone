import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const useCommentPost = () => {
  const [isLoading, setIsLoading] = useState();
  const { toast } = useToast();

  const commentPost = async (comment, id) => {
    try {
      setIsLoading(true);
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
          variant: "unsuccess",
        });
        return false;
      } else {
        toast({
          description: "Comment added",
          variant: "success",
        });
        return true;
      }
    } catch (error) {
      toast({
        description: error.message,
        variant: "unsuccess",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { commentPost, isLoading };
};

export default useCommentPost;
