const Banner = () => {
  return (
    <section className="relative h-[600px] overflow-hidden">
      <img
        src="/home-banner.jpeg"
        alt="Phong cảnh núi non tuyệt đẹp với hồ nước"
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Khám phá vẻ đẹp của thế giới
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Khám phá những điểm đến tuyệt vời, hướng dẫn du lịch và mẹo cho
              chuyến phiêu lưu tiếp theo của bạn
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {/* <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition">
                Khám phá điểm đến
              </button>
              <button className="px-6 py-3 bg-white hover:bg-gray-100 text-emerald-600 font-medium rounded-lg transition">
                Đọc hướng dẫn du lịch
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
