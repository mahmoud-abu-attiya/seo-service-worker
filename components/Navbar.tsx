'use client';

import Link from 'next/link';
import { JSX, useState } from 'react';

export default function Navbar(): JSX.Element {
   const [isOpen, setIsOpen] = useState(false);

   return (
      <nav className="bg-indigo-900 text-white py-2 px-4 sticky top-0 z-50 shadow-lg">
         <div className="max-w-6xl mx-auto md:flex justify-between items-center">
            <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold tracking-wide hover:text-indigo-300 transition">
               AwesomeCo
            </Link>
            <button
               className="md:hidden focus:outline-none"
               onClick={() => setIsOpen(!isOpen)}
               aria-label="Toggle menu"
            >
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth="2"
                     d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                  />
               </svg>
            </button>
            </div>
            <div className={`flex items-center gap-6 md:flex ${isOpen ? 'block' : 'hidden'}`}>
               <Link href="/" className="block py-2 md:py-0 hover:text-indigo-300 transition">
                  Home
               </Link>
               <Link href="/about" className="block py-2 md:py-0 hover:text-indigo-300 transition">
                  About
               </Link>
            </div>
         </div>
      </nav>
   );
}