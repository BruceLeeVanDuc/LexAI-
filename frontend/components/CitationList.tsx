import { BookOpen } from "lucide-react";
import type { Citation } from "@/lib/types";

export default function CitationList({ citations }: { citations: Citation[] }) {
  if (!citations || citations.length === 0) return null;

  return (
    <div className="mt-3 w-full">
      <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
        Nguồn trích dẫn ({citations.length})
      </div>
      <div className="flex flex-wrap gap-1.5">
        {citations.map((c, i) => {
          const name = c.law_name?.trim() || c.source_file;
          const parts: string[] = [];
          if (c.article && c.article !== "0") parts.push(`Điều ${c.article}`);
          if (c.chapter && c.chapter !== "0") parts.push(`Chương ${c.chapter}`);
          if (c.section && c.section !== "0") parts.push(`Mục ${c.section}`);

          return (
            <div
              key={i}
              className="group inline-flex max-w-full items-center gap-1.5 rounded-lg border border-indigo-200/60 bg-gradient-to-r from-indigo-50 to-violet-50 px-2.5 py-1.5 text-xs shadow-sm transition hover:border-indigo-400 hover:shadow dark:border-indigo-900/50 dark:from-indigo-950/40 dark:to-violet-950/40"
              title={c.source_file}
            >
              <BookOpen className="h-3 w-3 shrink-0 text-indigo-600 dark:text-indigo-400" />
              <span className="truncate font-semibold text-indigo-900 dark:text-indigo-200">
                {name}
              </span>
              {parts.length > 0 && (
                <span className="shrink-0 text-indigo-500/80 dark:text-indigo-400/80">
                  · {parts.join(" · ")}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
