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
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    socket?.on("newMessage", (message) => {
      setMessages([...messages, message]);
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [socket, messages, setMessages]);

  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/chat/${id}?limit=10&offset=${offset}`,
        {
          method: "GET",
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
        setOffset(offset + 10);
        setMessages([...data.reverse(), ...messages]);
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

  useEffect(() => {
    fetchMessages();
  }, []);

  return { messages, isLoading, fetchMessages };
};

export default useGetMessages;
