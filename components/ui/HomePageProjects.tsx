import { HomePagePorjectData } from "@/lib/contants";
import { truncatedText } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";

interface HPProjectsProps {
  otherStyles?: string;
}

export default function HomePageProjects({ otherStyles }: HPProjectsProps) {
  return (
    <section
      className={` h-full ${otherStyles} min-h-screen flex justify-center items-center `}
    >
      <div className="w-full h-full flex flex-col gap-10 justify-center items-center text-center">
        <h2 className="title">
          Recent <span>Projects</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {HomePagePorjectData.map((item) => (
            <div
              key={item.title}
              className="group min-h-[200px] h-full min-w-[425px] w-90 lg:w-130  hover:cursor-pointer pb-8 One"
            >
              <Link href={item.githubUrl} target="_blank">
              <div className="bg-neutral-400 overflow-hidden relative rounded-t-xl h-70">
                <Image
                  width={425}
                  height={100}
                  src={
                    item.imageUrl
                      ? "/images" + item.imageUrl
                      : "/images/placeholderProjectImage2.jpg"
                  }
                  alt="Project Image 1"
                  className=" w-full object-cover  transform rotate-8 translate-x-10 shadow-2xl shadow-amber-500 duration-500 transition-transform group-hover:scale-105"
                />
              </div>
              {/* <div className='bg-cover bg-center bg-no-repeat h-100 hover:[&_h3]:text-amber-500' style={{backgroundImage: 'url(/images/placeholderProjectImage2.jpg)'}}> */}
              <div className=" bg-neutral-900 p-5 text-left rounded-b-xl">
                <h3 className=" text-2xl text-neutral-100 font-bold group-hover:text-neutral-400 duration-300">
                  {item.title}
                </h3>
                <p className="text-sm mt-2 text-neutral-400 ">
                  {truncatedText({ text: item.subtext, maxWords: 8 })}
                </p>
              </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
