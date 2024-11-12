const PostContent = ({ post }) => {
  return (
    <div className="flex flex-col">
      <p>{post.caption}</p>
      <div className="flex">
        {post.img.length === 1 ? (
          <img
            src={post.img[0]}
            alt="Image 1"
            className="max-h-[430px] object-cover rounded-lg"
          />
        ) : (
          <>
            {post.img.length === 2 ? (
              <div className="flex gap-2">
                {post.img.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Image ${index + 1}`}
                    className="w-1/2 max-h-96 object-cover rounded-lg"
                  />
                ))}
              </div>
            ) : (
              <div className="flex gap-2 overflow-x-auto w-full">
                {post.img.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Image ${index + 1}`}
                    className="flex-shrink-1 w-60 max-h-72 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PostContent;
