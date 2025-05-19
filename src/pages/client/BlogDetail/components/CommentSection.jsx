import { Trash2, Send, LogIn } from "lucide-react";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import commentApi from "../../../../api/commentApi";
import Pagination from "../../../../components/Pagination";
import dayjs from "dayjs";
import useProfile from "../../../../hook/useProfile";
import useAuth from "../../../../hook/useAuth";
import { Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { queryClient } from "../../../../main";

const CommentSectionSkeleton = () => (
  <div className="mt-12 pt-8 border-t">
    <div className="animate-pulse bg-gray-300 h-8 w-48 rounded mb-8"></div>

    <div className="bg-gray-50 p-6 rounded-xl mb-8">
      <div className="animate-pulse bg-gray-300 h-6 w-40 rounded mb-4"></div>
      <div className="animate-pulse bg-gray-300 h-32 w-full rounded mb-4"></div>
      <div className="animate-pulse bg-gray-300 h-10 w-36 rounded"></div>
    </div>

    <div className="space-y-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border-b pb-8 last:border-b-0">
          <div className="flex items-start gap-4">
            <div className="animate-pulse bg-gray-300 h-12 w-12 rounded-full flex-shrink-0"></div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <div className="animate-pulse bg-gray-300 h-5 w-32 rounded"></div>
                <div className="animate-pulse bg-gray-300 h-4 w-24 rounded"></div>
              </div>
              <div className="animate-pulse bg-gray-300 h-4 w-full rounded mb-1"></div>
              <div className="animate-pulse bg-gray-300 h-4 w-11/12 rounded mb-1"></div>
              <div className="animate-pulse bg-gray-300 h-4 w-3/4 rounded mb-3"></div>
              <div className="animate-pulse bg-gray-300 h-6 w-16 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function CommentSection({ postId }) {
  const [commentText, setCommentText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const { profile } = useProfile();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const currentUserId = profile?._id;

  const { data: commentsData, isLoading: isLoadingComments } = useQuery({
    queryKey: ["comments", postId, currentPage, pageSize],
    queryFn: () =>
      commentApi.getCommentsByPost(postId, {
        page: currentPage,
        limit: pageSize,
      }),
    enabled: !!postId,
  });

  const comments = commentsData?.data || [];
  const pagination = commentsData?.pagination || {
    total: 0,
    page: 1,
    limit: pageSize,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
  };

  const addCommentMutation = useMutation({
    mutationFn: (data) => commentApi.addComment(data),
    onSuccess: () => {
      setCommentText("");
      setCurrentPage(1);
      queryClient.invalidateQueries(["comments", postId]);
      message.success("Thêm bình luận thành công");
    },
    onError: (error) => {
      console.error("Error adding comment:", error);
      message.error("Không thể thêm bình luận. Vui lòng thử lại sau.");
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId) => commentApi.deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", postId]);
      message.success("Xóa bình luận thành công");
    },
    onError: (error) => {
      console.error("Error deleting comment:", error);
      message.error("Không thể xóa bình luận. Vui lòng thử lại sau.");
    },
  });

  const handleSubmitComment = (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      message.info("Vui lòng đăng nhập để bình luận");
      return;
    }

    if (!commentText.trim()) {
      return;
    }

    addCommentMutation.mutate({
      postId,
      content: commentText,
    });
  };

  const showDeleteConfirmModal = (commentId) => {
    Modal.confirm({
      title: "Xóa bình luận",
      icon: <ExclamationCircleOutlined />,
      content:
        "Bạn có chắc chắn muốn xóa bình luận này? Hành động này không thể hoàn tác.",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        deleteCommentMutation.mutate(commentId);
      },
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoadingComments) {
    return <CommentSectionSkeleton />;
  }

  return (
    <div className="mt-12 pt-8 border-t">
      <h3 className="text-2xl font-bold mb-8">
        Bình luận ({pagination.total || 0})
      </h3>

      <div className="bg-gray-50 p-6 rounded-xl mb-8">
        <h4 className="text-lg font-semibold mb-4">Để lại bình luận</h4>
        {isAuthenticated ? (
          <form onSubmit={handleSubmitComment}>
            <div className="mb-4">
              <textarea
                rows={4}
                placeholder="Chia sẻ suy nghĩ của bạn..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={addCommentMutation.isLoading}
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition flex items-center gap-2"
            >
              {addCommentMutation.isLoading ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Đang đăng...</span>
                </>
              ) : (
                <>
                  <Send size={16} />
                  <span>Đăng bình luận</span>
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-600 mb-4">
              Vui lòng đăng nhập để bình luận
            </p>
            <button
              onClick={() => navigate("/auth/login")}
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition inline-flex items-center gap-2"
            >
              <LogIn size={16} />
              <span>Đăng nhập</span>
            </button>
          </div>
        )}
      </div>

      <div className="space-y-8">
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment._id || comment.id}
              className="border-b pb-8 last:border-b-0"
            >
              <div className="flex items-start gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={comment.user?.avatar || "/avatar-default.jpg"}
                    alt={comment.user?.name || "User"}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold">
                        {comment.user?.name || "Anonymous"}
                      </h4>
                      {comment.user?._id === currentUserId && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
                          Bạn
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">
                      {comment.createdAt
                        ? dayjs(comment.createdAt).format("DD/MM/YYYY")
                        : comment.date}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3">{comment.content}</p>
                  <div className="flex items-center gap-4">
                    {(comment.user?._id === currentUserId ||
                      profile?.role === "ADMIN") && (
                      <button
                        onClick={() =>
                          showDeleteConfirmModal(comment._id || comment.id)
                        }
                        className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                        <span>Xóa</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
          </div>
        )}
      </div>

      {pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
