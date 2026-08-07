import { footerLinks } from "@/utils/types/navigation";
import { icons } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// TODO:
//  [ ]: Simpler design to links
//        - On hover color should change to original color and revert to white/gray

//  [ ]: Links should redirect user in a new tab rather and on their tab

export default function footer() {
  return (
    <footer className="w-full border-t border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8">
        <div className="flex flex-row gap-2 items-center justify-between">
          <Link
            href="/"
            className="font-bold italic text-2xl tracking-tight text-foreground"
          >
            Aa
          </Link>

          <p className="text-sm font-light text-neutral-500">
            © 2026 Not Copyright Yet
          </p>
        </div>

        <ul className="flex items-center gap-3">
          {footerLinks.map((link) => {
            const Icon = link.icon;

            return (
              <li key={link.path}>
                <a
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] transition-all duration-300 hover:bg-white/[0.06]"
                >
                  <Icon
                    className={`size-4 text-neutral-500 transition-colors duration-300 ${link.color}`}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
