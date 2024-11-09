import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const useLikePost = () => {
  const { id } = useParams();
  const { toast } = useToast();

  const likePost = async () => {
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
        });
      }
    } catch (error) {
      toast({
        description: error.message,
      });
      console.error(error);
    }
  };

  return { likePost };
};

export default useLikePost;
