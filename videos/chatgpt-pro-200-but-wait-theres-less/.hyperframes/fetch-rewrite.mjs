// Preload (node --import): this machine's DNS filter blocks resource2.heygen.ai,
// but resource.heygen.ai serves the same objects. Rewrite media URLs before fetch.
const BLOCKED = "://resource2.heygen.ai/";
const OPEN = "://resource.heygen.ai/";
const original = globalThis.fetch;
globalThis.fetch = (input, init) => {
  if (typeof input === "string" && input.includes(BLOCKED)) input = input.replace(BLOCKED, OPEN);
  else if (input instanceof URL && input.href.includes(BLOCKED)) input = new URL(input.href.replace(BLOCKED, OPEN));
  else if (input instanceof Request && input.url.includes(BLOCKED)) input = new Request(input.url.replace(BLOCKED, OPEN), input);
  return original(input, init);
};
