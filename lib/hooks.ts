import { useActiveSectionContext } from "@/context/active-section-context";
import { useEffect, useSyncExternalStore } from "react";
import { useInView } from "react-intersection-observer";
import type { SectionName } from "./types";

/**
 * Marks the section active in the nav while it is in view. A section taller
 * than the viewport can never be 75% visible, so tall sections pass a
 * rootMargin instead, e.g. a band across the middle of the screen.
 */
export function useSectionInView(
  sectionName: SectionName,
  threshold = 0.75,
  rootMargin?: string
) {
  const { ref, inView } = useInView({
    threshold,
    rootMargin,
  });
  const { setActiveSection, timeOfLastClick } = useActiveSectionContext();

  useEffect(() => {
    if (inView && Date.now() - timeOfLastClick > 1000) {
      setActiveSection(sectionName);
    }
  }, [inView, setActiveSection, timeOfLastClick, sectionName]);

  return {
    ref,
  };
}

const noopSubscribe = () => () => {};

/** False during server rendering and hydration, true after. For UI that can
 *  only exist in the browser, like portals into document.body. */
export function useIsClient() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
}
