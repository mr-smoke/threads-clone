import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  FaRegComment,
  FaRegHeart,
  FaRegPaperPlane,
  FaRepeat,
} from "react-icons/fa6";
import { FaEllipsisH } from "react-icons/fa";
import useGetFeed from "@/hooks/useGetFeed";

const Home = () => {
  const { feed, isLoading } = useGetFeed();

  const post = {
    images: [
      "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/28970213/pexels-photo-28970213.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
  };
  return (
    <main className="flex flex-col justify-center bg-gray-900 rounded-xl">
      <section className="flex flex-col">
        <div className="flex w-full py-3 px-6">
          <Avatar className="w-9 h-9">
            <AvatarImage src="./light-logo.svg" />
          </Avatar>
          <div className="flex flex-col ml-3">
            <div className="flex justify-between items-center">
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
            <div className="flex items-center gap-6 mt-3 text-sm">
              <div className="flex items-center gap-1.5">
                <FaRegHeart size={20} />
                10
              </div>
              <div className="flex items-center gap-1.5">
                <FaRegComment size={20} />
                20
              </div>
              <div className="flex items-center gap-1.5">
                <FaRepeat size={17} />3
              </div>
              <div className="flex items-center">
                <FaRegPaperPlane size={17} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
