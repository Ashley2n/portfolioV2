import { ProjectCardType } from "@/app/types/types";
import { truncatedText } from "@/utils/helper";
import Image from "next/image";

const defaultImage = "/images/placeholderProjectImage2.jpg";

export const ProjectCard = ({ item }: { item: ProjectCardType }) => {
  return (
    <div className="group min-h-[200px] h-full min-w-90 w-100 md:w-130 lg:w-100 xl:w-125 hover:cursor-pointer pb-8 One mx-auto">
      <div className="bg-neutral-400 overflow-hidden relative rounded-t-xl h-70">
        <Image
          width={425}
          height={100}
          src={item.imageUrl ? ("/images"+item.imageUrl) : defaultImage}
          alt={item.title}
          className=" w-full object-cover  transform rotate-8 translate-x-10 shadow-2xl shadow-amber-500 duration-500 transition-transform group-hover:scale-105"
        />
      </div>
      <div className=" p-5 text-left BBG  rounded-b-2xl">
        <h3 className=" text-2xl text-neutral-100 font-bold group-hover:text-neutral-400 duration-300">
          {item.title}
        </h3>
        <p className="text-xs mt-2 text-neutral-400 text-nowrap overflow-clip w-full">
          {truncatedText({ text: item.subtext, maxWords: 7 })}
        </p>
        <ul className="flex gap-3 wrap-normal flex-wrap mt-2">
          {item.skills.map((s, index) => (
            <li
              key={index}
              style={{
                backgroundColor: s.color + "50",
                borderColor: s.color + "BF",
              }}
              className={
                " w-fit text-xs font-semibold px-2 py-1  text-neutral-100 rounded-lg flex flex-row gap-2 items-center border " +
                ``
              }
            >
              <span>
                <Image
                  src={s.imageUrl ? s.imageUrl : defaultImage}
                  alt={s.name}
                  height={20}
                  width={20}
                />
              </span>
              <p>{s.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
