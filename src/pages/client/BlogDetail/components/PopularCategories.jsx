import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import categoryApi from "../../../../api/categoryApi";

const CategoriesSkeleton = () => (
  <div className="bg-white rounded-xl shadow-md p-6">
    <div className="animate-pulse bg-gray-300 h-6 w-48 rounded mb-4"></div>
    <ul className="space-y-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <li key={i} className="flex items-center justify-between">
          <div className="animate-pulse bg-gray-300 h-4 w-32 rounded"></div>
          <div className="animate-pulse bg-gray-300 h-6 w-8 rounded"></div>
        </li>
      ))}
    </ul>
  </div>
);

export default function PopularCategories() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["popularCategories"],
    queryFn: () => categoryApi.getCategories({ limit: 5 }),
  });

  const categories = data?.data || [];

  if (isLoading) {
    return <CategoriesSkeleton />;
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold mb-4">Danh mục phổ biến</h3>
        <div className="py-2 text-red-500">
          Không thể tải danh mục. Vui lòng thử lại sau.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-bold mb-4">Danh mục phổ biến</h3>

      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category._id}>
            <div
              to={`/blog/category/${category.slug}`}
              className="flex items-center justify-between hover:text-emerald-600"
            >
              <span>{category.name}</span>
              <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-0.5 rounded">
                {category.postCount}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
