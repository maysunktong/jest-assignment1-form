"use client";
import FormBody from "@/app/components/ui/FormBody";
import * as Ctx from "@/app/context/FeedbackProvider";

const SafeProvider =
  (Ctx as any).FeedbackProvider ??
  (({ children }: { children: React.ReactNode }) => <>{children}</>);

export default function FormPage() {
  return (
    <SafeProvider>
      <section data-testid="form-page-container" className="p-10 flex flex-col gap-6">
        <h1>Product Feedback Form</h1>
        <FormBody />
      </section>
    </SafeProvider>
  );
}
