import { useState } from "react";
import { useToast } from "./use-toast";

const useUploadImage = () => {
  const [images, setImages] = useState([]);
  const { toast } = useToast();

  const uploadImage = (e) => {
    const files = Array.from(e.target.files);

    const validImages = files.filter((file) => file.type.startsWith("image/"));

    const readers = validImages.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers)
      .then((results) => {
        setImages((prevImages) => [...prevImages, ...results]);
        toast({
          description: "Images uploaded successfully",
          variant: "success",
        });
      })
      .catch((error) => {
        toast({
          description: "Error uploading images",
          variant: "unsuccess",
        });
      });
  };

  return { images, uploadImage };
};

export default useUploadImage;
