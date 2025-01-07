import useGetMessages from "@/hooks/useGetMessages";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/components/Loading";
import { FaHandPaper } from "react-icons/fa";
import MessageInput from "@/components/MessageInput";
import Message from "@/components/Message";

const Messages = () => {
  const { messages, isLoading, fetchMessages } = useGetMessages();

  const handleScroll = (e) => {
    const { scrollTop } = e.currentTarget;
    if (scrollTop === 0 && !isLoading) {
      fetchMessages();
    }
  };

  return (
    <>
      <div
        className="p-3 flex-1 flex flex-col gap-1 overflow-y-auto max-h-[calc(100vh-8rem)]"
        onScroll={handleScroll}
      >
        {isLoading && <Loading />}
        {!messages.length && !isLoading && (
          <div className="text-5xl flex flex-col items-center justify-center h-full gap-12">
            <p className="text-center">Say hello and start to chat.</p>
            <FaHandPaper className="w-20 h-20 animate-bounce" />
          </div>
        )}
        {messages.map((message, index) => {
          const prevMessage = index > 0 ? messages[index - 1] : null;
          const isNewDay = prevMessage
            ? new Date(message.createdAt).toDateString() !==
              new Date(prevMessage.createdAt).toDateString()
            : true;
          return (
            <div key={message._id}>
              {isNewDay && (
                <div className="text-center text-xs text-gray-500 my-2">
                  {new Date(message.createdAt).toLocaleDateString()}
                </div>
              )}
              <Message message={message} />
            </div>
          );
        })}
      </div>
      <MessageInput />
    </>
  );
};

export default Messages;
