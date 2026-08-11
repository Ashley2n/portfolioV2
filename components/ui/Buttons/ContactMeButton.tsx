import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export type ContactMeButtonProps = {
  otherStyles?: string,

}

export default function ContactMeButton({otherStyles} : ContactMeButtonProps) {

  return (
  <div className="relative group">
    <Link
      href={"/contact/"}
      className={ otherStyles + " relative inline-block  font-semibold leading- bg-neutral-800 shadow-2xl cursor-pointer rounded-md hover:shadow-zinc-700 transition-all duration-500 ease-in-out hover:scale-105 active:scale-95 text-neutral-800 text-sm"}
    >
      

      <span className="relative z-10 block px-6 py-3 rounded-md bg-gray-100">
        <div className="relative z-10 flex items-center space-x-2">
          <span className="transition-all duration-500 group-hover:translate-x-1"
            > Contact Me</span
          >
          <ArrowRight color='#262626' className='transform transition-all group-hover:translate-x-1.5 duration-700'/>

        </div>
      </span>
    </Link>
  </div>

  )
}
            {/* className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1" */}
