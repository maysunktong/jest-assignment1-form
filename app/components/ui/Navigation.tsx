"use client";
import Link from "next/link";
import Image from "next/image";

export default function Navigation() {
  return (
    <nav data-testid="navigation" className="flex items-center justify-between p-4 max-w-4xl w-full mx-auto">
     
        <Link href="/" aria-label="logo">
          <Image src="/logoform.png" alt="logo" width={80} height={80} /> 
        </Link>
     
      <div className="flex gap-3">
        <Link href="/"><button className="px-4 rounded text-white hover:text-black active:scale-95 transition" >Home</button></Link>
        <Link href="/form"><button className="px-4 rounded text-white hover:text-black active:scale-95 transition">Form</button></Link>
        <Link href="/feedbacks"><button className="px-4 rounded text-white hover:text-black active:scale-95 transition">Feedbacks</button></Link>
      </div>
    </nav>
  );
}
