import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext";
import useDeletePost from "@/hooks/useDeletePost";
import useGetPost from "@/hooks/useGetPost";
import useLikePost from "@/hooks/useLikePost";
import { FaEllipsisH } from "react-icons/fa";
import useCommentPost from "@/hooks/useCommentPost";
import { useRef, useState } from "react";

const SinglePost = () => {
  const [comment, setComment] = useState("");
  const { post, isLoading } = useGetPost();
  const { user } = useAuth();
  const { deletePost } = useDeletePost();
  const { likePost } = useLikePost();
  const { commentPost } = useCommentPost();
  const imageRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
    commentPost({ comment });
  };

  const posts = {
    images: [
      "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/28970213/pexels-photo-28970213.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
  };
  return (
    <main className="flex flex-col justify-center bg-gray-900 rounded-xl pb-4 mb-10">
      <section className="flex flex-col">
        <div className="flex flex-col items-center">
          <div className="flex flex-col w-full py-3 px-6">
            <div className="flex items-center">
              <Avatar className="w-9 h-9">
                <AvatarImage src="./light-logo.svg" />
              </Avatar>
              <div className="flex justify-between items-center w-full ml-2">
                <div className="flex items-center">
                  <p className="font-semibold">Jane Doe</p>
                  <p className="ml-2 text-gray-500">2h</p>
                </div>
                <Popover>
                  <PopoverTrigger>
                    <FaEllipsisH size={20} className="text-gray-500" />
                  </PopoverTrigger>
                  <PopoverContent className="bg-gray-900 text-white border-gray-800 items-end">
                    {post?.userId === user?._id ? (
                      <button
                        className="flex items-center w-full px-4 py-2 text-sm text-left"
                        onClick={() => deletePost(post._id)}
                      >
                        Delete
                      </button>
                    ) : (
                      <button className="flex items-center w-full px-4 py-2 text-sm text-left">
                        Report
                      </button>
                    )}
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="flex flex-col pt-3">
              <div className="flex flex-col">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  etiam, ac nunc, eget.
                </p>
                <div className="flex pt-3">
                  {posts.images.length === 1 ? (
                    <img
                      src={posts.images[0]}
                      alt="Image 1"
                      className="max-h-[430px] object-cover rounded-lg"
                    />
                  ) : (
                    <>
                      {posts.images.length === 2 ? (
                        <div className="flex gap-2">
                          {posts.images.map((image, index) => (
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
                          {posts.images.map((image, index) => (
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
            </div>
            <div className="flex items-center pt-3 gap-3">
              <div className="flex items-center gap-2">
                <button className="flex items-center" onClick={likePost}>
                  Like
                </button>
                {post?.likes.length}
              </div>
              <div className="flex items-center gap-2">
                <Dialog>
                  <DialogTrigger>
                    <button className="bg-gray-800 text-white px-4 py-2 rounded-lg">
                      Comment
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        <h1 className="text-2xl font-semibold">Comments</h1>
                      </DialogTitle>
                      <DialogDescription>
                        <form>
                          <div className="flex flex-col gap-3">
                            <textarea
                              className="border rounded-lg p-2 text-base text-black"
                              placeholder="Post content"
                              maxLength={100}
                              onChange={(e) => setComment(e.target.value)}
                            />
                            <div className="flex justify-between">
                              <button
                                className="bg-gray-700 text-white font-semibold px-5 py-3 rounded-lg hover:bg-gray-800 w-max"
                                onClick={() => imageRef.current.click()}
                              >
                                Add Image
                              </button>
                              <input ref={imageRef} hidden type="file" />
                              <button
                                className="bg-blue-500 text-white font-semibold px-5 py-3 rounded-lg hover:bg-blue-600 w-max"
                                onClick={submitHandler}
                              >
                                Post
                              </button>
                            </div>
                          </div>
                        </form>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                {post?.comments.length}
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex p-3 border-t border-gray-500">
              <Avatar className="w-9 h-9">
                <AvatarImage src="./light-logo.svg" />
              </Avatar>
              <div className="flex flex-col ml-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <p className="font-semibold">Jane Doe</p>
                    <p className="ml-2 text-gray-500">2h</p>
                  </div>
                  <Popover>
                    <PopoverTrigger>
                      <FaEllipsisH size={20} className="text-gray-500" />
                    </PopoverTrigger>
                    <PopoverContent className="bg-gray-900 text-white border-gray-800 items-end">
                      Place content for the popover here.
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex flex-col">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    etiam, ac nunc, eget.
                  </p>
                  <div className="flex pt-3">
                    <img
                      src={posts.images[0]}
                      alt="Image 1"
                      className="max-h-[430px] object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SinglePost;
