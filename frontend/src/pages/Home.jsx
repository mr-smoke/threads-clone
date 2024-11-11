import useGetFeed from "@/hooks/useGetFeed";
import { useState } from "react";
import Post from "@/components/Post";

const Home = () => {
  const [caption, setCaption] = useState("");
  const { feed, isLoading } = useGetFeed();

  return (
    <main className="flex flex-col justify-center">
      <section className="flex flex-col">
        {feed.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </section>
    </main>
  );
};

export default Home;
