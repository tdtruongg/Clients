import request from "./request";

export const commentApi = {
  // Get comments from a post (OLD METHOD)
  getComments: (postId, params) => {
    return request.get(`/post/${postId}/comments`, { params });
  },

  // Get comments from the dedicated comments endpoint
  getCommentsByPost: (postId, params) => {
    return request.get(`/comment/post/${postId}`, { params });
  },

  addComment: (data) => {
    return request.post("/comment", data);
  },

  deleteComment: (commentId) => {
    return request.delete(`/comment/${commentId}`);
  },

  // Reply to a comment
  addReply: (commentId, data) => {
    return request.post(`/comment/${commentId}/replies`, data);
  },

  // Delete a reply
  deleteReply: (commentId, replyId) => {
    return request.delete(`/comment/${commentId}/replies/${replyId}`);
  },
};

export default commentApi;
