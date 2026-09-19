import Image from "next/image";
import { TopMarquee } from "./Home/TopMarquee";
import { BannerSection } from "./Home/BannerSection";

import Navbar from "./shared/Navbar";
import { SlotsGames } from "./Games/Slotsgames";
import { PokerGames } from "./Games/PokerGames";
import { CasinoGames } from "./Games/CasinoGames";
import { FishingGames } from "./Games/FishingGames";
import { LotteryGames } from "./Games/LotteryGames";
import BottomNavMenu from "./shared/BottomNavMenu";
import SocialSideVar from "./shared/SocialSideVar";
import Footer from "./shared/Footer";
import Categoris from "./Home/Categoris";
import { HotGames } from "./Games/HotGames";
import LiveCasino from "./Games/LiveCasino";


export default function Home() {
  return (
    <div className="lg:hidden ">
      <Navbar />
      <div className=" bg-[#1b1b1b]">
        <BannerSection />
        <TopMarquee />
        <Categoris />
        <HotGames />
        <SlotsGames />
        <PokerGames />
        <FishingGames />
        <CasinoGames />
        <LiveCasino />

        {/* <LotteryGames /> */}

      </div>
      <BottomNavMenu />
      <SocialSideVar />
      <Footer />
    </div>
  );
}
