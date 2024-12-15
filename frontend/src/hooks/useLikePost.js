import { useToast } from "@/hooks/use-toast";

const useLikePost = () => {
  const { toast } = useToast();

  const likePost = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/post/like/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();

      if (data.error) {
        toast({
          description: data.error,
          variant: "unsuccess",
        });
      }
    } catch (error) {
      toast({
        description: error.message,
        variant: "unsuccess",
      });
    }
  };

  return { likePost };
};

export default useLikePost;
