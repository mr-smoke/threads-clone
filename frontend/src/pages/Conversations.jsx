import useGetConversations from "@/hooks/useGetConversations";
import Loading from "@/components/Loading";
import { useAuth } from "@/context/AuthContext";
import Conversation from "@/components/Conversation";

const Conversations = () => {
  const { conversations, isLoading, fetchConversations } =
    useGetConversations();

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight === scrollHeight && !isLoading) {
      fetchConversations();
    }
  };

  return (
    <div
      className="flex flex-col overflow-y-auto max-h-[calc(100vh-8rem)] md:max-h-[calc(100vh-4rem)]"
      onScroll={handleScroll}
    >
      {isLoading && <Loading />}
      {!conversations.length && !isLoading && (
        <p className="text-center text-2xl py-3">No conversation found</p>
      )}
      {!isLoading &&
        conversations.map((conversation) => (
          <Conversation key={conversation._id} conversation={conversation} />
        ))}
    </div>
  );
};

export default Conversations;
