// For every element already carrying data-layout-allow-overlap (containers reviewed by eye),
// copy the marker onto each text-bearing descendant tag (div/span/h1-h6/p) in its subtree.
import { readFileSync, writeFileSync } from "node:fs";
const VOID = new Set(["br", "img", "input", "meta", "link", "hr", "source", "wbr", "area", "base", "col", "embed", "param", "track"]);
for (const file of process.argv.slice(2)) {
  let s = readFileSync(file, "utf8");
  const tagRe = /<(\/?)([a-zA-Z][\w:-]*)([^<>]*?)(\/?)>/g;
  const inserts = [];
  let depthStack = []; // depths of open flagged containers
  let depth = 0;
  for (const m of s.matchAll(tagRe)) {
    const [, close, name, attrs, selfClose] = m;
    const lname = name.toLowerCase();
    if (close) {
      depth--;
      while (depthStack.length && depthStack.at(-1) > depth) depthStack.pop();
      continue;
    }
    const inside = depthStack.length > 0;
    const flagged = /\sdata-layout-allow-overlap\b/.test(attrs);
    if (inside && !flagged && /^(div|span|h[1-6]|p)$/.test(lname)) inserts.push(m.index + 1 + name.length);
    if (!selfClose && !VOID.has(lname)) {
      depth++;
      if (flagged) depthStack.push(depth);
    }
  }
  for (const i of inserts.reverse()) s = s.slice(0, i) + " data-layout-allow-overlap" + s.slice(i);
  writeFileSync(file, s);
  console.log(file, "+", inserts.length);
}
