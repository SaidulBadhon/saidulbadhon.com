import type { ReactNode } from "react";

/** A box set apart from a post's text. A "draft" callout is a note to the
 *  author, styled so it can't be missed before publishing. */
export default function Callout({
  title,
  variant = "note",
  children,
}: {
  title: string;
  variant?: "note" | "draft";
  children: ReactNode;
}) {
  const box =
    variant === "draft"
      ? "border-dashed border-amber-400 bg-amber-50 dark:border-amber-400/40 dark:bg-amber-400/5"
      : "border-gray-200 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/3";

  return (
    <aside className={`not-prose my-10 rounded-2xl border p-6 sm:p-7 ${box}`}>
      {variant === "draft" && (
        <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-amber-700 uppercase dark:text-amber-300">
          Draft note
        </p>
      )}
      <p className="font-semibold tracking-tight text-gray-950 dark:text-white">{title}</p>
      <div className="mt-2 space-y-3 leading-relaxed text-gray-600 dark:text-slate-400 [&_a]:font-medium [&_a]:text-gray-950 [&_a]:underline [&_a]:underline-offset-4 dark:[&_a]:text-white">
        {children}
      </div>
    </aside>
  );
}
