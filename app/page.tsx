'use client';
import Link from 'next/link';
import navigation from '@/app/components/ui/Navigation';
import { FeedbackProvider } from '@/app/context/FeedbackProvider';

export default function Home() {
  return (
  <main role="main" className="flex flex-col justify-center items-center h-full p-10">
    <h1>Product Feedback Platform</h1>
    <h2>Your opinion matters.</h2>
    <div data-testid="home-buttons-container" className="flex gap-6 mt-6">
      <Link href="/feedbacks"><button className="w-40 px-4 rounded py-1 border border-black text-black hover:text-white hover:bg-black  active:scale-95 transition">Read Feedbacks</button></Link>
      <Link href="/form"><button className="w-40 px-4 rounded py-1 border border-black text-black hover:text-white hover:bg-black  active:scale-95 transition">Go to form</button></Link>
    </div>
  </main>
  );
}
