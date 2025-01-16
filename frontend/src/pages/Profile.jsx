import ProfileInfo from "@/components/ProfileInfo";
import { useState } from "react";
import ProfileContent from "@/components/ProfileContent";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("threads");

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
        <ProfileContent />
      </section>
    </main>
  );
};

export default Profile;
