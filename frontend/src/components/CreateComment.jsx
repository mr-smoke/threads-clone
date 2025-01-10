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
        <svg
          fill="#ffffff"
          width="20"
          height="20"
          viewBox="0 -3 28 28"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m14 2c-.038 0-.083-.001-.128-.001-2.098 0-4.102.399-5.942 1.124l.11-.038c-1.74.644-3.217 1.645-4.4 2.922l-.007.007c-.99 1.036-1.608 2.436-1.633 3.98v.005c.013 1.258.432 2.415 1.131 3.351l-.011-.015c.835 1.131 1.885 2.053 3.096 2.719l.049.025 1.36.782-.426 1.498c-.272 1.021-.646 1.915-1.122 2.741l.029-.054c1.651-.691 3.071-1.59 4.313-2.686l-.017.014.672-.594.89.094c.607.077 1.312.122 2.028.125h.004c.038 0 .083.001.128.001 2.098 0 4.102-.399 5.942-1.124l-.11.038c1.74-.644 3.217-1.645 4.4-2.922l.007-.007c1.009-1.025 1.632-2.432 1.632-3.984s-.623-2.96-1.633-3.985l.001.001c-1.19-1.284-2.666-2.286-4.329-2.904l-.078-.025c-1.73-.687-3.735-1.086-5.833-1.086-.044 0-.088 0-.132.001h.007zm14 8c-.012 1.924-.72 3.681-1.884 5.033l.009-.01c-1.349 1.592-3.059 2.837-5.008 3.611l-.086.03c-2.023.846-4.374 1.337-6.839 1.337-.068 0-.135 0-.202-.001h.01c-.8-.002-1.588-.047-2.363-.134l.097.009c-1.981 1.759-4.399 3.072-7.069 3.756l-.118.026c-.503.145-1.107.266-1.726.339l-.055.005h-.08c-.163 0-.311-.062-.422-.164-.123-.111-.212-.258-.249-.424l-.001-.005v-.016c-.017-.029-.027-.064-.027-.102 0-.033.008-.063.021-.091l-.001.001c.02-.047.031-.101.031-.159 0-.001 0-.001 0-.002q-.008-.031.07-.149l.094-.141.11-.133.125-.141q.11-.125.484-.539l.539-.594q.164-.18.484-.617c.174-.231.343-.493.491-.767l.017-.033q.187-.359.422-.922c.137-.317.276-.712.39-1.117l.017-.07c-1.558-.861-2.852-2.018-3.844-3.405l-.024-.035c-.878-1.216-1.407-2.735-1.414-4.377v-.002c.012-1.924.72-3.681 1.884-5.033l-.009.01c1.349-1.592 3.059-2.837 5.008-3.611l.086-.03c2.023-.846 4.374-1.337 6.839-1.337.068 0 .135 0 .202.001h-.01c.057-.001.125-.001.192-.001 2.465 0 4.816.491 6.959 1.381l-.12-.044c2.034.804 3.745 2.048 5.078 3.622l.015.018c1.155 1.342 1.863 3.099 1.875 5.021v.003z" />
        </svg>
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
