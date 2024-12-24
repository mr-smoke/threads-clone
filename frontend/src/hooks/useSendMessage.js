import { useState } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import useMessageStore from "@/zustand/useMessageStore";

const useSendMessage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { id } = useParams();
  const { messages, setMessages } = useMessageStore();

  const sendMessage = async (message) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/chat/sendMessage/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(message),
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
        setMessages([...messages, data]);
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

  return { sendMessage, isLoading };
};

export default useSendMessage;
