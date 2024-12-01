import useGetMessages from "@/hooks/useGetMessages";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/components/Loading";
import { FaHandPaper } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";

const Messages = () => {
  const { messages, isLoading } = useGetMessages();
  const { user } = useAuth();

  return (
    <>
      <div className="p-3 flex-1 flex flex-col gap-1 mb-3 md:mb-20">
        {isLoading && <Loading />}
        {!messages.length && !isLoading && (
          <div className="text-5xl flex flex-col items-center justify-center h-full gap-12">
            <p className="text-center">Say hello and start to chat.</p>
            <FaHandPaper className="w-20 h-20 animate-bounce" />
          </div>
        )}
        {messages.map((message, index) => {
          return (
            <div key={message._id}>
              <div className={`flex`}>
                <div className={`flex flex-col gap-1`}>
                  <div className="flex items-center gap-2">
                    <img
                      className={`w-8 h-8 `}
                      src={message.senderId.img}
                      alt="Message img"
                    />
                    <p className={`p-3 rounded-xl bg-slate-700 w-max`}>
                      {message.content}
                    </p>
                  </div>
                  <p className="text-xs text-right">{message.createdAt}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <form className="bg-black p-4 flex gap-3 fixed bottom-0 z-10 w-full md:w-[620px]">
        <input
          className="flex-1 p-3 rounded-lg bg-slate-700"
          type="text"
          placeholder="Type a message"
        />
        <button className="rounded-full bg-slate-700 p-3" type="submit">
          <FaPaperPlane className="w-5 h-5" />
        </button>
      </form>
    </>
  );
};

export default Messages;
