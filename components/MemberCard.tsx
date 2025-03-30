import Image from "next/image";
import Link from "next/link"

interface MemberCardProps {
   image: string;
   name: string;
   jobTitle: string;
   linkedinUrl: string;
   twitterUrl: string;
}


const MemberCard = ({ image, name, jobTitle, linkedinUrl, twitterUrl }: MemberCardProps) => {
   return (
      <div>
         <div className="relative flex flex-col mt-6 bg-gradient-to-b from-indigo-500 to-purple-600 text-white shadow-md bg-clip-border rounded-xl">
            <div
               className="relative mx-2 md:mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40 h-fit w-fit">
               <Image
                  height={300}
                  width={300}
                  src={image}
                  alt={name} />
            </div>
            <div className="p-4 md:p-6 flex flex-col gap-4">
               <h5 className="font-bold text-xl">
                  {name}
               </h5>
               <p className='text-gray-200'>{jobTitle}</p>
            <div className="flex text-xs gap-4">
               <Link href={linkedinUrl} className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300">
                  LinkedIn
               </Link>
               <Link href={twitterUrl} className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300">
                  Twitter
               </Link>
            </div>
            </div>
         </div>
      </div>
   )
}

export default MemberCard