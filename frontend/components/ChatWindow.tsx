"use client";

import { useEffect, useRef } from "react";
import { Scale, Sparkles } from "lucide-react";
import MessageBubble from "./MessageBubble";
import type { ChatMessage } from "@/lib/types";

const SUGGESTIONS = [
  "Mức đóng BHXH bắt buộc hiện nay là bao nhiêu?",
  "Người lao động được nghỉ phép năm bao nhiêu ngày?",
  "Trợ cấp thất nghiệp được hưởng tối đa bao lâu?",
  "Quy định về thử việc theo Bộ luật Lao động?",
];

export default function ChatWindow({
  messages,
  loading,
}: {
  messages: ChatMessage[];
  loading: boolean;
}) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  if (messages.length === 0 && !loading) {
    return (
      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-6">
        {/* Background decoration */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-400/20 blur-3xl dark:bg-indigo-500/10" />
        <div className="pointer-events-none absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-violet-400/20 blur-3xl dark:bg-violet-500/10" />

        <div className="relative max-w-xl text-center">
          <div className="brand-gradient mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl shadow-xl shadow-indigo-500/30">
            <Scale className="h-8 w-8 text-white" strokeWidth={2.25} />
          </div>
          <h2 className="mb-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Xin chào, tôi là <span className="brand-text">LexAI</span>
          </h2>
          <p className="mx-auto max-w-md text-sm text-slate-500 dark:text-slate-400">
            Trợ lý AI tư vấn pháp luật Việt Nam. Hỏi tôi bất cứ điều gì về Luật, Nghị định, Thông tư — câu trả lời luôn kèm trích dẫn nguồn.
          </p>

          <div className="mt-8 grid gap-2 sm:grid-cols-2">
            {SUGGESTIONS.map((q) => (
              <div
                key={q}
                className="group cursor-default rounded-xl border border-slate-200 bg-white/60 p-3 text-left text-sm text-slate-700 backdrop-blur transition hover:border-indigo-300 hover:bg-white hover:shadow-md hover:shadow-indigo-500/5 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-300 dark:hover:border-indigo-700 dark:hover:bg-slate-900"
              >
                <Sparkles className="mb-1.5 h-3.5 w-3.5 text-indigo-500 dark:text-indigo-400" />
                <p className="leading-snug">{q}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="scroll-thin flex-1 overflow-y-auto px-4 py-6">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}

        {loading && (
          <div className="flex items-center gap-3 animate-fade-up">
            <div className="brand-gradient flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-sm">
              <Scale className="h-4 w-4 text-white" />
            </div>
            <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-slate-100 px-4 py-3 dark:bg-slate-800">
              <span
                className="typing-dot h-1.5 w-1.5 rounded-full bg-indigo-500"
                style={{ animationDelay: "0s" }}
              />
              <span
                className="typing-dot h-1.5 w-1.5 rounded-full bg-violet-500"
                style={{ animationDelay: "0.15s" }}
              />
              <span
                className="typing-dot h-1.5 w-1.5 rounded-full bg-purple-500"
                style={{ animationDelay: "0.3s" }}
              />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
