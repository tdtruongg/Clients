import request from "./request";

export const postApi = {
  getPosts: (params) => {
    return request.get("/post", { params });
  },
  getPostById: (postId) => {
    return request.get(`/post/${postId}`);
  },
  getPostBySlug: (slug) => {
    return request.get(`/post/slug/${slug}`);
  },
  createPost: (data) => {
    return request.post("/post", data);
  },
  updatePost: (postId, data) => {
    return request.put(`/post/${postId}`, data);
  },
  deletePost: (postId) => {
    return request.delete(`/post/${postId}`);
  },
  likePost: (postId) => {
    return request.post(`/post/${postId}/like`);
  },
  unlikePost: (postId) => {
    return request.post(`/post/${postId}/unlike`);
  },
};

export default postApi;
