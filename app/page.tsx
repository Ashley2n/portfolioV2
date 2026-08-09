import HomePageFAQ from "@/components/ui/HomePageFAQ";
import HomepageHero from "@/components/ui/HomepageHero";
import HomePagePitch from "@/components/ui/HomePagePitch";
import HomePageProjects from "@/components/ui/HomePageProjects";
import HomePageTechStack from "@/components/ui/HomePageTechStack";

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
