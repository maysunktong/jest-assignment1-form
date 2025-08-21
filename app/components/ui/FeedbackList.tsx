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
      if (raw) setLoaded(JSON.parse(raw));
      else setLoaded(feedbackList ?? []);
    } catch {
      setLoaded(feedbackList ?? []);
    }
  }, [feedbackList]);

  function erase() {
    try {
      localStorage.removeItem("feedbacks");
    } catch {}
    setLoaded([]);
    setFeedbackList([]); // tom array, inte updater-funktion
  }

  return (
    <section>
      <button onClick={erase}>Erase Storage</button>
      <ul>
        {loaded.map(f => (
          <li key={f.id}>
            <h3>{f.subject}</h3>
            <p>{f.content}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
