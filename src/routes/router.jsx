import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout/AppLayout";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Home from "../pages/client/Home/Home";
import Blog from "../pages/client/Blog/Blog";
import About from "../pages/client/About/About";
import Login from "../pages/client/Login/Login";
import Register from "../pages/client/Register/Register";
import BlogDetail from "../pages/client/BlogDetail/BlogDetail";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import Dashboard from "../pages/admin/Dashboard/Dashboard";
import Users from "../pages/admin/Users/Users";
import Categories from "../pages/admin/Categories/Categories";
import Blogs from "../pages/admin/Blogs/Blogs";
import PostForm from "../pages/admin/Blogs/PostForm";
import { AdminRoute } from "../components/PrivateRoute";
import Unauthorized from "../pages/client/Unauthorized/Unauthorized";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/blog",
            element: <Blog />,
          },
          {
            path: "/blog/:slug",
            element: <BlogDetail />,
          },
          {
            path: "/about",
            element: <About />,
          },

          {
            path: "/auth",
            element: <AuthLayout />,
            children: [
              {
                path: "login",
                element: <Login />,
              },
              {
                path: "register",
                element: <Register />,
              },
            ],
          },
        ],
      },
      {
        path: "/admin",
        element: <AdminRoute />,
        children: [
          {
            path: "",
            element: <AdminLayout />,
            children: [
              {
                path: "",
                element: <Dashboard />,
              },
              {
                path: "users",
                element: <Users />,
              },
              {
                path: "categories",
                element: <Categories />,
              },
              {
                path: "blogs",
                element: <Blogs />,
              },
              {
                path: "blogs/create",
                element: <PostForm />,
              },
              {
                path: "blogs/:id/edit",
                element: <PostForm />,
              },
            ],
          },
        ],
      },
      {
        path: "/unauthorized",
        element: <Unauthorized />,
      },
    ],
  },
]);

export default router;
