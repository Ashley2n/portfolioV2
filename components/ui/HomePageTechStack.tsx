import { TechStackType } from "@/app/types/types";
import { TechStackData } from "@/lib/contants";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type TechStackProp = {
  otherStyles?: string;
};

export default function HomePageTechStack({ otherStyles }: TechStackProp) {
return (
  <section className={`relative flex min-h-screen w-full py-24 md:py-32  overflow-hidden ${otherStyles}`}>
    <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
      <div className="mb-10 space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
          Technologies
        </p>

        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Tech Stack
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
        {TechStackData.map((item) => (
          <TechStackItem key={item.name} data={item} />
        ))}
      </div>
    </div>
  </section>
);
}

export function TechStackItem({ data }: { data: TechStackType }) {
 return (
    <Link href={data.externalURL} className="group">
      <li className="flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-300 hover:bg-white/[0.04]">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] transition-all duration-300 group-hover:border-white/20">
          <Image src={data.imageURL} alt={data.name} width={20} height={20} className="opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        <div className="flex-1">
          <p className="text-sm font-medium tracking-tight text-foreground">
            {data.name}
          </p>

          <p className="text-xs text-muted-foreground">
            {data.usage}
          </p>
        </div>

        <ArrowUpRight className="size-3.5 text-muted-foreground/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
      </li>
    </Link>
  );
}

// <div class="flex flex-col rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-4">?</div>
