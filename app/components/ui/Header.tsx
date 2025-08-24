import Navigation from "./Navigation";
import Image from "next/image";
import Link from "next/link";


export default function Header() {
  return (
    <header data-testid="header" className="flex w-full bg-#e1ccbe font-bold text-white p-4">
      <Navigation />
      
    </header>
  );
}