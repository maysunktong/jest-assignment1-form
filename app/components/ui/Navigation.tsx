"use client";
import Link from "next/link";
import Image from "next/image";

export default function Navigation() {
  return (
    <nav data-testid="navigation" className="flex p-2 w-full mx-auto">
     <div className="flex justify-start w-full">
        <Link href="/" aria-label="logo">
          <Image src="/logoform.png" alt="logo" width={80} height={80} /> 
        </Link>
     </div>
      <div className="flex gap-3 justify-end items-center w-full">
        <Link href="/"><button className="px-4 rounded text-white hover:text-black active:scale-95 transition" >Home</button></Link>
        <Link href="/form"><button className="px-4 rounded text-white hover:text-black active:scale-95 transition">Form</button></Link>
        <Link href="/feedbacks"><button className="px-4 rounded text-white hover:text-black active:scale-95 transition">Feedbacks</button></Link>
      </div>
    </nav>
  );
}
