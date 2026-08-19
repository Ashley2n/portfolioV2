import { AboutCardListing } from "@/components/ui/AboutCardListing";
import { AboutMeCardItem } from "@/components/ui/Cards/AboutMeCardItem";
import HomePagePitch from "@/components/ui/Homepage/HomePagePitch";
import {Metadata} from "next";
// app/about/page.tsx
export const metadata: Metadata = {
    title: "About",
    description: "Full-stack developer recent graduate in Software Development — background, interests, and skills.",
};
export default function AboutPage() {
  return (
    <div>
      <AboutMeCardItem />
      <AboutCardListing />
      <HomePagePitch/>
    </div>
  );
}
