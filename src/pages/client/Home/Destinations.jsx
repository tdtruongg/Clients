import { MapPin, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Destinations = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            {/* Điểm đến phổ biến */}
          </h2>
          <Link
            to="/destinations"
            className="flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
          >
            {/* Xem tất cả <ChevronRight size={16} /> */}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
            <div className="relative h-64">
              <img
                src="/thien-duong-nhiet-doi.jpg"
                alt="Bali, Indonesia"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center mb-2">
                <MapPin size={16} className="text-emerald-600 mr-1" />
                <span className="text-sm text-gray-500">Bali, Indonesia</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Thiên đường nhiệt đới</h3>
              <p className="text-gray-600 mb-4">
                Khám phá những bãi biển nguyên sơ, ruộng bậc thang xanh mướt và
                trải nghiệm văn hóa sôi động.
              </p>
              <Link
                to="/destinations/bali"
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                {/* Khám phá điểm đến */}
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
            <div className="relative h-64">
              <img
                src="/giac-mo-dia-trung-hai.png"
                alt="Bali, Indonesia"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center mb-2">
                <MapPin size={16} className="text-emerald-600 mr-1" />
                <span className="text-sm text-gray-500">Santorini, Hy Lạp</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Giấc mơ Địa Trung Hải</h3>
              <p className="text-gray-600 mb-4">
                Trải nghiệm hoàng hôn tuyệt đẹp, những tòa nhà trắng tinh và làn
                nước trong vắt.
              </p>
              <Link
                to="/destinations/santorini"
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                {/* Khám phá điểm đến */}
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
            <div className="relative h-64">
              <img
                src="/kien-truc-huyen-thoai-cua-den-byodoin.jpg"
                alt="Bali, Indonesia"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center mb-2">
                <MapPin size={16} className="text-emerald-600 mr-1" />
                <span className="text-sm text-gray-500">Kyoto, Nhật Bản</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Di sản văn hóa cổ đại</h3>
              <p className="text-gray-600 mb-4">
                Đắm mình trong những ngôi đền truyền thống, khu vườn tuyệt đẹp
                và khu phố lịch sử.
              </p>
              <Link
                to="/destinations/kyoto"
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                {/* Khám phá điểm đến */}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Destinations;
