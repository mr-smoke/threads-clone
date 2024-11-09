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
        });
      } else {
        toast({
          description: "Post created successfully",
        });
        window.location.href = "/";
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

  return { createPost, isLoading };
};

export default useCreatePost;
