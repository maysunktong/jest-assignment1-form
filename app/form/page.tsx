"use client";
import Navigation from "@/app/components/ui/Navigation";
import FormBody from "@/app/components/ui/FormBody";
import { FeedbackProvider } from "@/app/context/FeedbackProvider";

export default function FormPage() {
  return (
    <FeedbackProvider>
      <Navigation />
      <section data-testid="form-page-container" className="p-10 flex flex-col gap-6">
        <h1>Product Feedback Form</h1>
        <FormBody />
      </section>
    </FeedbackProvider>
  );
}
