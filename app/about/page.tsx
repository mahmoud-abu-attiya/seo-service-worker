import MemberCard from '@/components/MemberCard';
import { Metadata } from 'next';
import { JSX } from 'react';

const teamMembers = [
   {
      name: "Alice Johnson",
      jobTitle: "CEO",
      image: "/images/team/ceo.webp",
      linkedinUrl: "#",
      twitterUrl: "#"
   },
   {
      name: "Bob Smith",
      jobTitle: "Lead Developer",
      image: "/images/team/lead-developer.webp",
      linkedinUrl: "#",
      twitterUrl: "#"
   },
   {
      name: "Catherine Lee",
      jobTitle: "Project Manager",
      image: "/images/team/project-manager.webp",
      linkedinUrl: "#",
      twitterUrl: "#"
   },
]

export const metadata: Metadata = {
   title: 'About Us | AwesomeCo',
   description: 'Learn more about our mission to deliver amazing services and solutions.',
   openGraph: {
      title: 'About Us | AwesomeCo',
      description: 'Discover our story and what drives us to excellence.',
      url: 'https://seo-service-worker.vercel.app/about',
      images: ['/images/logo.webp'],
   },
   twitter: {
      card: 'summary_large_image',
      title: 'About Us | AwesomeCo',
      description: 'Discover our story and what drives us to excellence.',
   },
};

export default function About(): JSX.Element {
   return (
      <div className="max-w-5xl mx-auto p-4 md:p-6 mb-6">
         <section className='grid md:grid-cols-2 gap-8 py-20'>
            <h1 className='text-5xl md:text-6xl font-bold'>Discover Our <span className="text-indigo-700">Journey</span> and Values</h1>
            <p>AwesomeCo was founded in 2020, driven by a passion for technology and a commitment to helping businesses succeed through innovative software solutions. Our mission is to drive technological advancement by delivering high-quality products that empower our clients in a digital landscape. We value innovation, excellence, collaboration, and integrity, ensuring that we push the boundaries of technology while maintaining transparency in our dealings. Our dedicated team, including Alice Johnson, our visionary CEO, Bob Smith, our skilled Lead Developer, and Catherine Lee, our efficient Project Manager, work tirelessly to bring your ideas to life.</p>
         </section>
         <section>
            <div className="my-8 flex flex-col items-center justify-center gap-4 text-center">
               <h2 className='text-3xl md:text-5xl font-bold'>Meet Our <span className="text-indigo-700">Team</span></h2>
               <p className='text-gray-600'>Discover the talented individuals driving innovation at AwesomeCo.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
               {teamMembers.map((member, i) =>
                  <MemberCard
                     key={i}
                     name={member.name}
                     jobTitle={member.jobTitle}
                     linkedinUrl={member.linkedinUrl}
                     twitterUrl={member.twitterUrl}
                     image={member.image}
                  />)}
            </div>
         </section>
      </div>
   );
}