import useGetUserPosts from "@/hooks/useGetUserPosts";
import Post from "@/components/Post";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileContent = ({ user }) => {
  const { posts, isLoading, fetchPosts } = useGetUserPosts();

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight && !isLoading) {
      fetchPosts();
    }
  };

  return (
    <div
      className="overflow-y-auto max-h-[calc(100vh-410px)] md:max-h-[calc(100vh-340px)]"
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
      {posts.length === 0 && (
        <div className="text-neutral-500 text-lg my-4 text-center">
          No posts found
        </div>
      )}
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default ProfileContent;
