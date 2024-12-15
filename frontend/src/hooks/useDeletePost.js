import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const useDeletePost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const deletePost = async (postId) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/post/delete/${postId}`,
        {
          method: "DELETE",
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
          description: "Post deleted successfully",
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

  return { deletePost, isLoading };
};

export default useDeletePost;
