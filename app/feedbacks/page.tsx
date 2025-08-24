"use client";

import FeedbackList from "@/app/components/ui/FeedbackList";
import { FeedbackProvider } from "@/app/context/FeedbackProvider";

export default function FeedbackPage() {
  return (
    <FeedbackProvider>
      <section data-testid="feedback-page-container" className="p-10 flex flex-col gap-6">
        <h1>Feedbacks</h1>
        <FeedbackList />
      </section>
    </FeedbackProvider>
  );
}
