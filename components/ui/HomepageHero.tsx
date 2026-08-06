import LightRays from "../Backgrounds/LightRays";
import ContactMeButton from "./ContactMeButton";

export default function HomepageHero() {
  return (
    <div className=" min-h-screen h-full w-full relative mb-30">
      <div className="-z-60 ">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={0.5}
          lightSpread={0.7}
          rayLength={2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.14}
          distortion={0}
          className="custom-rays"
          pulsating
          fadeDistance={1.3}
          saturation={1}
        />
      </div>
      <div className="absolute bottom-25 left-[8%] sm:left-[15%] md:left-[25%] lg:left-[4%] xl:left-[16%] z-10 text-center">
        <h2 className=" text-7xl lg:text-[5.3rem]  text-wrap lg:text-nowrap mb-16 font-titan ">
          SOFTWARE <span className="block lg:inline">DEVELOPER </span>
        </h2>

        {/* <ActionButton title="Contact Me" /> */}
        <div className="flex flex-row w-full justify-center">
          <ContactMeButton />
        </div>
      </div>
    </div>
  );
}

// lex justify h-[80vh] md:h-[70vh] lg:h-[60vh] py-5  justify-center
