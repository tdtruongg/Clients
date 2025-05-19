import request from "./request";

export const categoryApi = {
  getCategories: (params) => {
    return request.get("/category", { params });
  },
  createCategory: (data) => {
    return request.post("/category", data);
  },
  updateCategory: (categoryId, data) => {
    return request.put(`/category/${categoryId}`, data);
  },
  deleteCategory: (categoryId) => {
    return request.delete(`/category/${categoryId}`);
  },
};

export default categoryApi;
