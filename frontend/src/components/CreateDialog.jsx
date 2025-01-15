import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRef } from "react";
import Loading from "@/components/Loading";

const CreateDialog = ({
  title,
  children,
  onSubmit,
  isLoading,
  multiple,
  setText,
  images,
  setImages,
  uploadImage,
  open,
  setOpen,
}) => {
  const imageRef = useRef(null);

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen((prev) => !prev);
        setText("");
        setImages([]);
      }}
    >
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <p className="text-2xl font-semibold">Create {title}</p>
          </DialogTitle>
          <DialogDescription asChild>
            <form onSubmit={onSubmit}>
              <div className="flex flex-col gap-3">
                <textarea
                  className="border rounded-lg p-2 text-base text-black"
                  placeholder="Post content"
                  maxLength={250}
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
                    multiple={multiple}
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

export default CreateDialog;
