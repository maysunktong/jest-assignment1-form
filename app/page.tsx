'use client';
import Link from 'next/link';
import navigation from '@/app/components/ui/Navigation';
import { FeedbackProvider } from '@/app/context/FeedbackProvider';

export default function Home() {
  return (
  <main role="main" className="flex min-h-[70vh] md:min-h-screen flex flex-col items-center justify-center sm:px-8 md:px-10 pt-10 sm:pt-14 md:pt-16 lg:pt-24 -mt-30">
    <div className="text-center text-3xl font-bold mb-20">
    <h1 className="text-color-white">Product Feedback Platform</h1>
    <h2>Your opinion matters.</h2>
    </div>
    <div data-testid="home-buttons-container" className="flex gap-6 mt-6">
      <Link href="/feedbacks"><button className="w-40 px-4 rounded py-1 border text-bold border-white text-white hover:text-white hover:bg-black  active:scale-95 transition">Read Feedbacks</button></Link>
      <Link href="/form"><button className="w-40 px-4 rounded py-1 border border-white text-white hover:text-white hover:bg-black  active:scale-95 transition">Go to form</button></Link>
    </div>
  </main>
  );
}
