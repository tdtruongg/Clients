import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { message } from "antd";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import classNames from "classnames";
import { postApi } from "../../../api/postApi";
import Pagination from "../../../components/Pagination";

export default function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category");
  const searchQuery = searchParams.get("search");
  const POSTS_PER_PAGE = 9;

  useEffect(() => {
    setCurrentPage(1);
  }, [categoryId, searchQuery]);

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "blogPosts",
      {
        page: currentPage,
        limit: POSTS_PER_PAGE,
        category: categoryId,
        search: searchQuery,
      },
    ],
    queryFn: () =>
      postApi.getPosts({
        page: currentPage,
        limit: POSTS_PER_PAGE,
        category: categoryId,
        search: searchQuery,
      }),
    onError: (error) => {
      console.error("Error fetching posts:", error);
      message.error("Không thể tải bài viết. Vui lòng thử lại sau.");
    },
  });

  const blogPosts = data?.data || [];
  const totalPages = data?.pagination?.totalPages || 0;
  const categoryName = blogPosts[0]?.category?.name || "";

  const formatDate = (dateString) => {
    return dayjs(dateString).format("D [Tháng] M, YYYY");
  };

  const getRandomColor = (categoryName, index = 0) => {
    if (!categoryName) return "bg-gray-100 text-gray-800";

    const colors = [
      { bg: "bg-emerald-100", text: "text-emerald-800" },
      { bg: "bg-blue-100", text: "text-blue-800" },
      { bg: "bg-green-100", text: "text-green-800" },
      { bg: "bg-purple-100", text: "text-purple-800" },
      { bg: "bg-yellow-100", text: "text-yellow-800" },
      { bg: "bg-red-100", text: "text-red-800" },
      { bg: "bg-indigo-100", text: "text-indigo-800" },
      { bg: "bg-pink-100", text: "text-pink-800" },
      { bg: "bg-orange-100", text: "text-orange-800" },
    ];

    const colorIndex = index % colors.length;

    return `${colors[colorIndex].bg} ${colors[colorIndex].text}`;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="bg-emerald-600 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-white mb-4">
              {categoryId
                ? "Blog Du Lịch - Đang tải..."
                : searchQuery
                ? `Blog Du Lịch - Đang tìm kiếm: "${searchQuery}"`
                : "Blog Du Lịch"}
            </h1>
            <p className="text-emerald-100 text-lg max-w-2xl">
              Khám phá mẹo du lịch, hướng dẫn và câu chuyện từ khắp nơi trên thế
              giới để truyền cảm hứng cho chuyến phiêu lưu tiếp theo của bạn.
            </p>
          </div>
        </div>

        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <article
                    key={index}
                    className="bg-white rounded-xl overflow-hidden shadow-md animate-pulse"
                  >
                    <div className="relative h-56 bg-gray-200"></div>
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <span className="bg-gray-200 h-5 w-20 rounded"></span>
                        <span className="bg-gray-200 h-4 w-32 ml-3 rounded"></span>
                      </div>
                      <div className="bg-gray-200 h-7 w-full mb-2 rounded"></div>
                      <div className="bg-gray-200 h-4 w-full mb-1 rounded"></div>
                      <div className="bg-gray-200 h-4 w-3/4 mb-4 rounded"></div>
                    </div>
                  </article>
                ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Đã xảy ra lỗi
          </h2>
          <p className="text-gray-600">
            Không thể tải bài viết. Vui lòng thử lại sau.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-emerald-600 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-4">
            {categoryId && categoryName
              ? `Blog Du Lịch - ${categoryName}`
              : searchQuery
              ? `Blog Du Lịch - Kết quả tìm kiếm: "${searchQuery}"`
              : "Blog Du Lịch"}
          </h1>
          <p className="text-emerald-100 text-lg max-w-2xl">
            Khám phá mẹo du lịch, hướng dẫn và câu chuyện từ khắp nơi trên thế
            giới để truyền cảm hứng cho chuyến phiêu lưu tiếp theo của bạn.
          </p>
        </div>
      </div>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {blogPosts.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Chưa có bài viết nào
              </h2>
              <p className="text-gray-600">Vui lòng quay lại sau.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <article
                  key={post._id}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition"
                >
                  <Link to={`/blog/${post.slug}`} className="block">
                    <div className="relative h-56">
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </Link>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <span
                        className={classNames(
                          "text-xs font-medium px-2.5 py-0.5 rounded",
                          getRandomColor(post.category?.name, index)
                        )}
                      >
                        {post.category?.name || "Không có danh mục"}
                      </span>
                      <span className="text-sm text-gray-500 ml-3">
                        {formatDate(post.createdAt)}
                      </span>
                    </div>
                    <Link to={`/blog/${post.slug}`} className="block">
                      <h3 className="text-xl font-bold mb-2 hover:text-emerald-600 transition">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 mb-4 line-clamp-4">
                      {post.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </section>
    </div>
  );
}
