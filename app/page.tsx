import HomePageFAQ from "@/components/ui/Homepage/HomePageFAQ";
import HomepageHero from "@/components/ui/Homepage/HomepageHero";
import HomePagePitch from "@/components/ui/Homepage/HomePagePitch";
import HomePageProjects from "@/components/ui/Homepage/HomePageProjects";
import HomePageTechStack from "@/components/ui/Homepage/HomePageTechStack";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Hero",
    description: "Full-stack developer recent graduate in Software Development — background, interests, and skills.",
};

export default async function Home() {
  
  return (
    <main>
      <HomepageHero/>
      <HomePageProjects otherStyles="snap-section"/>
      <HomePageTechStack otherStyles="snap-section"/>
      <HomePageFAQ otherStyles="snap-section"/>
      <HomePagePitch otherStyles="snap-section"/>
    </main>
  );
}
