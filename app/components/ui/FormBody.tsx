"use client";
import { FormEvent, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";
import { useFeedbackContext } from "@/app/context/FeedbackProvider";
import type { FeedbackItem } from "@/app/utils/types";

const CATEGORY_OPTIONS = [
  { value: "general", label: "General" },
  { value: "bugs", label: "Bugs" },
  { value: "improvement", label: "Improvement" },
  { value: "other", label: "Other" },
];

export default function FormBody() {
  const { feedbackList, setFeedbackList } = useFeedbackContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("general");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const categoryLabel = useMemo(
    () => CATEGORY_OPTIONS.find(o => o.value === category)?.label ?? "General",
    [category]
  );

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    const item: FeedbackItem = {
      id: uuid(),
      name,
      email,
      category: categoryLabel,
      subject,
      content,
      timestamp: new Date().toLocaleString(),
    };

    const next = [item, ...(feedbackList ?? [])];
    try {
      localStorage.setItem("feedbacks", JSON.stringify(next));
    } catch {}
    setFeedbackList(next); // ← array, matchar testen

    setName(""); setEmail(""); setSubject(""); setContent(""); setCategory("general");
  }

  return (
    <form role="form" onSubmit={onSubmit} className="flex flex-col gap-4 max-w-xl">
      <label>
        Name
        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border p-2 w-full"
        />
      </label>

      <label>
        Email
        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border p-2 w-full"
        />
      </label>

      <label htmlFor="category">Category</label>
      <select
        id="category"
        aria-label="category"
        value={category}
        onChange={e => setCategory(e.target.value)}
        className="border p-2"
      >
        {CATEGORY_OPTIONS.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      <label>
        Subject
        <input
          placeholder="Subject"
          value={subject}
          onChange={e => setSubject(e.target.value)}
          className="border p-2 w-full"
        />
      </label>

      <label>
        Feedback
        <textarea
          placeholder="Your content"
          value={content}
          onChange={e => setContent(e.target.value)}
          className="border p-2 w-full min-h-24"
        />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
}
