import { ProjectListCards } from "@/components/ui/ProjectListCards";
import { ProjectsHeader } from "@/components/ui/ProjectsHeader";

export default function page() {
  return (
    <div className=" py-10 h-fill w-full pt-30 px-10 md:px-[10%]">
      <div className="flex flex-row items-center gap-5 justify-between">
        <h2 className="text-2xl font-bold">Projects Page</h2>

        <ProjectsHeader />
      </div>

      {/* Project Section */}
      <ProjectListCards />

      {/* Tech stack Section */}
      {/* Make Tech Stack a Modal next to the Search bar */}
    </div>
  );
}
