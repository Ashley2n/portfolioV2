import { TechStackType } from "@/app/types/types";
import { TechStackData } from "@/lib/contants";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type TechStackProp = {
  otherStyles?: string;
};

const image1 = "/images/placeholderProjectImage.jpg";

export default function HomePageTechStack({ otherStyles }: TechStackProp) {
  return (
    <section
      className={`min-h-screen flex justify-center items-center h-full ${otherStyles}`}
    >
      <div className="flex flex-col items-center justify-center w-full h-full">
        <h3 className="title">Tech Stack</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 ld:grid-cols-3 gap-5 mt-10">
          {TechStackData.map((item) => (
            <TechStackItem key={item.name} data={item} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export function TechStackItem({ data }: { data: TechStackType }) {
  return (
    <Link href={data.externalURL} target="_blank">
      <li className="flex items-center group border border-neutral-800/80 bg-zinc-900 p-4 rounded-md gap-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg shadow-neutral-900 cursor-pointer w-90 lg:w-130 ">
        <div className="bg-neutral-300 p-3.5 h-fit w-fit rounded-md flex-1">
          <Image src={data.imageURL} alt={data.name} width={32} height={16} />
        </div>
        <div className="flex-5 lg:flex-10">
          <h3 className=" subtitle">{data.name}</h3>
          <p className="text-gray-500 text-sm">{data.usage}</p>
        </div>

        <ArrowRight className="group-hover:animate-bounce2 flex-1" />
      </li>
    </Link>
  );
}

// <div class="flex flex-col rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-4">?</div>
