import HomePagesHead from "@/components/homePagesHead/homePagesHead";
import HomePageShop from "@/components/homePageShop/homePageShop";
import HuntingBanner from "@/components/huntingBanner/hunting-banner";
import TopItems from "@/components/TopItems/TopItems";
import BrandLogos from "@/components/BrandLogos/BrandLogos";

const Home = () => {
  return (
    <div>
      <HomePagesHead />
      <TopItems />
      <HuntingBanner />
      {/* <div
        className="site-timer-container"
        style={{ position: "relative", zIndex: 20 }}
      ></div> */}
      {/* <Navbar/> */}
      <HomePageShop />
      <BrandLogos />
    </div>
  );
};

export default Home;
