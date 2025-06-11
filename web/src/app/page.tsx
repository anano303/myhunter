import HomePagesHead from "@/components/homePagesHead/homePagesHead";
import HomePageShop from "@/components/homePageShop/homePageShop";
import HuntingBanner from "@/components/huntingBanner/hunting-banner";
// import Navbar from "@/components/navbar/navbar";
import TopItems from "@/components/TopItems/TopItems";
const Home = () => {
  return (
    <div>
      <HomePagesHead />
      <TopItems />
      <HuntingBanner />
      <div
        className="site-timer-container"
        style={{ position: "relative", zIndex: 20 }}
      ></div>
      {/* <Navbar/> */}
      <HomePageShop />
    </div>
  );
};

export default Home;
