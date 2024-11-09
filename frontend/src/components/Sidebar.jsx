import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  IoAdd,
  IoHome,
  IoHomeOutline,
  IoPerson,
  IoPersonOutline,
  IoSearch,
  IoSearchOutline,
} from "react-icons/io5";
import { useLocation } from "react-router-dom";
import useCreatePost from "@/hooks/useCreatePost";

const Sidebar = () => {
  const [caption, setCaption] = useState("");
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);
  const { createPost, isLoading: isCreatingPost } = useCreatePost();
  const imageRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
    createPost({ caption });
  };

  return (
    <div className="h-screen fixed left-0 flex flex-col items-center justify-between w-20">
      <a href="/">
        <img
          src="/light-logo.svg"
          alt="logo"
          className="w-9 h-9 my-4 hover:scale-110 transition-transform"
        />
      </a>
      <div className="flex flex-col items-center">
        <a
          href="/"
          className="w-14 h-14 flex items-center justify-center hover:bg-[#171717] rounded-lg"
        >
          {active === "/" ? (
            <IoHome className="text-white w-7 h-7" />
          ) : (
            <IoHomeOutline className="text-[#565656] w-7 h-7" />
          )}
        </a>
        <a
          href="/search"
          className="w-14 h-14 flex items-center justify-center hover:bg-[#171717] rounded-lg"
        >
          {active === "/search" ? (
            <IoSearch className="text-white w-7 h-7" />
          ) : (
            <IoSearchOutline className="text-[#565656] w-7 h-7" />
          )}
        </a>
        <a
          href="/profile"
          className="w-14 h-14 flex items-center justify-center hover:bg-[#171717] rounded-lg"
        >
          {active === "/profile" ? (
            <IoPerson className="text-white w-7 h-7" />
          ) : (
            <IoPersonOutline className="text-[#565656] w-7 h-7" />
          )}
        </a>
      </div>
      <div className="flex flex-col items-center  h-[68px]">
        <Dialog>
          <DialogTrigger>
            <div className="w-14 h-14 flex items-center justify-center hover:bg-[#171717] rounded-lg">
              <IoAdd className="text-[#565656] w-7 h-7" />
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                <h1 className="text-2xl font-semibold">Create Post</h1>
              </DialogTitle>
              <DialogDescription>
                <form>
                  <div className="flex flex-col gap-3">
                    <textarea
                      className="border rounded-lg p-2 text-base text-black"
                      placeholder="Post content"
                      maxLength={100}
                      onChange={(e) => setCaption(e.target.value)}
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
      </div>
    </div>
  );
};

export default Sidebar;
