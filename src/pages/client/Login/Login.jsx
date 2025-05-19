import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import useAuth from "../../../hook/useAuth";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import request from "../../../api/request";
import { message } from "antd";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const { setToken } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginMutation = useMutation({
    mutationFn: (data) => request.post("/auth/login", data),
    onSuccess: (data) => {
      setToken(data.token);
      message.success("Đăng nhập thành công!");

      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    },
    onError: (error) => {
      console.error("Login error:", error);
      message.error(
        "Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin tài khoản."
      );
    },
  });

  const onSubmit = (data) => {
    loginMutation.mutate(data);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <div className="md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <h1 className="text-2xl font-bold text-emerald-600">
                TravelVista
              </h1>
            </Link>
            <h2 className="text-2xl font-bold mt-6 mb-2">Chào mừng trở lại</h2>
            <p className="text-gray-600">
              Đăng nhập để tiếp tục hành trình của bạn
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Địa chỉ email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  id="email"
                  type="email"
                  placeholder="Nhập email của bạn"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  {...register("email", {
                    required: "Vui lòng nhập địa chỉ email",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Địa chỉ email không hợp lệ",
                    },
                  })}
                />
              </div>

              {errors?.email?.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors?.email.message}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mật khẩu
                </label>
              </div>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu của bạn"
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  {...register("password", {
                    required: "Vui lòng nhập mật khẩu",
                  })}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {errors?.password?.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors?.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition flex items-center justify-center"
            >
              {loginMutation.isPending ? "Đang xử lý..." : "Đăng nhập"}
              {!loginMutation.isPending && (
                <ArrowRight size={16} className="ml-2" />
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              <Link
                href="/auth/register"
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden md:block md:w-1/2 bg-emerald-600 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/90 to-emerald-600/70 flex items-center justify-center p-12">
          <div className="max-w-md text-white">
            <h2 className="text-3xl font-bold mb-4">
              Tiếp tục cuộc phiêu lưu của bạn
            </h2>
            <p className="mb-6">
              Đăng nhập để truy cập các điểm đến đã lưu, kế hoạch du lịch và kết
              nối với cộng đồng những người khám phá của chúng tôi.
            </p>
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
              <div className="flex items-start mb-4">
                <div className="mr-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-lg">❝</span>
                  </div>
                </div>
                <div>
                  <p className="italic mb-3">
                    TravelVista đã giúp tôi khám phá những điểm ẩn tuyệt vời ở
                    Nhật Bản mà tôi không bao giờ có thể tự tìm thấy. Hướng dẫn
                    của họ chi tiết và chân thực!
                  </p>
                  <p className="font-medium">
                    - Maria S., Người đam mê du lịch
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}