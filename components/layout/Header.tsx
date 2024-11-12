"use client";

import { Button } from "@/components/ui/button";
import { Settings, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="border-b bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/turkish-airlines-logo.png"
            alt="Turkish Airlines"
            width={40}
            height={40}
            className="dark:brightness-0 dark:invert"
          />
          <span className="font-bold text-xl">Turkish Airlines</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}