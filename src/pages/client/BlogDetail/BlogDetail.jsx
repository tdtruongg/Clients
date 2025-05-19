import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import postApi from "../../../api/postApi";

import {
  Calendar,
  User,
  Clock,
  Share2,
  Bookmark,
  Heart,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  AlertCircle,
  LogIn,
  Instagram,
} from "lucide-react";
import RelatedPosts from "./components/RelatedPosts";
import PopularCategories from "./components/PopularCategories";
import CommentSection from "./components/CommentSection";
import dayjs from "dayjs";
import useAuth from "../../../hook/useAuth";
import { message, Modal } from "antd";


const SkeletonPostHeader = () => (
  <div className="relative h-[50vh] md:h-[60vh]">
    <div className="animate-pulse bg-gray-300 h-full w-full"></div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
    <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
      <div className="container mx-auto">
        <div className="max-w-4xl">
          <div className="animate-pulse bg-gray-300 h-5 w-24 rounded mb-4"></div>
          <div className="animate-pulse bg-gray-300 h-10 w-3/4 rounded mb-2"></div>
          <div className="animate-pulse bg-gray-300 h-10 w-1/2 rounded mb-4"></div>
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            <div className="animate-pulse bg-gray-300 h-4 w-32 rounded"></div>
            <div className="animate-pulse bg-gray-300 h-4 w-24 rounded"></div>
            <div className="animate-pulse bg-gray-300 h-4 w-28 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SkeletonContent = () => (
  <div className="animate-pulse">
    <div className="bg-gray-300 h-6 w-full rounded mb-4"></div>
    <div className="bg-gray-300 h-6 w-full rounded mb-4"></div>
    <div className="bg-gray-300 h-6 w-11/12 rounded mb-8"></div>

    <div className="bg-gray-300 h-6 w-3/4 rounded mb-4"></div>
    <div className="bg-gray-300 h-6 w-full rounded mb-4"></div>
    <div className="bg-gray-300 h-6 w-5/6 rounded mb-8"></div>

    <div className="bg-gray-300 h-8 w-1/3 rounded mb-4"></div>
    <div className="bg-gray-300 h-6 w-full rounded mb-4"></div>
    <div className="bg-gray-300 h-6 w-full rounded mb-4"></div>
    <div className="bg-gray-300 h-6 w-4/5 rounded mb-8"></div>
  </div>
);

const SkeletonTags = () => (
  <div className="mt-8 pt-8 border-t">
    <div className="animate-pulse bg-gray-300 h-6 w-32 rounded mb-4"></div>
    <div className="flex flex-wrap gap-2">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="animate-pulse bg-gray-300 h-8 w-20 rounded-full"
        ></div>
      ))}
    </div>
  </div>
);

const SkeletonAuthor = () => (
  <div className="mt-8 pt-8 border-t bg-gray-50 p-6 rounded-xl">
    <div className="flex items-start gap-4">
      <div className="animate-pulse bg-gray-300 h-16 w-16 rounded-full flex-shrink-0"></div>
      <div className="flex-1">
        <div className="animate-pulse bg-gray-300 h-6 w-40 rounded mb-2"></div>
        <div className="animate-pulse bg-gray-300 h-4 w-32 rounded mb-2"></div>
        <div className="animate-pulse bg-gray-300 h-4 w-full rounded"></div>
      </div>
    </div>
  </div>
);

const SkeletonSidebar = () => (
  <div className="lg:w-1/3">
    <div className="sticky top-24">
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex justify-between mb-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-300 h-8 w-20 rounded"
            ></div>
          ))}
        </div>
        <div className="animate-pulse bg-gray-300 h-10 w-full rounded"></div>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <div className="animate-pulse bg-gray-300 h-6 w-48 rounded mb-2"></div>
        <div className="animate-pulse bg-gray-300 h-4 w-full rounded mb-4"></div>
        <div className="animate-pulse bg-gray-300 h-10 w-full rounded mb-2"></div>
        <div className="animate-pulse bg-gray-300 h-10 w-full rounded"></div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="animate-pulse bg-gray-300 h-6 w-48 rounded mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="animate-pulse bg-gray-300 h-4 w-32 rounded"></div>
              <div className="animate-pulse bg-gray-300 h-6 w-8 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState({
    show: false,
    id: null,
    isReply: false,
  });
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => postApi.getPostBySlug(slug),
    enabled: !!slug,
  });

  const post = data || {};

  const likeMutation = useMutation({
    mutationFn: () => postApi.likePost(post._id),
    onSuccess: () => {
      message.success("Đã thích bài viết");
      queryClient.invalidateQueries(["post", slug]);
    },
    onError: (error) => {
      console.error("Error liking post:", error);
      message.error("Không thể thích bài viết. Vui lòng thử lại sau.");
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: () => postApi.unlikePost(post._id),
    onSuccess: () => {
      message.success("Đã bỏ thích bài viết");
      queryClient.invalidateQueries(["post", slug]);
    },
    onError: (error) => {
      console.error("Error unliking post:", error);
      message.error("Không thể bỏ thích bài viết. Vui lòng thử lại sau.");
    },
  });

  const handleLikeToggle = () => {
    if (!isAuthenticated) {
      Modal.confirm({
        title: "Đăng nhập để thích bài viết",
        content: "Bạn cần đăng nhập để thích bài viết này.",
        icon: <LogIn />,
        okText: "Đăng nhập ngay",
        cancelText: "Đóng",
        onOk() {
          navigate("/auth/login");
        },
      });
      return;
    }

    if (post.userLiked) {
      unlikeMutation.mutate();
    } else {
      likeMutation.mutate();
    }
  };

  const formattedDate = post?.createdAt
    ? dayjs(post.createdAt).format("D [Tháng] M, YYYY")
    : "";

  const calculateReadTime = (content) => {
    if (!content) return "3 phút đọc";
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} phút đọc`;
  };

  const readTime = calculateReadTime(post.content);

  const handleDeleteComment = (id) => {
    setShowDeleteConfirm({ show: true, id });
  };

  const cancelDelete = () => {
    setShowDeleteConfirm({ show: false, id: null });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <SkeletonPostHeader />

        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3">
              <SkeletonContent />
              <SkeletonTags />

              <div className="mt-8 pt-8 border-t">
                <div className="animate-pulse bg-gray-300 h-6 w-40 rounded mb-4"></div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="animate-pulse bg-gray-300 h-10 w-10 rounded-full"
                    ></div>
                  ))}
                </div>
              </div>

              <SkeletonAuthor />

              {/* Skeleton for comments section */}
              <div className="mt-12 pt-8 border-t">
                <div className="animate-pulse bg-gray-300 h-8 w-48 rounded mb-8"></div>
                <div className="bg-gray-50 p-6 rounded-xl mb-8">
                  <div className="animate-pulse bg-gray-300 h-6 w-40 rounded mb-4"></div>
                  <div className="animate-pulse bg-gray-300 h-32 w-full rounded mb-4"></div>
                  <div className="animate-pulse bg-gray-300 h-10 w-36 rounded"></div>
                </div>
              </div>

              {/* Skeleton for related posts */}
              <div className="mt-12">
                <div className="animate-pulse bg-gray-300 h-8 w-64 rounded mb-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="bg-white rounded-xl overflow-hidden shadow-md"
                    >
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
            </div>

            <SkeletonSidebar />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Không tìm thấy bài viết
          </h1>
          <p className="text-gray-600 mb-6">
            Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          <Link
            to="/blog"
            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition inline-block"
          >
            Quay lại trang blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[50vh] md:h-[60vh]">
        <img
          src={post.thumbnail}
          alt={post.title}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="container mx-auto">
            <div className="max-w-4xl">
              <span
                className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded mb-4 bg-emerald-100 text-emerald-800`}
              >
                {post.category?.name || ""}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center text-white/90 gap-4 md:gap-6">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-2" />
                  <span>{readTime}</span>
                </div>
                <div className="flex items-center">
                  <User size={16} className="mr-2" />
                  <span>{post.author?.name || "Admin"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-2/3">
            <div className="prose prose-lg max-w-none sun-editor-editable">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            <div className="mt-8 pt-8 border-t">
              <h3 className="text-lg font-semibold mb-4">Thẻ</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags &&
                  post.tags.map((tag, index) => (
                    <Link
                      key={index}
                      to={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700"
                    >
                      {tag}
                    </Link>
                  ))}
              </div>
            </div>

            <div className="mt-8 pt-8 border-t">
  <h3 className="text-lg font-semibold mb-4">Chia sẻ bài viết</h3>
  <div className="flex gap-2">
    {/* Nút Facebook */}
    <a 
      href="https://www.facebook.com/sharer/sharer.php?u=URL_BÀI_VIẾT_CỦA_BẠN" 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700"
    >
      <Facebook size={18} />
    </a>

    {/* Nút Twitter */}
    <a 
      href="https://twitter.com/intent/tweet?url=URL_BÀI_VIẾT_CỦA_BẠN&text=TIÊU_ĐỀ_BÀI_VIẾT" 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-10 h-10 flex items-center justify-center rounded-full bg-sky-500 text-white hover:bg-sky-600"
    >
      <Twitter size={18} />
    </a>

    {/* Nút Instagram - Lưu ý Instagram không hỗ trợ chia sẻ qua URL */}
    <a 
      href="https://www.instagram.com/" 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-pink-600"
    >
      <Instagram size={18} />
    </a>
  </div>
</div>

            <div className="mt-8 pt-8 border-t bg-gray-50 p-6 rounded-xl">
              <div className="flex items-start gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={post.author?.avatar || "/avatar-default.jpg"}
                    alt={post.author?.name || "Admin"}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold">
                    {post.author?.name || "Admin"}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {post.author?.role || "Tác giả"}
                  </p>
                  <p className="text-gray-700">
                    {post.author?.bio || "Tác giả Travel Vista"}
                  </p>
                </div>
              </div>
            </div>

            <CommentSection
              postId={post._id}
              showDeleteConfirm={showDeleteConfirm}
              handleDeleteComment={handleDeleteComment}
              cancelDelete={cancelDelete}
            />

            <RelatedPosts
              currentPostId={post._id}
              categoryId={post.category?._id}
            />
          </div>

          <div className="lg:w-1/3">
            <div className="sticky top-24">
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <div className="flex justify-between mb-6">
                  <button
                    className="flex items-center gap-2 text-gray-700 hover:text-emerald-600"
                    onClick={() => {
                      if (!isAuthenticated) {
                        Modal.confirm({
                          title: "Đăng nhập để lưu bài viết",
                          content: "Bạn cần đăng nhập để lưu bài viết này.",
                          icon: <LogIn />,
                          okText: "Đăng nhập ngay",
                          cancelText: "Đóng",
                          onOk() {
                            navigate("/auth/login");
                          },
                        });
                      }
                    }}
                  >
                  </button>
                  {/* <div className="flex flex-col items-center space-y-3 w-full max-w-xs"></div> */}
                  <h3 className="text-center text-lg font-semibold text-gray-800 leading-tight">
                    <br />Your favorites are our motivation !!! <br /> Thank you so much.
                  </h3>
                  <button
                    className={`flex flex-col items-center justify-center gap-1 w-20 h-20 rounded-full transition-all ${
                      post.userLiked
                        ? "text-white bg-gradient-to-b from-pink-400 to-red-500 shadow-lg"
                        : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                    }`}
                    onClick={handleLikeToggle}
                    disabled={
                      likeMutation.isPending || unlikeMutation.isPending
                    }
                  >
                    <Heart
                      size={24}
                      fill={post.userLiked ? "currentColor" : "none"}
                      className={post.userLiked ? "animate-bounce" : ""}
                    />
                    <span className="text-xs font-medium">{post.userLiked ? "Đã thích" : "Thích"}</span>
                      {post.likeCount > 0 && (
                    <span className={`absolute -top-1 -right-1 text-xs w-5 h-5 flex items-center justify-center rounded-full ${
                      post.userLiked 
                        ? "bg-white/30 text-white" 
                        : "bg-gray-300 text-gray-700"
                    }`}>
                      {post.likeCount}
                      </span>
                    )}
                  </button>
                </div>
                {!isAuthenticated && (
                  <div className="text-center text-sm text-gray-500 mb-4">
                    Đăng nhập để thích và lưu bài viết
                  </div>
                )}
                {/* <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition">
                  Khám phá tour Đông Nam Á
                </button> */}
              </div>

              {/* <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-bold mb-2">
                  Đăng ký nhận bản tin của chúng tôi
                </h3>
                <p className="text-gray-600 mb-4">
                  Nhận các mẹo du lịch mới nhất và hướng dẫn điểm đến trong hộp
                  thư của bạn.
                </p>
                <form>
                  <input
                    type="email"
                    placeholder="Địa chỉ email của bạn"
                    className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition"
                  >
                    Đăng ký
                  </button>
                </form>
              </div> */}

              <PopularCategories />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
