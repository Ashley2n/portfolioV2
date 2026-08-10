import { ProjectCardType } from "@/app/types/types";
import { truncatedText } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";

const defaultImage = "/images/placeholderProjectImage2.jpg";

export const ProjectCard = ({ item }: { item: ProjectCardType }) => {
  return (
    <Link
      href={item.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-white/5">
        <Image
          fill
          src={item.imageUrl ? `/images${item.imageUrl}` : defaultImage}
          alt={item.title}
          className="object-cover translate-y-2 scale-105 transition-transform duration-700 ease-out group-hover:translate-y-0 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <div className="pt-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-medium tracking-tight text-foreground transition-colors duration-300 group-hover:text-text-muted">
            {item.title}
          </h3>
        </div>

        <p className="mt-2 text-sm leading-relaxed text-text-faint">
          {truncatedText({ text: item.subtext, maxWords: 12 })}
        </p>

        <ul className="mt-3 flex flex-wrap gap-2">
          {item.skills.map((s, index) => (
            <li
              key={index}
              style={{ borderColor: `${s.color}40` }}
              className="flex items-center gap-1.5 rounded-lg border bg-surface-chip px-2 py-1 text-xs text-text-muted transition-colors duration-300 hover:bg-surface-chip-hover"
            >
              <Image
                src={s.imageUrl ? s.imageUrl : defaultImage}
                alt={s.name}
                height={14}
                width={14}
              />
              <span>{s.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
};
