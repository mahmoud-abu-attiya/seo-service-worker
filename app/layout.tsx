'use client';

import { JSX, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  useEffect(() => {
    const isServiceWorker = 'serviceWorker' in navigator
    if (isServiceWorker) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => console.log('Service Worker registered:', registration))
        .catch((error) => console.error('Service Worker registration failed:', error));
    } else {
      console.warn('Service workers are not supported in this browser.');
    }
  }, []);

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}