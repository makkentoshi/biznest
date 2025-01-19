import Banner from "@/components/main-components/banner";
import MissionSection from "@/components/main-components/mission-section";
import NewsSection from "@/components/main-components/news-section";
import { PopularPrograms } from "@/components/main-components/popular-programs";
import PriceSection from "@/components/main-components/price-section";
import Image from "next/image";

export default function MainPage() {
  return (
    <main className="">
      <Banner />
      <MissionSection />
      <PopularPrograms />
      <NewsSection></NewsSection>
     
    </main>
  );
}
