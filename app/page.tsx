import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { JSX } from 'react';

export const metadata: Metadata = {
  // metadataBase: new URL('http://localhost:3000/'),
  title: 'Home | AwesomeCo',
  description: 'Welcome to AwesomeCo - Innovating the future with stunning solutions.',
  openGraph: {
    title: 'Home | AwesomeCo',
    description: 'Welcome to AwesomeCo - Innovating the future with stunning solutions.',
    url: 'https://seo-service-worker.vercel.app/',
    images: ['/images/logo.webp'],
  },
};

export default function Home(): JSX.Element {
  return (
    <div className="bg-gradient-to-b from-indigo-500 to-purple-600 text-white">
      <section className="min-h-screen flex flex-col md:flex-row items-center justify-center px-4 py-20">
        <div className="text-center md:text-left max-w-md md:mr-8">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight animate-fade-in">
            Welcome to AwesomeCo
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 leading-relaxed">
            We create cutting-edge solutions with a touch of magic and a lot of passion.
          </p>
          <Link
            href="/about"
            className="inline-block px-8 py-4 bg-indigo-700 rounded-lg text-lg font-semibold hover:bg-indigo-800 transition-all duration-300 shadow-lg"
          >
            About Us
          </Link>
        </div>
        <div className="mt-8 md:mt-0 relative">
          <Image
            src="/images/home.avif"
            alt="Hero Image"
            width={300}
            height={100}
            className="rounded-xl sm:rounded-3xl shadow-xl z-10 relative"
          />
          <div className="floatingAnimation absolute inset-0 bg-indigo-700 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 rounded-xl sm:rounded-3xl"></div>
        </div>
      </section>
    </div>
  );
}