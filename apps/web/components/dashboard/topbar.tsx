"use client";

import { Bell } from "lucide-react";
import { Logo } from "@/components/logo";

export function Topbar() {
  return (
    <header className="fixed top-0 left-[200px] right-0 h-12 bg-shell border-b border-border flex items-center justify-between px-4 z-10">
      <Logo showMark={true} />
      
      <div className="flex items-center gap-3">
        {/* Agent Active Pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-[20px] bg-surface-hover border border-border-hover text-[12px]">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          <span className="text-text-secondary">agent active</span>
        </div>
        
        {/* Bell Icon */}
        <button className="p-2 rounded-[6px] hover:bg-surface-hover transition-colors">
          <Bell className="w-4 h-4 text-text-secondary" />
        </button>
        
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-panel border border-border flex items-center justify-center text-[12px] font-medium text-text-primary">
          JD
        </div>
      </div>
    </header>
  );
}
