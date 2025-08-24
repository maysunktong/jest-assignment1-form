"use client";
import { useEffect, useState } from "react";
import { useFeedbackContext } from "@/app/context/FeedbackProvider";
import type { FeedbackItem } from "@/app/utils/types";

export default function FeedbackList() {
  const { feedbackList, setFeedbackList } = useFeedbackContext();
  const [loaded, setLoaded] = useState<FeedbackItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("feedbacks");
      const data: FeedbackItem[] = raw ? JSON.parse(raw) : [];
      setLoaded(data.length ? data : (feedbackList ?? []));
    } catch {
      setLoaded(feedbackList ?? []);
    }
  }, [feedbackList]);

  function erase() {
    try {
      localStorage.removeItem("feedbacks");
    } catch {}
    setLoaded([]);
    setFeedbackList([]);
  }

  return (
    <section>
    <button onClick={erase}>Erase Storage</button>
    <ul>
      {loaded.map((f) => (
        <li key={f.id}>
          <h3>{f.subject}</h3>
          <p>{f.content}</p>
          <p>{f.name}</p>
          <p>{f.email}</p>
          <p>{f.category}</p>
        </li>
      ))}
    </ul>
  </section>
  )}