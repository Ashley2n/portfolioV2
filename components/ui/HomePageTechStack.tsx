import React from "react";

type TechStackProp = {
  otherStyles?: string;
};

export default function HomePageTechStack({ otherStyles }: TechStackProp) {
  return (
    <section className={`bg-neutral-900 h-100 ${otherStyles}`}>
      <div className="flex items-center justify-center w-full h-full">
        Tech Stack Section
      </div>
    </section>
  );
}
