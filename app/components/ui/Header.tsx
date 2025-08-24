import Navigation from "./Navigation";


export default function Header() {
  return (
    <header data-testid="header" className="w-full bg-#e1ccbe font-bold text-white p-4">
      <Navigation />
    </header>
  );
}