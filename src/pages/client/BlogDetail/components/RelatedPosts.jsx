import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import postApi from "../../../../api/postApi";
import dayjs from "dayjs";

const RelatedPostsSkeleton = () => (
  <div className="mt-12">
    <h2 className="text-2xl font-bold mb-6">Bạn cũng có thể thích</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-xl overflow-hidden shadow-md">
          <div className="animate-pulse bg-gray-300 h-48 w-full"></div>
          <div className="p-4">
            <div className="animate-pulse bg-gray-300 h-4 w-20 rounded mb-2"></div>
            <div className="animate-pulse bg-gray-300 h-6 w-full rounded mb-2"></div>
            <div className="animate-pulse bg-gray-300 h-4 w-24 rounded mb-2"></div>
            <div className="animate-pulse bg-gray-300 h-4 w-full rounded"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function RelatedPosts({ currentPostId, categoryId }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["relatedPosts", categoryId],
    queryFn: () =>
      postApi.getPosts({
        limit: 3,
        category: categoryId,
        exclude: currentPostId,
      }),
    enabled: !!categoryId,
  });

  const relatedPosts = data?.data || [];

  const formatDate = (dateString) => {
    return dayjs(dateString).format("D [Tháng] M, YYYY");
  };

  if (isLoading) {
    return <RelatedPostsSkeleton />;
  }

  if (error || relatedPosts.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Bạn cũng có thể thích</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Link
            key={post._id}
            to={`/blog/${post.slug}`}
            className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition"
          >
            <div className="relative h-48">
              <img
                src={post.thumbnail}
                alt={post.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2 group-hover:text-emerald-600 transition">
                {post.title}
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                {formatDate(post.createdAt)}
              </p>
              <p className="text-gray-600 line-clamp-2">{post.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
