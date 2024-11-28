import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const useGetConversations = () => {
  const [isLoading, setIsLoading] = useState();
  const [conversations, setConversations] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:3000/api/chat", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setConversations(data);
      } catch (error) {
        toast({
          description: error.message,
        });
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchConversations();
  }, []);

  return { conversations, isLoading };
};

export default useGetConversations;
