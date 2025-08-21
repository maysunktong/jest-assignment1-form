"use client";
import Link from "next/link";

export default function Navigation() {
  return (
    <nav data-testid="navigation" className="flex items-center justify-between p-4">
      <Link href="/" aria-label="logo">
        <span className="font-bold">Logo</span>
      </Link>
      <div className="flex gap-3">
        <Link href="/">Home</Link>
        <Link href="/form">Form</Link>
        <Link href="/feedbacks">Feedbacks</Link>
      </div>
    </nav>
  );
}
