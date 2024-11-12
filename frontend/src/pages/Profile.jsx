import useGetUserPosts from "@/hooks/useGetUserPosts";
import ProfileInfo from "@/components/ProfileInfo";
import Post from "@/components/Post";
import { useState } from "react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("threads");
  const { posts, isLoading } = useGetUserPosts();

  return (
    <main className="flex flex-col justify-center bg-gray-900 rounded-xl">
      <section className="flex flex-col py-4 px-6">
        <ProfileInfo />
      </section>
      <section className="flex flex-col">
        <div className="flex justify-between font-bold">
          <button
            className={`w-1/2 text-center border-b pb-3 ${
              activeTab !== "threads" ? "text-gray-500 border-gray-500" : ""
            }`}
            onClick={() => setActiveTab("threads")}
          >
            Threads
          </button>
          <button
            className={`w-1/2 text-center border-b pb-3 ${
              activeTab !== "replies" ? "text-gray-500 border-gray-500" : ""
            }`}
            onClick={() => setActiveTab("replies")}
          >
            Replies
          </button>
        </div>
        <div className="flex flex-col items-center">
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Profile;
