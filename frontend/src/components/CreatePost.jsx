import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useCreatePost from "@/hooks/useCreatePost";
import { useRef, useState } from "react";
import { IoAdd } from "react-icons/io5";
import Loading from "@/components/Loading";
import useUploadImage from "@/hooks/useUploadImage";

const CreatePost = () => {
  const [text, setText] = useState("");
  const { createPost, isLoading } = useCreatePost();
  const { images, setImages, uploadImage } = useUploadImage();
  const imageRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
    createPost({ text, images });
  };

  return (
    <Dialog
      onOpenChange={() => {
        setText("");
        setImages([]);
      }}
    >
      <DialogTrigger>
        <div className="w-14 h-14 flex items-center justify-center hover:bg-[#171717] rounded-lg">
          <IoAdd className="text-[#565656] w-7 h-7" />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <p className="text-2xl font-semibold">Create Post</p>
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
                    {images.length > 0
                      ? `Add ${images.length} more image(s)`
                      : "Add image"}
                  </button>
                  <input
                    ref={imageRef}
                    hidden
                    type="file"
                    multiple
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

export default CreatePost;
