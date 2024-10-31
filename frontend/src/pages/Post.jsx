import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaEllipsisH } from "react-icons/fa";

const Post = () => {
  const post = {
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
                    Place content for the popover here.
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
                  {post.images.length === 1 ? (
                    <img
                      src={post.images[0]}
                      alt="Image 1"
                      className="max-h-[430px] object-cover rounded-lg"
                    />
                  ) : (
                    <>
                      {post.images.length === 2 ? (
                        <div className="flex gap-2">
                          {post.images.map((image, index) => (
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
                          {post.images.map((image, index) => (
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
                      src={post.images[0]}
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

export default Post;
