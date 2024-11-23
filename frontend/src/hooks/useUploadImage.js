import { useState } from "react";

const useUploadImage = () => {
  const [image, setImage] = useState(null);

  const uploadImage = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      setImage(null);
    }
  };

  return { image, uploadImage };
};

export default useUploadImage;
