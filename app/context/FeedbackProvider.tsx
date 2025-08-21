"use client";
import { createContext, useContext, useEffect, useState } from "react";
import type { FeedbackItem, Ctx } from "@/app/utils/types";

const defaultCtx: Ctx = {
  feedbackList: [],
  setFeedbackList: () => {},
};

const FeedbackContext = createContext<Ctx>(defaultCtx);

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
      localStorage.setItem("feedbacks", JSON.stringify(feedbackList));
    } catch {}
  }, [feedbackList]);

  return (
    <FeedbackContext.Provider value={{ feedbackList, setFeedbackList }}>
      {children}
    </FeedbackContext.Provider>
  );
}

export function useFeedbackContext() {
  return useContext(FeedbackContext);
}
