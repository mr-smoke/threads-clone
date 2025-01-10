import { timeExtract } from "../lib/timeExtract";
import { useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import ImgDialog from "./ImgDialog";

const Message = ({ message }) => {
  const { user } = useAuth();
  const isOwner = message.senderId._id === user._id;

  const messageEndRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className={`flex flex-col gap-1 ${isOwner ? "items-end" : ""}`}>
      <div
        className={`flex items-end gap-2 ${isOwner ? "flex-row-reverse" : ""}`}
      >
        <img
          className="w-8 h-8 rounded-full"
          src={message.senderId.img}
          alt="Message img"
        />
        <div className={`flex flex-col gap-1 ${isOwner ? "items-end" : ""}`}>
          {message.text.length > 0 && (
            <p className={`p-3 rounded-xl bg-slate-700 w-max`}>
              {message.text}
            </p>
          )}
          {message.img.length > 0 && (
            <ImgDialog img={message.img[0]} className="w-40 h-40 rounded-lg" />
          )}
        </div>
      </div>
      <p className="text-xs text-gray-500">{timeExtract(message.createdAt)}</p>
      <div ref={messageEndRef} />
    </div>
  );
};

export default Message;
