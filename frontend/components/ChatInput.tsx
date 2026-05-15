"use client";

import { Send } from "lucide-react";
import { useEffect, useRef, useState, FormEvent, KeyboardEvent } from "react";

export default function ChatInput({
  onSend,
  disabled,
}: {
  onSend: (text: string) => void;
  disabled?: boolean;
}) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 180) + "px";
  }, [value]);

  function submit(e: FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit(e as unknown as FormEvent);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="border-t border-slate-200/70 bg-gradient-to-b from-transparent to-slate-50/80 px-4 py-4 dark:border-slate-800 dark:to-slate-950/80"
    >
      <div className="mx-auto max-w-3xl">
        <div className="group relative flex items-end gap-2 rounded-2xl border border-slate-300/70 bg-white p-1.5 shadow-sm transition focus-within:border-indigo-400 focus-within:shadow-lg focus-within:shadow-indigo-500/10 dark:border-slate-700 dark:bg-slate-900 dark:focus-within:border-indigo-500">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Hỏi LexAI về pháp luật Việt Nam..."
            rows={1}
            disabled={disabled}
            className="scroll-thin flex-1 resize-none bg-transparent px-3 py-2 text-sm leading-relaxed text-slate-900 placeholder:text-slate-400 outline-none disabled:opacity-50 dark:text-slate-100 dark:placeholder:text-slate-500"
          />
          <button
            type="submit"
            disabled={disabled || !value.trim()}
            className="brand-gradient flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white shadow-md shadow-indigo-500/30 transition hover:shadow-lg hover:shadow-indigo-500/40 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
            aria-label="Gửi"
          >
            <Send className="h-4 w-4" strokeWidth={2.25} />
          </button>
        </div>
        <p className="mt-2 text-center text-[11px] text-slate-400 dark:text-slate-500">
          LexAI có thể sai sót. Thông tin chỉ mang tính tham khảo, không thay thế tư vấn luật sư.
        </p>
      </div>
    </form>
  );
}
