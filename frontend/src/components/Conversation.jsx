import { useSocket } from "@/context/SocketContext";

const Conversation = ({ conversation }) => {
  const { onlineUsers } = useSocket();

  return (
    <a href={`/chat/${conversation.userId}`} key={conversation._id}>
      <div
        className={`relative min-w-max flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-neutral-700 hover:opacity-70`}
      >
        <img
          src={conversation.profilePic}
          alt={conversation.name}
          className="w-10 h-10 rounded-full"
        />
        <span className="font-semibold truncate">{conversation.name}</span>
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
  );
};

export default Conversation;
