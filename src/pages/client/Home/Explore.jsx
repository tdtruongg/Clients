import { useQuery } from "@tanstack/react-query";
import { Carousel, Spin } from "antd";
import categoryApi from "../../../api/categoryApi";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Explore = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["categories-explore"],
    queryFn: () => categoryApi.getCategories({ limit: 999 }),
  });

  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const carouselRef = useRef(null);
  const navigate = useNavigate();

  const carouselSettings = {
    className: "category-carousel",
    autoplaySpeed: 3000,
    swipeToSlide: true,
  };

  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.prev();
    }
  };

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/blog?category=${categoryId}`);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
          Phong cách du lịch đặc sắc
        </h2>

        <div className="carousel-container mx-auto relative max-w-[1200px] px-16">
          {isLoading ? (
            <div className="flex justify-center">
              <Spin size="large" tip="Đang tải..." />
            </div>
          ) : (
            <div className="relative">
              <div
                className="carousel-arrow carousel-arrow-prev z-20"
                onMouseEnter={() => setHoverPrev(true)}
                onMouseLeave={() => setHoverPrev(false)}
                onClick={handlePrev}
              >
                <div
                  className={`carousel-arrow-btn ${
                    hoverPrev ? "bg-black/80 shadow-lg" : ""
                  }`}
                >
                  <LeftOutlined />
                </div>
              </div>

              <div
                className="carousel-arrow carousel-arrow-next z-20"
                onMouseEnter={() => setHoverNext(true)}
                onMouseLeave={() => setHoverNext(false)}
                onClick={handleNext}
              >
                <div
                  className={`carousel-arrow-btn ${
                    hoverNext ? "bg-black/80 shadow-lg" : ""
                  }`}
                >
                  <RightOutlined />
                </div>
              </div>

              <Carousel
                ref={carouselRef}
                {...carouselSettings}
                arrows={false}
                autoplay
                dots={false}
                draggable
                slidesToShow={4}
                slidesToScroll={1}
                responsive={[
                  {
                    breakpoint: 1024,
                    settings: {
                      slidesToShow: 3,
                    },
                  },
                  {
                    breakpoint: 768,
                    settings: {
                      slidesToShow: 2,
                    },
                  },
                  {
                    breakpoint: 480,
                    settings: {
                      slidesToShow: 1,
                    },
                  },
                ]}
                className="mb-10"
              >
                {data?.data?.length > 0 ? (
                  data.data.map((category) => (
                    <div key={category._id} className="px-3">
                      <div
                        className="relative group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                        onClick={() => handleCategoryClick(category._id)}
                      >
                        <div className="relative h-60">
                          <img
                            src={category.image || "/phieu-luu.jpg"}
                            alt={category.name}
                            className="object-cover group-hover:scale-105 transition duration-300 w-full h-full"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        </div>
                        <div className="absolute bottom-0 left-0 p-4 w-full">
                          <h3 className="text-xl font-bold text-white mb-1">
                            {category.name}
                          </h3>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="px-3">
                      <div
                        className="relative group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                        onClick={() => navigate("/blog")}
                      >
                        <div className="relative h-60">
                          <img
                            src="/phieu-luu.jpg"
                            alt="Du lịch phiêu lưu"
                            className="object-cover group-hover:scale-105 transition duration-300 w-full h-full"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        </div>
                        <div className="absolute bottom-0 left-0 p-4 w-full">
                          <h3 className="text-xl font-bold text-white mb-1">
                            Phiêu lưu
                          </h3>
                        </div>
                      </div>
                    </div>

                    <div className="px-3">
                      <div
                        className="relative group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                        onClick={() => navigate("/blog")}
                      >
                        <div className="relative h-60">
                          <img
                            src="/bai-bien.jpg"
                            alt="Kỳ nghỉ biển"
                            className="object-cover group-hover:scale-105 transition duration-300 w-full h-full"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        </div>
                        <div className="absolute bottom-0 left-0 p-4 w-full">
                          <h3 className="text-xl font-bold text-white mb-1">
                            Bãi biển
                          </h3>
                        </div>
                      </div>
                    </div>

                    <div className="px-3">
                      <div
                        className="relative group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                        onClick={() => navigate("/blog")}
                      >
                        <div className="relative h-60">
                          <img
                            src="/van-hoa.jpg"
                            alt="Du lịch văn hóa"
                            className="object-cover group-hover:scale-105 transition duration-300 w-full h-full"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        </div>
                        <div className="absolute bottom-0 left-0 p-4 w-full">
                          <h3 className="text-xl font-bold text-white mb-1">
                            Văn hóa
                          </h3>
                        </div>
                      </div>
                    </div>

                    <div className="px-3">
                      <div
                        className="relative group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                        onClick={() => navigate("/blog")}
                      >
                        <div className="relative h-60">
                          <img
                            src="/am-thuc.png"
                            alt="Du lịch ẩm thực"
                            className="object-cover group-hover:scale-105 transition duration-300 w-full h-full"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        </div>
                        <div className="absolute bottom-0 left-0 p-4 w-full">
                          <h3 className="text-xl font-bold text-white mb-1">
                            Ẩm thực
                          </h3>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </Carousel>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Explore;
