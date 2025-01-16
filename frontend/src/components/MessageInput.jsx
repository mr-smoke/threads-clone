import { useState } from "react";
import { FaPaperPlane, FaImage, FaCheck } from "react-icons/fa";
import useSendMessage from "@/hooks/useSendMessage";
import useUploadImage from "@/hooks/useUploadImage";
import { useRef } from "react";

const MessageInput = () => {
  const [text, setText] = useState("");
  const { images, setImages, uploadImage } = useUploadImage();
  const { sendMessage, isLoading } = useSendMessage();
  const imageRef = useRef(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!text.trim() && images.length === 0) {
      return;
    }
    await sendMessage({ text, images });
    setText("");
  };

  return (
    <form
      className="bg-black p-2 flex gap-3 fixed bottom-0 z-10 w-full md:w-[620px]"
      onSubmit={submitHandler}
    >
      <div className="flex-1 bg-slate-700 rounded-lg flex">
        <input
          className="flex-1 p-3 bg-slate-700 rounded-lg focus:outline-none"
          type="text"
          placeholder="Type a message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="rounded-full bg-slate-700 p-3 pl-0"
          type="button"
          onClick={() => imageRef.current.click()}
        >
          {images.length > 0 ? <FaCheck /> : <FaImage />}
        </button>
        <input
          ref={imageRef}
          hidden
          type="file"
          accept="image/*"
          onChange={uploadImage}
        />
      </div>
      <button
        className="rounded-full bg-slate-700 p-3"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="w-5 h-5 border-t-2 border-b-2 border-slate-200 animate-spin" />
        ) : (
          <FaPaperPlane className="w-5 h-5" />
        )}
      </button>
    </form>
  );
};

export default MessageInput;
