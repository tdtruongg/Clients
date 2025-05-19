import { useState } from "react";
import { Search, Menu, X, User, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import useProfile from "../../hook/useProfile";
import useAuth from "../../hook/useAuth";

export default function Header() {
  const { profile } = useProfile();
  const { isAuthenticated, onLogout } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const isActive = (path) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 transition-all duration-300 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-emerald-600">
            TravelVista
          </Link>
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2">
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className={`font-medium ${
              isActive("/")
                ? "text-emerald-600"
                : "text-gray-900 hover:text-emerald-600"
            }`}
          
          >
            Trang chủ
          </Link>
          <Link
            to="/blog"
            className={`font-medium ${
              isActive("/blog")
                ? "text-emerald-600"
                : "text-gray-600 hover:text-emerald-600"
            }`}
          >
            Blog
          </Link>
          <Link
            to="/about"
            className={`font-medium ${
              isActive("/about")
                ? "text-emerald-600"
                : "text-gray-600 hover:text-emerald-600"
            }`}
          >
            Giới thiệu
          </Link>
          </nav>
          </div>
          <Link
            to="/destinations"
            className={`font-medium ${
              isActive("/destinations")
                ? "text-emerald-600"
                : "text-gray-600 hover:text-emerald-600"
            }`}
          >
            {/* Điểm đến */}
          </Link>
          <Link
            to="/guides"
            className={`font-medium ${
              isActive("/guides")
                ? "text-emerald-600"
                : "text-gray-600 hover:text-emerald-600"
            }`}
          >
            {/* Hướng dẫn du lịch */}
          </Link>
          <Link
            to="/tips"
            className={`font-medium ${
              isActive("/tips")
                ? "text-emerald-600"
                : "text-gray-600 hover:text-emerald-600"
            }`}
          >
            {/* Mẹo du lịch */}
          </Link>
          <Link
            to="/blog"
            className={`font-medium ${
              isActive("/blog")
                ? "text-emerald-600"
                : "text-gray-600 hover:text-emerald-600"
            }`}
          >
            {/* Blog */}
          </Link>
          <Link
            to="/about"
            className={`font-medium ${
              isActive("/about")
                ? "text-emerald-600"
                : "text-gray-600 hover:text-emerald-600"
            }`}
          >
            {/* Giới thiệu */}
          </Link>

        <div className="flex items-center space-x-4">
          

          <div className="hidden md:block relative">
            <button
              onClick={toggleUserMenu}
              className="flex items-center justify-center gap-1 px-3 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-emerald-100 hover:text-emerald-600"
            >
              <User size={18} />
              <ChevronDown size={16} />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
                {isAuthenticated ? (
                  <>
                    <div className="px-4 mb-2">
                      <p className="font-semibold">{profile?.name}</p>
                      <p className="text-sm text-gray-500">{profile?.email}</p>
                    </div>

                    {profile?.role === "ADMIN" && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-emerald-600 cursor-pointer"
                        onClick={toggleUserMenu}
                      >
                        Trang quản trị
                      </Link>
                    )}

                    <p
                      onClick={onLogout}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-emerald-600 cursor-pointer"
                    >
                      Đăng xuất
                    </p>
                  </>
                ) : (
                  <>
                    <Link
                      to="/auth/login"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-emerald-600"
                      onClick={toggleUserMenu}
                    >
                      Đăng nhập
                    </Link>
                    <Link
                      to="/auth/register"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-emerald-600"
                      onClick={toggleUserMenu}
                    >
                      Tạo tài khoản
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-600"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className={`py-2 font-medium ${
                  isActive("/") ? "text-emerald-600" : "text-gray-900"
                }`}
                onClick={toggleMenu}
              >
                Trang chủ
              </Link>
              <Link
                to="/destinations"
                className={`py-2 font-medium ${
                  isActive("/destinations")
                    ? "text-emerald-600"
                    : "text-gray-600"
                }`}
                onClick={toggleMenu}
              >
                Điểm đến
              </Link>
              <Link
                to="/guides"
                className={`py-2 font-medium ${
                  isActive("/guides") ? "text-emerald-600" : "text-gray-600"
                }`}
                onClick={toggleMenu}
              >
                Hướng dẫn du lịch
              </Link>
              <Link
                to="/tips"
                className={`py-2 font-medium ${
                  isActive("/tips") ? "text-emerald-600" : "text-gray-600"
                }`}
                onClick={toggleMenu}
              >
                Mẹo du lịch
              </Link>
              <Link
                to="/blog"
                className={`py-2 font-medium ${
                  isActive("/blog") ? "text-emerald-600" : "text-gray-600"
                }`}
                onClick={toggleMenu}
              >
                Blog
              </Link>
              <Link
                to="/about"
                className={`py-2 font-medium ${
                  isActive("/about") ? "text-emerald-600" : "text-gray-600"
                }`}
                onClick={toggleMenu}
              >
                Giới thiệu
              </Link>
              <div className="border-t border-gray-100 pt-4 mt-2">
                {isAuthenticated ? (
                  <>
                    {profile?.role === "ADMIN" && (
                      <Link
                        to="/admin"
                        className="block py-2 text-gray-600 hover:text-emerald-600"
                        onClick={toggleMenu}
                      >
                        Trang quản trị
                      </Link>
                    )}
                    <p
                      onClick={() => {
                        onLogout();
                        toggleMenu();
                      }}
                      className="block py-2 text-gray-600 hover:text-emerald-600 cursor-pointer"
                    >
                      Đăng xuất
                    </p>
                  </>
                ) : (
                  <>
                    <Link
                      to="/auth/login"
                      className="block py-2 text-gray-600 hover:text-emerald-600"
                      onClick={toggleMenu}
                    >
                      Đăng nhập
                    </Link>
                    <Link
                      to="/auth/register"
                      className="block py-2 text-gray-600 hover:text-emerald-600"
                      onClick={toggleMenu}
                    >
                      Tạo tài khoản
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
