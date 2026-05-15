"use client";

import { MessageSquare, Plus, Scale, Trash2 } from "lucide-react";
import type { ChatSession, User } from "@/lib/types";
import UserMenu from "./UserMenu";

export default function Sidebar({
  sessions,
  currentId,
  user,
  onSelect,
  onNew,
  onDelete,
}: {
  sessions: ChatSession[];
  currentId: string | null;
  user: User | null;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
}) {
  return (
    <aside className="flex h-full w-72 flex-col border-r border-slate-200/70 bg-gradient-to-b from-white to-slate-50 dark:border-slate-800 dark:from-slate-950 dark:to-slate-900">
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-4 pt-5 pb-4">
        <div className="brand-gradient flex h-9 w-9 items-center justify-center rounded-xl shadow-md shadow-indigo-500/30">
          <Scale className="h-5 w-5 text-white" strokeWidth={2.25} />
        </div>
        <div className="leading-tight">
          <p className="brand-text text-lg font-bold tracking-tight">LexAI</p>
          <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Trợ lý Pháp luật
          </p>
        </div>
      </div>

      <div className="px-3 pb-3">
        <button
          onClick={onNew}
          className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 px-3 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition hover:shadow-lg hover:shadow-indigo-500/30 active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" strokeWidth={2.5} />
          Cuộc trò chuyện mới
        </button>
      </div>

      <div className="px-4 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
        Lịch sử
      </div>

      <div className="scroll-thin flex-1 overflow-y-auto px-2 pb-2">
        {sessions.length === 0 ? (
          <div className="mx-2 mt-2 rounded-lg border border-dashed border-slate-300 px-3 py-4 text-center text-xs text-slate-500 dark:border-slate-700 dark:text-slate-500">
            Chưa có cuộc trò chuyện
          </div>
        ) : (
          <ul className="space-y-0.5">
            {sessions.map((s) => {
              const active = currentId === s.id;
              return (
                <li key={s.id}>
                  <div
                    className={`group relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                      active
                        ? "bg-gradient-to-r from-indigo-50 to-violet-50 text-indigo-900 dark:from-indigo-900/30 dark:to-violet-900/20 dark:text-indigo-100"
                        : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/60"
                    }`}
                  >
                    {active && (
                      <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-r bg-gradient-to-b from-indigo-500 to-violet-600" />
                    )}
                    <button
                      onClick={() => onSelect(s.id)}
                      className="flex flex-1 items-center gap-2 truncate text-left"
                    >
                      <MessageSquare
                        className={`h-4 w-4 shrink-0 ${
                          active
                            ? "text-indigo-600 dark:text-indigo-400"
                            : "text-slate-400"
                        }`}
                      />
                      <span className="truncate">{s.title}</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("Xóa cuộc trò chuyện này?")) onDelete(s.id);
                      }}
                      className="opacity-0 transition group-hover:opacity-100"
                      aria-label="Xóa"
                    >
                      <Trash2 className="h-3.5 w-3.5 text-slate-400 hover:text-red-500" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <UserMenu user={user} />
    </aside>
  );
}
