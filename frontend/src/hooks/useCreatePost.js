import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const useCreatePost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const createPost = async (postData) => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:3000/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
        credentials: "include",
      });
      const data = await response.json();

      if (data.error) {
        toast({
          description: data.error,
          variant: "unsuccess",
        });
      } else {
        toast({
          description: "Post created successfully",
          variant: "success",
        });
        window.location.href = "/";
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

  return { createPost, isLoading };
};

export default useCreatePost;
