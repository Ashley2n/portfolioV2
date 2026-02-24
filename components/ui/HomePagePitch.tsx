import React from "react";
type HomePagePitchProps = {
  otherStyles?: string;
};
export default function HomePagePitch({ otherStyles }: HomePagePitchProps) {
  return (
    <section className={`bg-neutral-900 h-100 ${otherStyles}`}>
      <div className="h-full w-full flex items-center justify-center">
        HomePagePitch
      </div>
    </section>
  );
}
