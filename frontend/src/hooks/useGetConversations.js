import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const useGetConversations = () => {
  const [isLoading, setIsLoading] = useState();
  const [conversations, setConversations] = useState([]);
  const { toast } = useToast();
  const [offset, setOffset] = useState(0);

  const fetchConversations = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/chat?limit=14&offset=${offset}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      setConversations([...conversations, ...data]);
      setOffset(offset + 14);
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
    fetchConversations();
  }, []);

  return { conversations, isLoading, fetchConversations };
};

export default useGetConversations;
