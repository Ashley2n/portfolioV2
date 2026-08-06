import React from "react";
import ContactMeButton from "./ContactMeButton";
type HomePagePitchProps = {
  otherStyles?: string;
};
export default function HomePagePitch({ otherStyles }: HomePagePitchProps) {

  const pitchBg = "/images/bg1.jpg"


  return (
    <section className={`  ${otherStyles} px-10 md:px-[10%] my-20`}>
      <div className="w-full flex flex-col items-center justify-center px-8 py-6 bg-cover bg-center bg-no-repeat gap-6  text-center rounded-2xl" style={{backgroundImage :`url(${pitchBg})`}}>
        <h1 className="text-2xl font-semibold">Let&apos;s build something great together. </h1>
        <p className="px-12 text-zinc-300 text-sm font-thin lg:w-1/2 mb-4">I&apos;m currently open to new opportunities and ready to collaborate. If you value clean architecture, clear communication, and a partner who cares about the product as much as you do, we should talk.</p>
        <ContactMeButton/>
      </div>
    </section>
  );
}
