import Link from "next/link";
import { JSX } from "react";

export default function Footer(): JSX.Element {
   return (
      <footer className="bg-gray-900 text-white py-8">
         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            <div>
               <h3 className="text-lg font-semibold mb-4">AwesomeCo</h3>
               <p className="text-gray-400">
                  Building innovative solutions for a better tomorrow.
               </p>
            </div>

            <div>
               <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
               <ul className="space-y-2">
                  <li>
                     <Link href="/" className="text-gray-400 hover:text-indigo-300 transition">
                        Home
                     </Link>
                  </li>
                  <li>
                     <Link href="/about" className="text-gray-400 hover:text-indigo-300 transition">
                        About
                     </Link>
                  </li>
               </ul>
            </div>

            <div>
               <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
               <p className="text-gray-400">Email: hello@awesomeco.com</p>
               <p className="text-gray-400">Phone: (123) 456-7890</p>
            </div>
         </div>
         <div className="text-center text-gray-500 mt-6">
            © {new Date().getFullYear()} AwesomeCo. All rights reserved.
         </div>
      </footer>
   );
}