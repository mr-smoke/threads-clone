import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useSocket } from "@/context/SocketContext";
import useMessageStore from "@/zustand/useMessageStore";

const useGetMessages = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { id } = useParams();
  const { socket } = useSocket();
  const { messages, setMessages } = useMessageStore();

  useEffect(() => {
    socket?.on("newMessage", (message) => {
      setMessages([...messages, message]);
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [socket, messages, setMessages]);

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
            variant: "unsuccess",
          });
        } else {
          setMessages(data);
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

    fetchMessages();
  }, [setMessages]);

  return { messages, isLoading };
};

export default useGetMessages;
