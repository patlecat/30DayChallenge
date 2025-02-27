import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Settings,
  User,
  Bell,
  Key,
  Shield,
  HelpCircle,
  LogOut,
} from "lucide-react";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  description?: string;
}

interface SettingsSidebarProps {
  className?: string;
}

const SettingsSidebar = ({ className = "" }: SettingsSidebarProps) => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string>(
    location.pathname.split("/").pop() || "profile",
  );

  const navItems: NavItem[] = [
    {
      label: "Profile",
      icon: <User className="h-5 w-5" />,
      href: "/settings/profile",
      description: "Manage your personal information",
    },
    {
      label: "Notifications",
      icon: <Bell className="h-5 w-5" />,
      href: "/settings/notifications",
      description: "Configure your notification preferences",
    },
    {
      label: "API Keys",
      icon: <Key className="h-5 w-5" />,
      href: "/settings/api-keys",
      description: "Manage your API keys",
    },
    {
      label: "Security",
      icon: <Shield className="h-5 w-5" />,
      href: "/settings/security",
      description: "Update your security settings",
    },
  ];

  const supportItems: NavItem[] = [
    {
      label: "Help & Support",
      icon: <HelpCircle className="h-5 w-5" />,
      href: "/settings/help",
    },
  ];

  return (
    <div
      className={cn(
        "flex flex-col h-full w-[280px] border-r bg-white p-4",
        className,
      )}
    >
      <div className="flex items-center gap-2 px-2 py-4">
        <Settings className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Settings</h2>
      </div>

      <nav className="mt-6 flex flex-col space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              activeSection === item.href.split("/").pop()
                ? "bg-gray-100 text-gray-900"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
            )}
            onClick={() => setActiveSection(item.href.split("/").pop() || "")}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <Separator className="my-6" />

      <nav className="flex flex-col space-y-1">
        {supportItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              activeSection === item.href.split("/").pop()
                ? "bg-gray-100 text-gray-900"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
            )}
            onClick={() => setActiveSection(item.href.split("/").pop() || "")}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-6">
        <Button
          variant="outline"
          className="w-full justify-start gap-3 text-red-500 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="h-5 w-5" />
          <span>Sign Out</span>
        </Button>
      </div>
    </div>
  );
};

export default SettingsSidebar;
