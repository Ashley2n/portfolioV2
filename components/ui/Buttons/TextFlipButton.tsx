import { TextFlipButtonProps } from '@/app/types/types'
import React from 'react'



export default function TextFlipButton({text } : TextFlipButtonProps) {
  return (
    <button
  className="cursor-pointer bg-neutral-300 backdrop-blur-md shadow-4 hover:shadow-5 transition transform duration-500 ease-in-out shadow-neutral-400 px-6 py-3 rounded-xl border-[1px] border-neutral-500 font-medium group"
>
  <div className="relative overflow-hidden">
    <p
      className="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] text-neutral-800 font-semibold text-sm"
    >
      {text ? text : "Button"}
    </p>
    <p
      className="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]  text-neutral-800 font-semibold text-sm"
    >
      {text ? text : "Button"}
    </p>
  </div>
</button>
  )
}
