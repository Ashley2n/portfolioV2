import { AboutCardListing } from "@/components/ui/AboutCardListing";
import { AboutMeCardItem } from "@/components/ui/AboutMeCardItem";
import HomePagePitch from "@/components/ui/HomePagePitch";

export default function AboutPage() {
  return (
    <div>
      <AboutMeCardItem />
      <AboutCardListing />
      <HomePagePitch/>
    </div>
  );
}
