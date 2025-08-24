'use client'
import Navigation from "./Navigation";
import Hamburger from 'hamburger-react'
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";


export default function Header() {
  const [isOpen, setOpen] = useState(false)
  return (
   <header
  data-testid="header"
  className="w-full bg-[#e1ccbe] font-bold text-white p-4 flex items-center justify-between">
  <div className="sm:hidden">
    <Link href="/">
    <Image
      src="/logoform.png"
      alt="logo"
      width={80}
      height={80}
      className="h-8 w-auto sm:h-10 md:h-12"
      sizes="(max-width: 640px) 2rem, (max-width: 768px) 2.5rem, 3rem"
      priority />
      </Link>
  </div>

  <div className="hidden sm:block">
    <Navigation />
  </div>

  <div className="sm:hidden">
    
    <button className="sm:hidden p-2 rounded focus:outline-none focus-visible:ring">
    <Hamburger toggled={isOpen} toggle={setOpen} />
    </button>
    
  </div>
</header>
  );
}