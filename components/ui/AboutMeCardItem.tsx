import Image from "next/image";
import ContactMeButton from "./ContactMeButton";

export const AboutMeCardItem = () => {
  return (
    <section className="h-fill w-full pt-30 px-10 md:px-[10%]">
      <div className=" BBG flex flex-col items-center mb-18 w-full h-120 rounded-2xl bg-no-repeat bg-cover bg-center "
      style={{backgroundImage: "url(/images/blackPlaceHolder.png)"}}>
        

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-50 rounded-2xl" />
        <div className=" absolute bottom-0 text-center space-y-1 mx-auto z-60 pb-10">
          <h2 className="title text-4xl! mb-0!">Ashley Abongwa</h2>
          <p className=" text-neutral-300/90">Software Developer</p>
          <p className=" text-neutral-300/90 mb-4">Iowa</p>

          <ContactMeButton/>
          
        </div>
      </div>
    </section>
  );
};
