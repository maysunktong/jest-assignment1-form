import type { FeedbackItem } from "./types";

export function readFeedbacks(): FeedbackItem[] {
  try {
    const raw = localStorage.getItem("feedbacks");
    return raw ? (JSON.parse(raw) as FeedbackItem[]) : [];
  } catch {
    return [];
  }
}

export function writeFeedbacks(value: FeedbackItem[]) {
  try {
    localStorage.setItem("feedbacks", JSON.stringify(value));
  } catch {}
}

export function clearFeedbacks() {
  try {
    localStorage.removeItem("feedbacks");
  } catch {}
}
