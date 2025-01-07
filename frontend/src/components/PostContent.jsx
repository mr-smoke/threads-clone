import ImgDialog from "@/components/ImgDialog";

const renderImages = (images, className) => {
  return images.map((image, index) => (
    <ImgDialog key={index} img={image} className={className} />
  ));
};

const PostContent = ({ post }) => {
  const { text, img } = post;
  const imgCount = img.length;

  return (
    <div className="flex flex-col">
      <a href={`/post/${post._id}`}>
        <p>{text}</p>
      </a>
      <div className="flex pb-2">
        {imgCount === 1 ? (
          <ImgDialog img={img[0]} className="max-h-[430px]" />
        ) : imgCount === 2 ? (
          <div className="flex gap-2">
            {renderImages(img, "w-1/2 max-h-96")}
          </div>
        ) : (
          <div className="flex gap-2 overflow-x-auto w-full">
            {renderImages(img, "flex-shrink-1 w-60 max-h-72")}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostContent;
