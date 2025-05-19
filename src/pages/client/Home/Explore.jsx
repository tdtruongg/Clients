const Explore = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
          Phong cách du lịch đặc sắc
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="relative group rounded-xl overflow-hidden shadow-md">
            <div className="relative h-60">
              <img
                src="/phieu-luu.jpg"
                alt="Du lịch phiêu lưu"
                className="object-cover group-hover:scale-105 transition duration-300 w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>
            <div className="absolute bottom-0 left-0 p-4 w-full">
              <h3 className="text-xl font-bold text-white mb-1">Phiêu lưu</h3>
              {/* <p className="text-sm text-gray-200">42 điểm đến</p> */}
            </div>
          </div>

          <div className="relative group rounded-xl overflow-hidden shadow-md">
            <div className="relative h-60">
              <img
                src="/bai-bien.jpg"
                alt="Kỳ nghỉ biển"
                className="object-cover group-hover:scale-105 transition duration-300 w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>
            <div className="absolute bottom-0 left-0 p-4 w-full">
              <h3 className="text-xl font-bold text-white mb-1">Bãi biển</h3>
              {/* <p className="text-sm text-gray-200">36 điểm đến</p> */}
            </div>
          </div>

          <div className="relative group rounded-xl overflow-hidden shadow-md">
            <div className="relative h-60">
              <img
                src="/van-hoa.jpg"
                alt="Du lịch văn hóa"
                className="object-cover group-hover:scale-105 transition duration-300 w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>
            <div className="absolute bottom-0 left-0 p-4 w-full">
              <h3 className="text-xl font-bold text-white mb-1">Văn hóa</h3>
              {/* <p className="text-sm text-gray-200">28 điểm đến</p> */}
            </div>
          </div>

          <div className="relative group rounded-xl overflow-hidden shadow-md">
            <div className="relative h-60">
              <img
                src="/am-thuc.png"
                alt="Du lịch ẩm thực"
                className="object-cover group-hover:scale-105 transition duration-300 w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>
            <div className="absolute bottom-0 left-0 p-4 w-full">
              <h3 className="text-xl font-bold text-white mb-1">Ẩm thực</h3>
              {/* <p className="text-sm text-gray-200">23 điểm đến</p> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Explore;
