import { heygenJSON, heygenAuthHeaders } from "file:///C:/Users/sb_sa/.agents/skills/media-use/audio/scripts/lib/heygen.mjs";
const p = await heygenJSON("/voices/speech", { method: "POST", headers: heygenAuthHeaders(), body: { text: "But wait, there's less!", voice_id: "5f9c155f4108437f970c308c95b06e11", speed: 1.1 } });
console.log((p.data ?? p).audio_url);
