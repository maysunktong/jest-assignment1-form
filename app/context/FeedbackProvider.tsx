"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { FeedbackItem, Ctx } from "@/app/utils/types";

const FeedbackContext = createContext<Ctx | null>(null);

export function FeedbackProvider({ children }: { children: React.ReactNode }) {
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("feedbacks");
      if (raw) setFeedbackList(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      if (feedbackList.length) {
        localStorage.setItem("feedbacks", JSON.stringify(feedbackList));
      }
    } catch {}
  }, [feedbackList]);

  return (
    <FeedbackContext.Provider value={{ feedbackList, setFeedbackList }}>
      {children}
    </FeedbackContext.Provider>
  );
}

export function useFeedbackContext() {
  const ctx = useContext(FeedbackContext);
  if (!ctx) throw new Error("useFeedbackContext must be used within provider");
  return ctx;
}
