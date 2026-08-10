'use client'
import { ProjectListCards } from "@/components/ui/ProjectListCards";
import { ProjectsHeader } from "@/components/ui/ProjectsHeader";
import {useState} from "react";

export default function ProjectSection() {

    const [value, setValue] = useState("");
    return (
        <div className="page-shell">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
                <div>
                    <p className="mb-2 text-sm uppercase tracking-[0.2em] text-text-faint">
                        Portfolio
                    </p>

                    <h1 className="title">
                        All projects
                    </h1>
                </div>

                <ProjectsHeader value={value} setValue={setValue} />
            </div>

            <ProjectListCards value={value} />

            {/* Tech stack Section */}
            {/* Make Tech Stack a Modal next to the Search bar */}
        </div>
    );
}
