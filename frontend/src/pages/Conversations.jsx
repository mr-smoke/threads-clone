import useGetConversations from "@/hooks/useGetConversations";
import Loading from "@/components/Loading";
import { useAuth } from "@/context/AuthContext";

const Conversations = () => {
  const { conversations, isLoading } = useGetConversations();

  console.log(conversations);

  return (
    <div className="flex flex-col">
      {isLoading && <Loading />}
      {!conversations.length && !isLoading && (
        <p className="text-center text-2xl py-3">No conversation found</p>
      )}
      {!isLoading &&
        conversations.map((conversation) => (
          <div
            className={`relative min-w-max flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-neutral-700 hover:opacity-70 
          `}
            key={conversation._id}
          >
            <img
              src={conversation.profilePic}
              alt={conversation.name}
              className="w-10 h-10 rounded-full"
            />
            <span className="font-semibold truncate">{conversation.name}</span>
          </div>
        ))}
    </div>
  );
};

export default Conversations;
