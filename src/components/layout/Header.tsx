import { Bell } from "lucide-react";

function Header() {
  return (
    <header className="w-full bg-card border-b border-border py-3 px-6 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-xl font-bold">30-Day Tracker</h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-accent">
          <Bell size={20} />
        </button>
        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
          <span className="text-sm font-medium">JD</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
