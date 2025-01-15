import useCreatePost from "@/hooks/useCreatePost";
import { useState } from "react";
import { IoAdd } from "react-icons/io5";
import Loading from "@/components/Loading";
import useUploadImage from "@/hooks/useUploadImage";
import CreateDialog from "@/components/CreateDialog";

const CreatePost = () => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const { createPost, isLoading } = useCreatePost();
  const { images, setImages, uploadImage } = useUploadImage();

  const submitHandler = (e) => {
    e.preventDefault();
    createPost({ text, images });
  };

  return (
    <CreateDialog
      title="Post"
      onSubmit={submitHandler}
      isLoading={isLoading}
      multiple={true}
      setText={setText}
      images={images}
      setImages={setImages}
      uploadImage={uploadImage}
      open={open}
      setOpen={setOpen}
    >
      <div className="w-14 h-14 flex items-center justify-center hover:bg-[#171717] rounded-lg">
        <IoAdd className="text-[#565656] w-7 h-7" />
      </div>
    </CreateDialog>
  );
};

export default CreatePost;
