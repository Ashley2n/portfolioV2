import { footerLinks } from '@/utils/types/navigation'
import { icons } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

// TODO:
//  [ ]: Simpler design to links
//        - On hover color should change to original color and revert to white/gray

//  [ ]: Links should redirect user in a new tab rather and on their tab


export default function footer() {
  return (
    <footer>
        <div className='flex justify-between flex-col items-center gap-4 border-t-1 border-t-neutral-700 mx-8  md:flex-row md:mx-20 px-1 text-center py-4'>
            <div
            className=' mt-4 md:mt-0'>
            <Link href={'/'}
            className='font-bold italic text-2xl'> Aa</Link>
            </div>

            <p
            className='font-light text-neutral-500 text-sm'
            >@ 2025 Not Copyright Yet</p>

            <ul 
            className='flex gap-5'>
            {footerLinks.map((link) => (
                <li key={link.path} 
                className='bg-neutral-300 rounded-sm px-1 py-1'>
                    <a href={link.path} target='_blank'>
                        <Image src={link.icon} alt={link.label} width={20} height={10} title={link.label}/>
                    </a>
                </li>
            ))}
            </ul>

        </div>
    </footer>
  )
}
