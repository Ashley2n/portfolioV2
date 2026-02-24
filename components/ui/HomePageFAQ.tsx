import React from "react";

type HomePageFAQProps = {
  otherStyles?: string;
};

export default function HomePageFAQ({ otherStyles }: HomePageFAQProps) {
  return (
    <section className={`bg-neutral-900 h-100 ${otherStyles}`}>
      <div className="flex justify-center items-center h-full w-full">
        Freqently Asked Questions Section
      </div>
    </section>
  );
}
