import React from "react";
import Image1 from "../../public/images/placeholderProjectImage2.jpg";

interface HPProjectsProps {
  otherStyles?: string;
}

export default function HomePageProjects({ otherStyles }: HPProjectsProps) {
  return (
    <section className={`bg-neutral-900 h-full ${otherStyles}`}>
      <div className="w-full h-full flex flex-col gap-10 justify-center items-center text-center">
        <h2>
          Recent <span>Projects</span>
        </h2>

        <div className="group min-h-[200px] min-w-[425px]  hover:cursor-pointer">
          <div className="bg-neutral-400 overflow-hidden relative rounded-t-3xl h-70">
            <img
              src="/images/placeholderProjectImage2.jpg"
              alt="Project Image 1"
              className=" w-full object-cover  transform rotate-8 translate-x-10 shadow-2xl shadow-amber-500 duration-500 transition-transform group-hover:scale-105"
            />
            </div>
            {/* <div className='bg-cover bg-center bg-no-repeat h-100 hover:[&_h3]:text-amber-500' style={{backgroundImage: 'url(/images/placeholderProjectImage2.jpg)'}}> */}
            <div className=" bg-neutral-800 p-5 text-left ">
              <h3 className=" text-2xl text-neutral-100 font-bold group-hover:text-amber-500 duration-300">
                Instagram Redesign
              </h3>
              <p className="text-sm mt-2 text-neutral-400 ">
                Remake of what instagrams could look like...
              </p>
            </div>
        </div>
      </div>
    </section>
  );
}
