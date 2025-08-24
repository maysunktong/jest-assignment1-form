"use client";
import Link from "next/link";
import Image from "next/image";

export default function Navigation() {
  return (
    <nav data-testid="navigation" className="w-full">
      <div className="mx-auto px-3 sm:px-4 lg:px-6">
        
        <div className="flex flex-wrap items-center justify-between gap-2 w-full">
          <Link href="/" aria-label="logo" className="shrink-0 hidden sm:block">
            <Image src="/logoform.png" alt="logo" width={80} height={80}
              className="h-8 w-auto sm:h-10 md:h-12" sizes="(max-width: 640px) 2rem, (max-width: 768px) 2.5rem, 3rem" 
              priority/>
          </Link>
          <div className="flex w-full sm:w-auto flex-col sm:flex-row items-center justify-center sm:justify-end gap-3 sm:gap-4 md:gap-6">
            <Link href="/">
              <button className=" px-4 py-1 rounded text-white text-sm sm:text-base hover:text-black active:scale-95 transition whitespace-nowrap">
                Home
              </button>
            </Link>

            <Link href="/form">
              <button className="px-4 py-1 rounded text-white text-sm sm:text-base hover:text-black active:scale-95 transition whitespace-nowrap">
                Form
              </button>
            </Link>
            <Link href="/feedbacks">
              <button className="px-4 py-1 rounded text-white text-sm sm:text-base hover:text-black active:scale-95 transition whitespace-nowrap">
                Feedbacks
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
