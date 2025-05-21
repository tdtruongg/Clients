import { useState, useEffect } from "react";
import { MapPin, X, Search as SearchIcon, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MAX_RECENT_SEARCHES = 5;

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showRecentSearches, setShowRecentSearches] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  const saveRecentSearch = (term) => {
    const newSearches = [
      term,
      ...recentSearches.filter((item) => item !== term),
    ].slice(0, MAX_RECENT_SEARCHES);

    setRecentSearches(newSearches);
    localStorage.setItem("recentSearches", JSON.stringify(newSearches));
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      saveRecentSearch(searchTerm.trim());
      navigate(`/blog?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleRecentSearchClick = (term) => {
    setSearchTerm(term);
    saveRecentSearch(term);
    navigate(`/blog?search=${encodeURIComponent(term)}`);
  };

  const handleClearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-6 -mt-20 relative z-10 max-w-3xl mx-auto">
          <div className="flex items-end gap-4">
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
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setShowRecentSearches(true)}
                  onBlur={() =>
                    setTimeout(() => setShowRecentSearches(false), 200)
                  }
                />
                {searchTerm && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                    aria-label="Xóa tìm kiếm"
                  >
                    <X size={18} />
                  </button>
                )}

                {showRecentSearches &&
                  recentSearches.length > 0 &&
                  !searchTerm && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-100">
                        <span className="text-sm font-medium text-gray-700">
                          Tìm kiếm gần đây
                        </span>
                        <button
                          onClick={handleClearRecentSearches}
                          className="text-xs text-gray-500 hover:text-gray-700"
                        >
                          Xóa tất cả
                        </button>
                      </div>
                      <ul>
                        {recentSearches.map((term, index) => (
                          <li key={index}>
                            <button
                              className="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50"
                              onClick={() => handleRecentSearchClick(term)}
                            >
                              <Clock size={14} className="mr-2 text-gray-400" />
                              {term}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
            </div>

            <div>
              <button
                onClick={handleSearch}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition flex items-center gap-2"
              >
                <SearchIcon size={16} />
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Search;
