import useGetPost from "@/hooks/useGetPost";
import PostActions from "@/components/PostActions";
import PostInfo from "@/components/PostInfo";
import PostContent from "@/components/PostContent";
import Comment from "@/components/Comment";
import Loading from "@/components/Loading";

const SinglePost = () => {
  const { post, isLoading } = useGetPost();

  if (isLoading) {
    return <Loading />;
  }

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <main className="flex flex-col justify-center">
      <div className="flex flex-col items-center">
        <section className="flex flex-col w-full py-3 px-6 relative">
          <div className="flex items-center">
            <div className="w-9 h-9"></div>
            <div className="flex-1 ml-2">
              <PostInfo post={post} />
            </div>
          </div>
          <PostContent post={post} />
          <PostActions post={post} />
        </section>
        <section className="flex flex-col w-full">
          {post.comments
            .slice()
            .reverse()
            .map((comment) => (
              <Comment key={comment._id} comment={comment} />
            ))}
        </section>
      </div>
    </main>
  );
};

export default SinglePost;
