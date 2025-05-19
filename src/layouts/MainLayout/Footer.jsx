import {
  MapPin,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">TravelVista</h3>
            <p className="text-gray-400 mb-4">
              Truyền cảm hứng cho chuyến phiêu lưu tiếp theo của bạn với hướng
              dẫn du lịch chuyên nghiệp, mẹo và đề xuất điểm đến.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-600 transition"
              >
                <span className="sr-only">Facebook</span>
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-600 transition"
              >
                <span className="sr-only">Instagram</span>
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-600 transition"
              >
                <span className="sr-only">Twitter</span>
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-600 transition"
              >
                <span className="sr-only">YouTube</span>
                <Youtube size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Điểm đến</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-400">Tây Bắc</span>
              </li>
              <li>
                <span className="text-gray-400">Đông Bắc</span>
              </li>
              <li>
                <span className="text-gray-400">Biển Đảo</span>
              </li>
              <li>
                <span className="text-gray-400">Bắc Bộ</span>
              </li>
              <li>
                <span className="text-gray-400">Nam Bộ</span>
              </li>
              <li>
                <span className="text-gray-400">Quốc Tế</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Place Recommend</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-400 hover:text-emerald-400 transition">
                  Northwest
                </span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-emerald-400 transition">
                  Northeast
                </span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-emerald-400 transition">
                  Sea and Islands
                </span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-emerald-400 transition">
                  Northern Vietnam
                </span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-emerald-400 transition">
                  South Vietnam
                </span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-emerald-400 transition">
                  International
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">
              Liên hệ với chúng tôi
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin
                  className="text-emerald-400 mt-1 mr-3 flex-shrink-0"
                  size={18}
                />
                <span className="text-gray-400">Thanh Xuân, Hà Nội</span>
              </li>
              <li className="flex items-start">
                <Mail
                  className="text-emerald-400 mt-1 mr-3 flex-shrink-0"
                  size={18}
                />
                <a
                  href="mailto:hello@travelvista.com"
                  className="text-gray-400 hover:text-emerald-400 transition"
                >
                  truongtrinhdac03@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} TravelVista. Đã đăng ký bản quyền.
          </p>
        </div>
      </div>
    </footer>
  );
}
