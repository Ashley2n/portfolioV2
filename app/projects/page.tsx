import { Search } from "lucide-react";
import Image from "next/image";
import React from "react";

const projectData = 
[
  {
    title: "Movie API",
    image: "/blackPlaceholder.png",
    skill: 
    [
      "Java",
      "React",
      "Tailwind",
    ],
    url:"#"
  },
  {
    title: "Stock App",
    image: "/blackPlaceholder.png",
    skill: 
    [
      "C#",
      ".Net",
      "CSS",
      "HTML"
    ],
    url:"#"
  },
  {
    title: "Student Management System",
    image: "/blackPlaceholder.png",
    skill: 
    [
      "Python",
      "Flask",
      "HTML",
      "CSS"
    ],
    url:"#"
  },
]

export default function page() {
  return (
    <main>
      <div className=" h-full md:px-20 px-10 py-10">
        <div
        className="flex flex-row items-center gap-5 justify-between">
          <h2>Projects Page</h2>

          <div
          className="w-fit max-w-sm min-w-[200px] relative ">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="text-sm border border-slate-200 rounded-md pl-3 pr-10 py-2 transition duration-300 ease focus:outline-none focus:border-neutral-700 hover:border-slate-300 shadow-sm focus:shadow "
              />
              <button
                className="absolute right-1 top-1 rounded bg-neutral-800 p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-neutral-700 focus:shadow-none active:bg-neutral-700 hover:bg-neutral-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Project Section */}
        <div>
            <ul
            className="flex gap-4 w-full h-full flex-wrap">
              {projectData.map(data => 
                <li key={data.title}
                className="my-5">
                  <div
                  className="bg-neutral-900 rounded-lg w-80 max-h-130 overflow-hidden h-115">
                      <Image src={data.image} alt={`${data.title}'s Image`} width={320} height={100}
                      className="rounded-t-lg"/>
                      <div
                    className="p-5 text-wrap overflow-hidden">
                      <h3
                      className="text-xl font-bold overflow-hidden">{data.title}</h3>

                      <div 
                      className="flex gap-3 wrap-normal flex-wrap mt-2">
                        {data.skill.map(s => 
                          <p
                          className="bg-neutral-200 w-fit text-sm px-2   text-neutral-900 rounded-2xl">{s}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </li>

              )}
            </ul>
          </div>

          {/* Tech stack Section */}
          {/* Make Tech Stack a Modal next to the Search bar */}
      </div>
    </main>
  );
}
