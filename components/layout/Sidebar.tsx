"use client";

import { cn } from "@/lib/utils";
import {
  Home,
  Search,
  Calendar,
  Settings,
  CreditCard,
  User,
  HelpCircle,
  Globe2,
  Plane,
  Map,
  Clock,
  Heart,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = [
  { icon: Home, label: "Overview", href: "/" },
  { icon: Search, label: "Search Flights", href: "/search" },
  { icon: Map, label: "Routes", href: "/routes" },
  { icon: Calendar, label: "Schedule", href: "/schedule" },
  { icon: Clock, label: "History", href: "/history" },
  { icon: Heart, label: "Saved", href: "/saved" },
  { icon: CreditCard, label: "Payments", href: "/payments" },
  { icon: User, label: "Profile", href: "/profile" },
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: HelpCircle, label: "Help", href: "/help" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 top-16 w-64 bg-white/50 backdrop-blur-xl dark:bg-gray-800/50 border-r overflow-y-auto">
      <nav className="flex h-[calc(100vh-4rem)] flex-col justify-between py-6">
        <div className="space-y-2 px-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                  pathname === item.href ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50" : ""
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="px-4">
          <div className="rounded-lg bg-gradient-to-r from-rose-500 to-purple-500 p-4 text-white">
            <Plane className="h-6 w-6 mb-2" />
            <h3 className="font-semibold">Premium Features</h3>
            <p className="mt-1 text-sm text-white/80">
              Unlock exclusive benefits and premium support
            </p>
            <button className="mt-3 w-full rounded-md bg-white/20 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm hover:bg-white/30 transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
}