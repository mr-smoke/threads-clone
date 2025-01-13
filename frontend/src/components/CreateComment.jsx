import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useCreateComment from "@/hooks/useCreateComment";
import useUploadImage from "@/hooks/useUploadImage";
import Loading from "@/components/Loading";
import { useRef, useState } from "react";
import { FaRegComment } from "react-icons/fa6";

const CreateComment = ({ postId, setCommentsCount }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const { commentPost, isLoading } = useCreateComment();
  const { images, setImages, uploadImage } = useUploadImage();
  const imageRef = useRef(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await commentPost({ text, images }, postId);
    if (res) {
      setText("");
      setCommentsCount((prevCount) => prevCount + 1);
      setOpen(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen((prev) => !prev);
        setText("");
        setImages([]);
      }}
    >
      <DialogTrigger>
        <FaRegComment
          size={20}
          className="group-hover:text-blue-500 transition-colors duration-200"
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <p className="text-2xl font-semibold">Create Comment</p>
          </DialogTitle>
          <DialogDescription asChild>
            <form onSubmit={submitHandler}>
              <div className="flex flex-col gap-3">
                <textarea
                  className="border rounded-lg p-2 text-base text-black"
                  placeholder="Post content"
                  maxLength={100}
                  onChange={(e) => setText(e.target.value)}
                />
                <div className="flex justify-between">
                  <button
                    className="bg-neutral-700 text-white font-semibold px-5 py-3 rounded-lg hover:bg-neutral-800 w-max"
                    type="button"
                    onClick={() => imageRef.current.click()}
                  >
                    {images.length > 0 ? "Image added" : "Add image"}
                  </button>
                  <input
                    ref={imageRef}
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={uploadImage}
                  />
                  <button
                    className="bg-blue-500 text-white font-semibold px-5 py-3 rounded-lg hover:bg-blue-600 w-max"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? <Loading /> : "Post"}
                  </button>
                </div>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateComment;
