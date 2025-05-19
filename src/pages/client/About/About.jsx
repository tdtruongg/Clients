export default function About() {
  return (
    <div className="bg-white text-gray-800 py-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-emerald-600 mb-2">Giới thiệu bản thân</h1>
          <p className="text-lg text-gray-600">Khám phá hành trình, đam mê và định hướng của tôi</p>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Avatar */}
          <div className="w-40 h-40 rounded-full overflow-hidden shadow-md border-4 border-emerald-600">
            <img
              src="/avatar-default.jpg"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thông tin */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-4">Xin chào! Mình là Truong Trinh</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Là một người yêu thích công nghệ, mình luôn tìm kiếm cơ hội để học hỏi, sáng tạo và kết nối với cộng đồng. Trang web này là nơi mình chia sẻ những trải nghiệm sống, hành trình khám phá và những kiến thức mình tích lũy được qua thời gian.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Bên cạnh việc viết blog, mình còn đam mê lập trình, thiết kế giao diện web, nhiếp ảnh và khám phá những vùng đất mới – nơi chứa đựng vô vàn câu chuyện thú vị đang chờ được kể lại.
            </p>
          </div>
        </div>

        {/* Thông tin bổ sung */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-emerald-50 p-6 rounded-xl shadow">
            <h3 className="text-xl font-bold text-emerald-600">Kỹ năng</h3>
            <p className="text-gray-600 mt-2">Viết blog sáng tạo, tạo nội dung số, tiếng Anh giao tiếp tốt, ứng dụng AI trong tự động hóa.</p>
          </div>
          <div className="bg-emerald-50 p-6 rounded-xl shadow">
            <h3 className="text-xl font-bold text-emerald-600">Sở thích</h3>
            <p className="text-gray-600 mt-2">Du lịch trải nghiệm, nhiếp ảnh đời thường, đọc sách phát triển bản thân, chơi thể thao.</p>
          </div>
          <div className="bg-emerald-50 p-6 rounded-xl shadow">
            <h3 className="text-xl font-bold text-emerald-600">Liên hệ</h3>
            <p className="text-gray-600 mt-2">Email: truongtrinhdac03@gmail.com<br />Rất vui được kết nối và trò chuyện cùng bạn!</p>
          </div>
        </div>

        {/* Chứng chỉ & Bằng khen */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center text-emerald-600 mb-6">Chứng chỉ & Bằng khen</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {["cert1.jpg", "cert2.jpg", "award1.jpg"].map((src, index) => (
              <div key={index} className="overflow-hidden rounded-xl shadow hover:shadow-lg transition duration-300 ease-in-out">
                <img
                  src={`/certificates/${src}`}
                  alt={`Chứng chỉ ${index + 1}`}
                  className="w-full h-60 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
