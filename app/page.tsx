'use client';
import link from 'next/link';
import navigation from 'components/Navigation';
import { FeedbackProvider } from '../context/FeedbackContext';

export default function Home() {
  return (
  <main role="main" className="flex flex-col justify-center items-center h-full p-10">
    <h1>Product Feedback Platform</h1>
    <h2>Your opinion matters.</h2>
    <div data-testid="home-buttons-container" className="flex gap-6 mt-6">
      <link href="/feedbacks"><button>Read Feedbacks</button></link>
      <link href="/form"><button>Go to form</button></link>
    </div>
  </main>
  );
}
