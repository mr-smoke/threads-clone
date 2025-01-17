import useGetFeed from "@/hooks/useGetFeed";
import Post from "@/components/Post";
import { Skeleton } from "@/components/ui/skeleton";

const Home = () => {
  const { feed, isLoading, fetchFeed } = useGetFeed();

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight && !isLoading) {
      fetchFeed();
    }
  };

  return (
    <main className="flex flex-col justify-center">
      <section
        className="flex flex-col overflow-y-auto max-h-[calc(100vh-8rem)] md:max-h-[calc(100vh-4rem)]"
        onScroll={handleScroll}
      >
        {isLoading && (
          <>
            {[...Array(10)].map((_, index) => (
              <div key={index} className="flex py-3 px-6">
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
        {feed.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </section>
    </main>
  );
};

export default Home;
