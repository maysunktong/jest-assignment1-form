"use client";

import { useEffect, useState, useContext } from "react";
import { FeedbackContext } from "@/app/context/FeedbackProvider";
import { FeedbackItem } from "@/app/utils/types";

export default function FeedbackList() {

  const context = useContext(FeedbackContext);
  const [loaded, setLoaded] = useState<FeedbackItem[]>([]);
 
  useEffect(() => {
    try {
        const raw = localStorage.getItem("feedbacks");
        const data: FeedbackItem[] = raw ? JSON.parse(raw) : [];
        setLoaded(data.length ? data : (context?.feedbackList || []));
    } catch {
        setLoaded(context?.feedbackList  || []);
    }
  }, [context?.feedbackList]); 

  function erase() {
    try {
      localStorage.removeItem("feedbacks");
    } catch {}
    if (context?.setFeedbackList) {
      context.setFeedbackList([]);
    }
    setLoaded([]);
  }

  return (
    <section>
        <button onClick={erase}>Erase Storage</button>
        <ul className="flex flex-col gap-3">
        {loaded.map(item => (
          <li key={item.id} className="border p-3 rounded">
            <div><strong>{item.name}</strong> — {item.email}</div>
            <div>{item.category}</div>
            <div>{item.subject}</div>
            <p>{item.content}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}