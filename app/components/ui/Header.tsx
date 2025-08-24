'use client'
import Navigation from "./Navigation";
import Hamburger from 'hamburger-react'
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";


export default function Header() {
  const [isOpen, setOpen] = useState(false)
  return (
   <header data-testid="header" className="relative w-full bg-[#e1ccbe] font-bold text-white p-4 flex items-center">
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

  <div className="hidden sm:block flex justify-end w-full">
    <Navigation />
  </div>

  <div className="sm:hidden flex justify-end w-full">
        <Hamburger toggled={isOpen} toggle={setOpen} />

        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-[#e1ccbe] p-4">
            <Navigation />
          </div>
        )}
      </div>
</header>
  );
}