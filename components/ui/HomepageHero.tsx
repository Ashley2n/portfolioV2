import ActionButton from "./actionButton";

export default function HomepageHero() {
  return (
    <div>
      <div className="flex justify h-[80vh] md:h-[70vh] lg:h-[60vh] py-5  justify-center">
        <div className="flex flex-col items-center justify-end  ">
          <h2 className="text-7xl font-extrabold text-center lg:text-wrap mb-16">
            Software Developer
          </h2>

          <ActionButton title="Contact Me" />
        </div>
      </div>
    </div>
  );
}
