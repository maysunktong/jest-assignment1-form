"use client";
import FeedbackList from "@/app/components/ui/FeedbackList";
import { FeedbackProvider } from "@/app/context/FeedbackProvider";

export default function FeedbackPage() {
  return (
    <FeedbackProvider>
      <h1 className="flex justify-center text-cennter font-bold mt-10">Feedbacks</h1>
      <section data-testid="feedback-page-container" className="p-10 flex flex-col gap-6">
        <FeedbackList />
      </section>
    </FeedbackProvider>
  );
}
