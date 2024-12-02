import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import useSendMessage from "@/hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { sendMessage, isLoading } = useSendMessage();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      return;
    }
    await sendMessage(message);
    setMessage("");
  };

  return (
    <form
      className="bg-black p-4 flex gap-3 fixed bottom-0 z-10 w-full md:w-[620px]"
      onSubmit={submitHandler}
    >
      <input
        className="flex-1 p-3 rounded-lg bg-slate-700"
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="rounded-full bg-slate-700 p-3"
        type="submit"
        disabled={isLoading}
      >
        <FaPaperPlane className="w-5 h-5" />
      </button>
    </form>
  );
};

export default MessageInput;
