import { Search } from 'lucide-react'
import React from 'react'

export const ProjectsHeader = () => {
  return (
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
  )
}
