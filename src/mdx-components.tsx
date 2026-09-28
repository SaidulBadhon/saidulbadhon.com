import type { ComponentProps } from "react";
import Link from "next/link";

/** Links to pages on this site navigate without a full reload, and links to
 *  other sites open in a new tab. */
function MdxLink({ href = "", ...props }: ComponentProps<"a">) {
  if (href.startsWith("/")) {
    return <Link href={href} {...props} />;
  }
  if (/^https?:\/\//.test(href)) {
    return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
  }
  return <a href={href} {...props} />;
}

// Overrides for the elements markdown renders to in blog posts. Required by
// @next/mdx; styling comes from the prose classes on the post page. Not typed
// as MDXComponents, which reads the global JSX namespace, and here that comes
// from the outdated @types/react that react-vertical-timeline-component pulls in.
const components = {
  a: MdxLink,
};

export function useMDXComponents() {
  return components;
}
