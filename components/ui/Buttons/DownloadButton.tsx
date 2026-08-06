import { Download } from 'lucide-react'
import React from 'react'

export default function DownloadButton() {
  return (
    <button
  className="cursor-pointer backdrop-blur-sm border border-neutral-700 bg-gray-100/10 px-3 py-2 rounded-md text-white -tracking-wider shadow-xl animate-bounce duration-200 hover:animate-none"
>
    <Download/>
    </button>
  )
}
