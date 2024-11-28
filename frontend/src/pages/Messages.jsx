import useGetMessages from "@/hooks/useGetMessages";

const Messages = () => {
  const { messages } = useGetMessages();

  return (
    <div>
      <h1>Messages</h1>
    </div>
  );
};

export default Messages;
