import { heygenJSON, heygenAuthHeaders } from "file:///C:/Users/sb_sa/.agents/skills/media-use/audio/scripts/lib/heygen.mjs";
try {
  const p = await heygenJSON("/voices/speech", { method: "POST", headers: heygenAuthHeaders(), body: { text: "But wait, there's less!", voice_id: "5f9c155f4108437f970c308c95b06e11", speed: 1.1 } });
  const inner = p.data ?? p;
  console.log("keys", Object.keys(inner), "url", inner.audio_url?.slice(0, 120));
  try { const r = await fetch(inner.audio_url); console.log("audio fetch", r.status, r.headers.get("content-type")); }
  catch (e) { console.log("audio fetch error", e.message, e.cause?.code, e.cause?.message); }
} catch (e) { console.log("POST error", e.message, e.cause?.code, e.cause?.message); }
