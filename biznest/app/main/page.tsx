import Banner from "@/components/home/banner";
import MissionSection from "@/components/home/mission-section";
import NewsSection from "@/components/home/news-section";
import { PopularPrograms } from "@/components/home/popular-programs";
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
