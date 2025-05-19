import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import { useNavigate } from 'react-router-dom';


const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  

  // Giả lập danh sách bài viết - trong thực tế bạn sẽ lấy từ API hoặc database
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const articles = [
    { id: 1, "title": "Hà Nội – Thủ đô ngàn năm văn hiến với sự kết hợp hài hòa giữa truyền thống và hiện đại", 
              "slug": "ha-noi-thu-do-ngan-nam-van-hien-voi-su-ket-hop-hai-hoa-giua-truyen-thong-va-hien-dai"
    },
    { id: 2, "title": "THÀNH PHỐ HỒ CHÍ MINH - METROPOLIS NĂNG ĐỘNG GIỮA LÒNG VIỆT NAM" ,
              "slug": "thanh-pho-ho-chi-minh-metropolis-nang-dong-giua-long-viet-nam"
    },
    { id: 3, "title": "Đà Nẵng - Thành phố đáng sống bên bờ biển miền Trung" ,
              "slug": "da-nang-thanh-pho-dang-song-ben-bo-bien-mien-trung"
    },
    { id: 4, "title": "Hải Phòng - Thành phố Cảng Xinh Đẹp Với Bản Sắc Văn Hóa Độc Đáo"	 ,
              "slug": "hai-phong-thanh-pho-cang-xinh-dep-voi-ban-sac-van-hoa-doc-dao"
    },
    { id: 5, "title": "Phú Quốc – Hòn Đảo Ngọc Rực Rỡ Giữa Biển Khơi"	 ,
              "slug": "phu-quoc-hon-dao-ngoc-ruc-ro-giua-bien-khoi"
    },
    { id: 6, "title": "Singapore – Viên Ngọc Hiện Đại Của Đông Nam Á"	 ,
              "slug": "singapore-vien-ngoc-hien-dai-cua-dong-nam-a"
    },
    { id: 7, "title": "Hà Nội - Mê Cung Di Sản: Hành Trình Xuyên Thế Kỷ Từ Phố Cổ Đến Phồn Hoa"	, 
              "slug": "ha-noi-me-cung-di-san:-hanh-trinh-xuyen-the-ky-tu-pho-co-den-phon-hoa"
    },
    { id: 8, "title": "Bắc Ninh - Cái Nôi Của Văn Hóa Quan Họ Và Di Sản Dân Gian Đặc Sắc"	 ,
              "slug": "bac-ninh-cai-noi-cua-van-hoa-quan-ho-va-di-san-dan-gian-dac-sac"
    },
    { id: 9, "title": "Cao Bằng – Vùng Đất Non Nước Hùng Vĩ Và Bản Sắc Văn Hóa Dân Tộc"	, 
              "slug": "cao-bang-vung-dat-non-nuoc-hung-vi-va-ban-sac-van-hoa-dan-toc"
    },
    { id: 10, "title": "Sa Pa – Nét Quyến Rũ Mộc Mạc Giữa Chốn Mây Ngàn"	 ,
              "slug": "sa-pa-net-quyen-ru-moc-mac-giua-chon-may-ngan"
    },
    { id: 11, "title": "Hà Giang Trong Tôi – Hành Trình Của Tuổi Trẻ Và Tự Do"	 ,
              "slug": "ha-giang-trong-toi-hanh-trinh-cua-tuoi-tre-va-tu-do"
    },
  ];

  // Hàm tìm kiếm và lọc gợi ý
  useEffect(() => {
    if (searchTerm && searchTerm.length > 0) {
      const filteredSuggestions = articles.filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  // Hàm xử lý khi chọn một gợi ý
  const handleSuggestionClick = (article) => {
    setSearchTerm(article.title);
    setShowSuggestions(false);
    navigate(`/blog/${article.slug}`);
  };

// {Array.isArray(suggestions) && suggestions.length > 0 && (
//   <ul className="suggestions-list">
//     {suggestions.map((article) =>
//       article ? (
//         <li key={article.id} onClick={() => handleSuggestionClick(article)}>
//           {article.title}
//         </li>
//       ) : null
//     )}
//   </ul>
// )}



const handleSearch = () => {
  if (suggestions.length > 0) {
    navigate(`/blog/${suggestions[0].slug}`);
  } else {
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  }
};

// Thêm onClick cho nút:
<button onClick={handleSearch} className="...">
  Tìm kiếm
</button>

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-6 -mt-20 relative z-10 max-w-3xl mx-auto">
          <div className="flex items-end gap-4">
            {/* Điểm đến */}
            <div className="flex-grow relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Điểm đến
              </label>
              <div className="relative">
                <MapPin
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Bạn muốn đi đâu?"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => {
                    if (suggestions.length > 0) setShowSuggestions(true);
                  }}
                  onBlur={() => {
                    // Trì hoãn ẩn gợi ý để người dùng có thể click vào gợi ý
                    setTimeout(() => setShowSuggestions(false), 200);
                  }}
                />
              </div>
              
              {/* Danh sách gợi ý */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <ul>
                    {suggestions.map((article) => (
                      <li 
                        key={article.id}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSuggestionClick(article)}
                      >
                        {article.title}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {/* Nút tìm kiếm */}
            <div>
              {/* <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition"> */}
                {/* Tìm kiếm */}
              {/* </button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Search;