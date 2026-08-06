import { AboutCardListing } from "@/components/ui/AboutCardListing";
import { AboutMeCardItem } from "@/components/ui/AboutMeCardItem";
import HomePagePitch from "@/components/ui/HomePagePitch";

export default function page() {
  return (
    <div className="space-y-50">
      <AboutMeCardItem />
      <AboutCardListing />
      <HomePagePitch/>
    </div>
  );
}
