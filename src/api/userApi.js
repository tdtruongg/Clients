import request from "./request";

export const userApi = {
  getUsers: (params) => {
    return request.get("/user", { params });
  },
  deleteUser: (userId) => {
    return request.delete(`/user/${userId}`);
  },
  getMostActiveLikers: (params) => {
    return request.get("/like/most-active", { params });
  },
  getMostActiveCommenters: (params) => {
    return request.get("/comment/most-active", { params });
  },
};

export default userApi;
