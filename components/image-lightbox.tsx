"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image, { type StaticImageData } from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import { useIsClient } from "@/lib/hooks";

export type LightboxImage = {
  image: StaticImageData;
  alt: string;
  caption?: string;
};

type ImageLightboxProps = {
  images: LightboxImage[];
  /** Index of the image on screen, or null when the viewer is closed. */
  index: number | null;
  onChange: (index: number | null) => void;
};

/** Full-screen image viewer: arrow keys or swipe to move, Esc to close. */
export default function ImageLightbox({
  images,
  index,
  onChange,
}: ImageLightboxProps) {
  const isClient = useIsClient();
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = index !== null;
  const count = images.length;

  const step = useCallback(
    (delta: number) => {
      if (index !== null) onChange((index + delta + count) % count);
    },
    [index, count, onChange]
  );

  // Lock page scroll while open, and hand focus back to whatever opened it.
  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      opener?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onChange(null);
      else if (event.key === "ArrowRight") step(1);
      else if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, step, onChange]);

  if (!isClient) return null;

  const current = index !== null ? images[index] : null;

  return createPortal(
    <AnimatePresence>
      {current && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          className="fixed inset-0 z-1001 flex flex-col bg-gray-950/95 text-white backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => onChange(null)}
        >
          <div className="flex items-center justify-between px-4 py-4 sm:px-6">
            <span className="font-mono text-sm tabular-nums text-white/60">
              {String(index! + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={() => onChange(null)}
              aria-label="Close"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
            >
              <FiX size={20} />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20">
            {count > 1 && (
              <>
                <NavButton side="left" onClick={() => step(-1)} />
                <NavButton side="right" onClick={() => step(1)} />
              </>
            )}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                className="flex max-h-full max-w-full cursor-grab items-center justify-center active:cursor-grabbing"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                drag={count > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) step(1);
                  else if (info.offset.x > 80) step(-1);
                }}
                onClick={(event) => event.stopPropagation()}
              >
                <Image
                  src={current.image}
                  alt={current.alt}
                  sizes="100vw"
                  quality={95}
                  placeholder="blur"
                  draggable={false}
                  className="h-auto max-h-[calc(100vh-11rem)] w-auto max-w-full rounded-lg shadow-2xl ring-1 ring-white/10"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <p className="mx-auto min-h-16 max-w-2xl px-6 py-5 text-center text-sm text-white/70">
            {current.caption}
          </p>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

function NavButton({
  side,
  onClick,
}: {
  side: "left" | "right";
  onClick: () => void;
}) {
  const Icon = side === "left" ? FiChevronLeft : FiChevronRight;
  return (
    <button
      type="button"
      aria-label={side === "left" ? "Previous image" : "Next image"}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      className={`absolute top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 sm:flex ${
        side === "left" ? "left-4" : "right-4"
      }`}
    >
      <Icon size={22} />
    </button>
  );
}
