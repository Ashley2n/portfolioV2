import { ProjectCardType } from "@/app/types/types";
import { HomePagePorjectData } from "@/lib/contants";
import { truncatedText } from "@/utils/helper";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface HPProjectsProps {
  otherStyles?: string;
}

export default function HomePageProjects({ otherStyles }: HPProjectsProps) {
  return (
    <section className={`${otherStyles} w-full py-24 md:py-32`}>
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.2em] text-white/40">
              Selected work
            </p>

            <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
              Recent projects
            </h2>
          </div>

          <Link
            href="/projects"
            className="group hidden items-center gap-2 text-sm text-white/60 transition-colors hover:text-white md:flex"
          >
            View all
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {HomePagePorjectData.map((item) => (
            <li key={item.title}>
              <Cards item={item} />
            </li>
          ))}
        </ul>

        <Link
          href="/projects"
          className="group mt-8 flex items-center gap-2 text-sm text-white/60 md:hidden"
        >
          View all
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </section>
  );
}

const Cards = ({ item }: { item: ProjectCardType }) => {
  return (
    <Link href={item.githubUrl} className="group block overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-white/5">
        <Image
          fill
          src={
            item.imageUrl
              ? `/images${item.imageUrl}`
              : "/images/placeholderProjectImage2.jpg"
          }
          alt={item.title}
          className="object-cover translate-y-2 scale-105 transition-transform duration-700 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:scale-110 rotate-8 translate-x-10 shadow-2xl shadow-amber-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <div className="pt-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-medium tracking-tight text-white transition-colors duration-300 group-hover:text-white/70">
            {item.title}
          </h3>

          <ArrowUpRight
            size={18}
            className="shrink-0 -translate-x-1 translate-y-1 text-white/30 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
          />
        </div>

        <p className="mt-2 max-w-md text-sm leading-relaxed text-white/40">
          {truncatedText({ text: item.subtext, maxWords: 10 })}
        </p>
      </div>
    </Link>
  );
};

// const Cards = ({item}: {item:ProjectCardType}) => {
//   return (
//     <div
//               key={item.title}
//               className="group min-h-[200px] h-full min-w-[200px] w-70 lg:w-100  hover:cursor-pointer pb-8 One"
//             >
//               <Link href={item.githubUrl} target="_blank">
//                 <div className="bg-neutral-400 overflow-hidden relative rounded-md h-70">
//                   <Image
//                     width={425}
//                     height={100}
//                     src={
//                       item.imageUrl
//                         ? "/images" + item.imageUrl
//                         : "/images/placeholderProjectImage2.jpg"
//                     }
//                     alt="Project Image 1"
//                     className=" w-full object-cover  transform rotate-8 translate-x-10 shadow-2xl shadow-amber-500 duration-500 transition-transform group-hover:scale-105"
//                   />
//                 </div>

//                 <div className=" pt-5 text-left rounded-b-xl">
//                   <h3 className=" text-2xl text-neutral-100 font-bold group-hover:text-neutral-400 duration-300">
//                     {item.title}
//                   </h3>
//                   <p className="text-sm mt-2 text-neutral-400 ">
//                     {truncatedText({ text: item.subtext, maxWords: 6 })}
//                   </p>
//                 </div>
//               </Link>
//             </div>
//   )
// }
