import HomePageFAQ from "@/components/ui/HomePageFAQ";
import HomepageHero from "@/components/ui/HomepageHero";
import HomePagePitch from "@/components/ui/HomePagePitch";
import HomePageProjects from "@/components/ui/HomePageProjects";
import HomePageTechStack from "@/components/ui/HomePageTechStack";

export default function Home() {
  return (
    <main>
      <div className="min-h-screen p-8 pb-20 sm:p-20 space-y-10">
        <HomepageHero/>
        <HomePageProjects/>
        <HomePageTechStack/>
        <HomePageFAQ/>
        <HomePagePitch />
      </div>
    </main>
  );
}
