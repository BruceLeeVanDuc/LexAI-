"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { clearToken } from "@/lib/auth";
import type { User } from "@/lib/types";

export default function UserMenu({ user }: { user: User | null }) {
  const router = useRouter();

  function handleLogout() {
    clearToken();
    router.push("/login");
  }

  if (!user) return null;

  return (
    <div className="flex items-center gap-2.5 border-t border-slate-200/70 bg-white/40 px-3 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-900/40">
      <div className="brand-gradient flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white shadow-sm">
        {(user.fullName || user.email).slice(0, 1).toUpperCase()}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
          {user.fullName || user.email.split("@")[0]}
        </p>
        <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
          {user.email}
        </p>
      </div>
      <button
        onClick={handleLogout}
        className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"
        title="Đăng xuất"
        aria-label="Đăng xuất"
      >
        <LogOut className="h-4 w-4" />
      </button>
    </div>
  );
}
