import React from "react";
import { FiLock } from "react-icons/fi";

/** A browser window around a screenshot: traffic lights and an address bar. */
export default function BrowserFrame({
  url,
  className = "",
  children,
}: {
  url?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl shadow-gray-900/15 sm:rounded-2xl dark:border-white/10 dark:bg-gray-950 dark:shadow-black/50 ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-gray-200 bg-gray-50/80 px-4 py-2.5 dark:border-white/10 dark:bg-white/3">
        <div className="flex w-12 gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        {url && (
          <div className="mx-auto flex max-w-xs flex-1 items-center justify-center gap-1.5 truncate rounded-md bg-white px-3 py-1 text-xs text-gray-500 ring-1 ring-gray-200 dark:bg-white/5 dark:text-slate-400 dark:ring-white/10">
            <FiLock size={10} className="shrink-0" />
            {url}
          </div>
        )}
        <div className="ml-auto w-12" />
      </div>
      {children}
    </div>
  );
}
