import Banner from "./Banner";
import Search from "./Search";
import Destinations from "./Destinations";
import Blog from "./Blog";
import Explore from "./Explore";
import NewsLetter from "./NewsLetter";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Banner />
      <Search />
      <Destinations />
      <Blog />
      <Explore />
      <NewsLetter />
    </div>
  );
}
