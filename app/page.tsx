import Link from 'next/link';
import Image from 'next/image';
import { JSX } from 'react';
import Head from 'next/head';

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Home | AwesomeCo</title>
        <meta name="description" content="Welcome to AwesomeCo - Innovating the future with stunning solutions. Learn more about our mission to deliver amazing services and solutions." />
        <link rel="canonical" href="https://seo-service-worker.vercel.app/" />

        <meta property="og:title" content="Home | AwesomeCo" />
        <meta property="og:description" content="Discover our story and what drives us to excellence." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://seo-service-worker.vercel.app/" />
        <meta property="og:image" content="/images/logo.webp" />
        <meta property="og:site_name" content="AwesomeCo" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content='Home | AwesomeCo' />
        <meta name="twitter:description" content='Discover our story and what drives us to excellence.' />
        <meta name="twitter:image" content="/images/logo.webp" />

        <meta name="robots" content="noindex, nofollow" />
      </Head>
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
    </>
  );
}