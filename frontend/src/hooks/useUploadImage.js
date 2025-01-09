import { useState } from "react";
import { useToast } from "./use-toast";

const useUploadImage = () => {
  const [images, setImages] = useState([]);
  const { toast } = useToast();
  const MAX_SIZE = 1024 * 1024;

  const uploadImage = (e) => {
    const files = Array.from(e.target.files);

    const validImages = files.filter((file) => {
      if (!file.type.startsWith("image/")) {
        toast({ description: "Invalid file type", variant: "unsuccess" });
        return false;
      }
      if (file.size > MAX_SIZE) {
        toast({ description: "File size exceeds 1MB", variant: "unsuccess" });
        return false;
      }
      return true;
    });

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
      })
      .catch((error) => {
        toast({
          description: "Error uploading images",
          variant: "unsuccess",
        });
      });
  };

  return { images, setImages, uploadImage };
};

export default useUploadImage;
