import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const useGetMessages = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const { toast } = useToast();
  const { id } = useParams();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:3000/api/chat/${id}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();

        if (data.error) {
          toast({
            description: data.error,
          });
        } else {
          setMessages(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return { messages, isLoading };
};

export default useGetMessages;
