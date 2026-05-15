"use client";

import { MessageSquare, Plus, Search, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { ChatSession } from "@/lib/types";

export default function Sidebar({
  sessions,
  currentId,
  onSelect,
  onNew,
  onDelete,
}: {
  sessions: ChatSession[];
  currentId: number | null;
  onSelect: (id: number) => void;
  onNew: () => void;
  onDelete: (id: number) => void;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sessions;
    return sessions.filter((s) => s.title.toLowerCase().includes(q));
  }, [sessions, query]);

  return (
    <aside className="flex h-full w-72 flex-col border-r border-slate-200/70 bg-gradient-to-b from-white to-slate-50 dark:border-slate-800 dark:from-slate-950 dark:to-slate-900">
      <div className="px-3 pt-4 pb-3">
        <button
          onClick={onNew}
          className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 px-3 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition hover:shadow-lg hover:shadow-indigo-500/30 active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" strokeWidth={2.5} />
          Cuộc trò chuyện mới
        </button>
      </div>

      {/* Search */}
      <div className="px-3 pb-2">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400"
            strokeWidth={2.25}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm cuộc trò chuyện..."
            className="w-full rounded-lg border border-slate-200 bg-white py-1.5 pl-8 pr-7 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800"
              aria-label="Xoá tìm kiếm"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between px-4 pb-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Lịch sử
        </span>
        {query && (
          <span className="text-[10px] text-slate-400">
            {filtered.length}/{sessions.length}
          </span>
        )}
      </div>

      <div className="scroll-thin flex-1 overflow-y-auto px-2 pb-3">
        {sessions.length === 0 ? (
          <div className="mx-2 mt-2 rounded-lg border border-dashed border-slate-300 px-3 py-4 text-center text-xs text-slate-500 dark:border-slate-700 dark:text-slate-500">
            Chưa có cuộc trò chuyện
          </div>
        ) : filtered.length === 0 ? (
          <div className="mx-2 mt-2 rounded-lg border border-dashed border-slate-300 px-3 py-4 text-center text-xs text-slate-500 dark:border-slate-700 dark:text-slate-500">
            Không tìm thấy "{query}"
          </div>
        ) : (
          <ul className="space-y-0.5">
            {filtered.map((s) => {
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
                      <span className="truncate">
                        {query ? highlight(s.title, query) : s.title}
                      </span>
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
    </aside>
  );
}

function highlight(text: string, query: string) {
  const q = query.trim();
  if (!q) return text;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded bg-amber-200/70 px-0.5 text-slate-900 dark:bg-amber-400/30 dark:text-amber-100">
        {text.slice(idx, idx + q.length)}
      </mark>
      {text.slice(idx + q.length)}
    </>
  );
}
