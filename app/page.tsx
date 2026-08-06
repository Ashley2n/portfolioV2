import HomePageFAQ from "@/components/ui/HomePageFAQ";
import HomepageHero from "@/components/ui/HomepageHero";
import HomePagePitch from "@/components/ui/HomePagePitch";
import HomePageProjects from "@/components/ui/HomePageProjects";
import HomePageTechStack from "@/components/ui/HomePageTechStack";

export default async function Home() {
  
  return (
    <main>
      <HomepageHero/>
      <div className="space-y-20">
        <HomePageProjects/>
        <HomePageTechStack/>
        <HomePageFAQ/>
        <HomePagePitch />
      </div>
    </main>
  );
}
