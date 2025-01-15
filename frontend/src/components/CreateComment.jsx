import useCreateComment from "@/hooks/useCreateComment";
import { useState } from "react";
import { FaRegComment } from "react-icons/fa6";
import CreateDialog from "@/components/CreateDialog";
import useUploadImage from "@/hooks/useUploadImage";

const CreateComment = ({ postId, setCommentsCount }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const { commentPost, isLoading } = useCreateComment();
  const { images, setImages, uploadImage } = useUploadImage();

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
    <CreateDialog
      title="Comment"
      onSubmit={submitHandler}
      isLoading={isLoading}
      multiple={false}
      setText={setText}
      images={images}
      setImages={setImages}
      uploadImage={uploadImage}
      open={open}
      setOpen={setOpen}
    >
      <FaRegComment
        size={20}
        className="group-hover:text-blue-500 transition-colors duration-200"
      />
    </CreateDialog>
  );
};

export default CreateComment;
