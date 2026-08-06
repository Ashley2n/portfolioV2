import { Mail } from 'lucide-react'
import React from 'react'



export const FromInput = () => {
  return (
    <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <Mail className="w-4 h-4 " color="#9f9fa9" />
          </div>
          <input
            type="text"
            id="input-group-1"
            className="block w-full ps-9 pe-3 py-2.5 bg-zinc-900 border border-zinc-500 text-heading text-sm rounded-lg focus:ring-zinc-300 focus:border-zinc-300 shadow-xs placeholder:text-zinc-400"
            placeholder="name@example.com"
          />
        </div>
  )
}
