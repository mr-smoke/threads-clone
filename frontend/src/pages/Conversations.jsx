import useGetConversations from "@/hooks/useGetConversations";
import Loading from "@/components/Loading";
import { useAuth } from "@/context/AuthContext";
import { useSocket } from "@/context/SocketContext";

const Conversations = () => {
  const { conversations, isLoading, fetchConversations } =
    useGetConversations();
  const { onlineUsers } = useSocket();

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight === scrollHeight && !isLoading) {
      fetchConversations();
    }
  };

  return (
    <div
      className="flex flex-col overflow-y-auto max-h-[calc(100vh-4rem)]"
      onScroll={handleScroll}
    >
      {isLoading && <Loading />}
      {!conversations.length && !isLoading && (
        <p className="text-center text-2xl py-3">No conversation found</p>
      )}
      {!isLoading &&
        conversations.map((conversation) => (
          <a href={`/chat/${conversation.userId}`} key={conversation._id}>
            <div
              className={`relative min-w-max flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-neutral-700 hover:opacity-70`}
            >
              <img
                src={conversation.profilePic}
                alt={conversation.name}
                className="w-10 h-10 rounded-full"
              />
              <span className="font-semibold truncate">
                {conversation.name}
              </span>
              {onlineUsers.includes(conversation.userId) ? (
                <div className="absolute right-3 text-green-500 font-semibold">
                  Online
                </div>
              ) : (
                <div className="absolute right-3 text-red-500 font-semibold">
                  Offline
                </div>
              )}
            </div>
          </a>
        ))}
    </div>
  );
};

export default Conversations;
