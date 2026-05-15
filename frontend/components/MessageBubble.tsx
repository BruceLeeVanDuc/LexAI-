import { User, Scale } from "lucide-react";
import ReactMarkdown from "react-markdown";
import CitationList from "./CitationList";
import type { ChatMessage } from "@/lib/types";

export default function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`animate-fade-up flex gap-3 ${
        isUser ? "flex-row-reverse" : ""
      }`}
    >
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-sm ${
          isUser
            ? "bg-gradient-to-br from-slate-700 to-slate-900 text-white dark:from-slate-200 dark:to-slate-400 dark:text-slate-900"
            : "brand-gradient text-white"
        }`}
      >
        {isUser ? (
          <User className="h-4 w-4" />
        ) : (
          <Scale className="h-4 w-4" strokeWidth={2.25} />
        )}
      </div>

      <div
        className={`flex max-w-[82%] flex-col ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        {!isUser && (
          <span className="mb-1 text-[11px] font-semibold tracking-wide brand-text">
            LexAI
          </span>
        )}

        <div
          className={`text-sm shadow-sm ${
            isUser
              ? "rounded-2xl rounded-tr-sm bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-600 px-4 py-2.5 text-white shadow-indigo-500/20"
              : "rounded-2xl rounded-tl-sm border border-slate-200 bg-white px-4 py-3 text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
          ) : (
            <div className="prose prose-sm max-w-none leading-relaxed dark:prose-invert prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-headings:mt-3 prose-headings:mb-1">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )}
        </div>

        {!isUser && message.citations && message.citations.length > 0 && (
          <CitationList citations={message.citations} />
        )}

        {!isUser && message.latencyMs != null && (
          <span className="mt-1.5 text-[10px] text-slate-400 dark:text-slate-500">
            Phản hồi trong {(message.latencyMs / 1000).toFixed(1)}s
          </span>
        )}
      </div>
    </div>
  );
}
