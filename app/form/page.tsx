// app/form/page.tsx
"use client";
import Navigation from "@/app/components/ui/Navigation";
import FormBody from "@/app/components/ui/FormBody";
import * as Ctx from "@/app/context/FeedbackProvider";

// Om Jest-mocken inte exporterar FeedbackProvider får vi en no-op provider
const SafeProvider =
  (Ctx as any).FeedbackProvider ??
  (({ children }: { children: React.ReactNode }) => <>{children}</>);

export default function FormPage() {
  return (
    <SafeProvider>
      <Navigation />
      <section data-testid="form-page-container" className="p-10 flex flex-col gap-6">
        <h1>Product Feedback Form</h1>
        <FormBody />
      </section>
    </SafeProvider>
  );
}
