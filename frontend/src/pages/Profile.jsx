import useGetUserPosts from "@/hooks/useGetUserPosts";
import ProfileInfo from "@/components/ProfileInfo";
import Post from "@/components/Post";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("threads");
  const { posts, isLoading, fetchPosts } = useGetUserPosts();

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight && !isLoading) {
      fetchPosts();
    }
  };

  return (
    <main className="flex flex-col justify-center bg-neutral-900 rounded-xl">
      <section className="flex flex-col py-4 px-6">
        <ProfileInfo />
      </section>
      <section className="flex flex-col">
        <div className="flex justify-between font-bold">
          <button
            className={`w-1/2 text-center border-b pb-3 ${
              activeTab !== "threads"
                ? "text-neutral-500 border-neutral-700"
                : ""
            }`}
            onClick={() => setActiveTab("threads")}
          >
            Threads
          </button>
          <button
            className={`w-1/2 text-center border-b pb-3 ${
              activeTab !== "replies"
                ? "text-neutral-500 border-neutral-700"
                : ""
            }`}
            onClick={() => setActiveTab("replies")}
          >
            Replies
          </button>
        </div>
        <div
          className="flex flex-col items-center overflow-y-auto max-h-[calc(100vh-360px)] md:max-h-[calc(100vh-290px)]"
          onScroll={handleScroll}
        >
          {isLoading && (
            <>
              {[...Array(8)].map((_, index) => (
                <div key={index} className="flex py-3 px-6 w-full">
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <div className="flex flex-col flex-1 ml-3 gap-2">
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-4" />
                    <Skeleton className="h-4 w-[250px]" />
                  </div>
                </div>
              ))}
            </>
          )}
          {posts.length === 0 && !isLoading && (
            <div className="text-neutral-500 text-lg my-4">No posts found</div>
          )}
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Profile;
