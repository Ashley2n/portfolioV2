import Image from "next/image";
import { projectData } from "@/lib/contants";
import { ProjectCard } from "./ProjectCard";
export const ProjectListCards = () => {
  return (
    <ul className="grid grid-cols-1 lg:grid-cols-2 w-full h-full mt-8">
      {projectData.map((data) => (
          <ProjectCard item={data} key={data.title}/>
      ))}
    </ul>
  );
};
