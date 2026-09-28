import React from "react";
import { formatDate, type Post } from "@/content/blogs";

/** Publish date and reading time, plus a badge on drafts. */
export function PostMeta({ post, className = "" }: { post: Post; className?: string }) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500 dark:text-slate-400 ${className}`}
    >
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span aria-hidden className="h-1 w-1 rounded-full bg-gray-300 dark:bg-slate-600" />
      <span>{post.readingTime} min read</span>
      {post.draft && (
        <span className="rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-300">
          Draft
        </span>
      )}
    </div>
  );
}

export function PostTags({ tags, className = "" }: { tags: string[]; className?: string }) {
  if (tags.length === 0) return null;
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`}>
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-xs text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
