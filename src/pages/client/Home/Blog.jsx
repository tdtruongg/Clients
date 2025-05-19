import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { message } from "antd";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { postApi } from "../../../api/postApi";

const Blog = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["posts", { limit: 5, page: 1 }],
    queryFn: () =>
      postApi.getPosts({
        limit: 5,
        page: 1,
      }),
    onError: (error) => {
      console.error("Error fetching posts:", error);
      message.error("Không thể tải bài viết. Vui lòng thử lại sau.");
    },
  });

  const posts = data?.data || [];

  const formatDate = (dateString) => {
    return dayjs(dateString).format("D [Tháng] M, YYYY");
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">
              Câu chuyện du lịch mới nhất
            </h2>
            <Link
              to="/blog"
              className="flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Xem tất cả <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition animate-pulse">
              <div className="relative h-80 bg-gray-200"></div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="bg-gray-200 h-5 w-24 rounded"></span>
                  <span className="bg-gray-200 h-4 w-32 ml-3 rounded"></span>
                </div>
                <div className="bg-gray-200 h-8 w-3/4 mb-2 rounded"></div>
                <div className="bg-gray-200 h-4 w-full mb-4 rounded"></div>
                <div className="flex items-center">
                  <div className="bg-gray-200 w-10 h-10 rounded-full mr-3"></div>
                  <div>
                    <div className="bg-gray-200 h-4 w-24 mb-1 rounded"></div>
                    <div className="bg-gray-200 h-3 w-32 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="flex gap-4 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition p-4"
                >
                  <div className="bg-gray-200 w-24 h-24 flex-shrink-0 rounded-lg"></div>
                  <div className="w-full">
                    <div className="flex items-center mb-1">
                      <span className="bg-gray-200 h-4 w-16 rounded"></span>
                      <span className="bg-gray-200 h-3 w-24 ml-2 rounded"></span>
                    </div>
                    <div className="bg-gray-200 h-6 w-3/4 mb-1 rounded"></div>
                    <div className="bg-gray-200 h-4 w-full rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Câu chuyện du lịch mới nhất
          </h2>
          <p className="text-gray-600">
            Chưa có bài viết nào. Vui lòng quay lại sau.
          </p>
        </div>
      </section>
    );
  }

  const mainPost = posts[0];
  const sidePosts = posts.slice(1);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            Câu chuyện du lịch mới nhất
          </h2>
          <Link
            to="/blog"
            className="flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Xem tất cả <ChevronRight size={16} />
          </Link>
        </div>{" "}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
            <Link to={`/blog/${mainPost.slug}`} className="block relative h-80">
              <img
                src={mainPost.thumbnail}
                alt={mainPost.title}
                className="object-cover w-full h-full"
              />
            </Link>
            <div className="p-6">
              <div className="flex items-center mb-3">
                <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {mainPost.category?.name || "Không có danh mục"}
                </span>
                <span className="text-sm text-gray-500 ml-3">
                  {formatDate(mainPost.createdAt)}
                </span>
              </div>
              <Link to={`/blog/${mainPost.slug}`} className="block">
                <h3 className="text-2xl font-bold mb-2 text-gray-900 hover:text-emerald-600 transition">
                  {mainPost.title}
                </h3>
              </Link>
              <p className="text-gray-600 mb-4">{mainPost.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {sidePosts.map((post) => (
              <div
                key={post._id}
                className="flex gap-4 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition p-4"
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="relative w-24 h-24 flex-shrink-0"
                >
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="object-cover rounded-lg w-full h-full"
                  />
                </Link>
                <div>
                  <div className="flex items-center mb-1">
                    <span
                      className={`bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded`}
                    >
                      {post.category?.name || "Không có danh mục"}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">
                      {formatDate(post.createdAt)}
                    </span>
                  </div>
                  <Link to={`/blog/${post.slug}`} className="block">
                    <h3 className="text-lg font-bold mb-1 text-gray-900 hover:text-emerald-600 transition">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {post.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
