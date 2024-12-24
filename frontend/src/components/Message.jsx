import { timeExtract } from "../lib/timeExtract";
import { useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";

const Message = ({ message }) => {
  const { user } = useAuth();
  const isOwner = message.senderId._id === user._id;

  const messageEndRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className={`flex ${isOwner ? "justify-end" : ""}`}>
      <div className={`flex flex-col gap-1 ${isOwner ? "items-end" : ""}`}>
        <div className="flex items-end gap-2">
          <img
            className={`w-8 h-8 rounded-full ${isOwner ? "order-1" : ""}`}
            src={message.senderId.img}
            alt="Message img"
          />
          <div className="flex flex-col gap-1">
            {message.text.length > 0 && (
              <p className={`p-3 rounded-xl bg-slate-700 w-fit}`}>
                {message.text}
              </p>
            )}
            {message.img.length > 0 && (
              <img
                className="w-40 h-40 rounded-lg"
                src={message.img[0]}
                alt="Message img"
              />
            )}
          </div>
        </div>
        <p className="text-xs text-right">{timeExtract(message.createdAt)}</p>
        <div ref={messageEndRef} />
      </div>
    </div>
  );
};

export default Message;
