import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const PostContent = ({ post }) => {
  return (
    <div className="flex flex-col">
      <a href={`/post/${post._id}`}>
        <p>{post.text}</p>
      </a>
      <div className="flex pb-2">
        {post.img.length === 1 ? (
          <Dialog>
            <DialogTrigger>
              <img
                src={post.img[0]}
                alt="Image 1"
                className="max-h-[430px] object-cover rounded-lg"
              />
            </DialogTrigger>
            <DialogContent className="max-w-max">
              <DialogHeader>
                <DialogTitle></DialogTitle>
                <DialogDescription>
                  <img
                    src={post.img[0]}
                    alt="Image 1"
                    className="h-full max-h-screen object-cover rounded-lg"
                  />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
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
