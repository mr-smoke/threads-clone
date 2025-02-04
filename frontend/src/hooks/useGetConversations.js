import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const useGetConversations = () => {
  const [isLoading, setIsLoading] = useState();
  const [conversations, setConversations] = useState([]);
  const { toast } = useToast();
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchConversations = async () => {
    if (!hasMore) return;

    try {
      setIsLoading(true);
      const response = await fetch(`/api/chat?limit=14&offset=${offset}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (data.length < 14) {
        setHasMore(false);
      }

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
