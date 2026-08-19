'use client';
import {projectData} from "@/lib/contants";
import {ProjectCard} from "./Cards/ProjectCard";
import {motion, Variants} from "framer-motion";
import {useMemo} from "react";
type ProjectListCardsProps = {
    value: string;
};
export const ProjectListCards = ({value} : ProjectListCardsProps) => {
    
    const listVariants: Variants = {
        hidden: {},
        show: {transition: {staggerChildren: 0.08}},
    };

    const itemVariants: Variants = {
        hidden: {opacity: 0, y: 16},
        show: {opacity: 1, y: 0, transition: {duration: 0.4, ease: [0.22, 1, 0.36, 1]}},
    };

    const filteredProjects = useMemo(() => {
        return projectData.filter((p) =>
            p.title.toLowerCase().includes(value.toLowerCase())
        );
    }, [value]);
    return (
        <motion.ul
            initial="hidden"
            animate="show"
            viewport={{once: false, amount: 0.2}}
            variants={listVariants}
            className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((data) => (
                <motion.li key={data.title} variants={itemVariants}>
                    <ProjectCard item={data} />
                </motion.li>
            ))}
        </motion.ul>
    );
};
