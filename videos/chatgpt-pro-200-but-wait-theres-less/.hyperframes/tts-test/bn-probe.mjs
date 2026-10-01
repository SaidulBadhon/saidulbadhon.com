import { heygenJSON, heygenAuthHeaders } from "file:///C:/Users/sb_sa/.agents/skills/media-use/audio/scripts/lib/heygen.mjs";
import { writeFileSync } from "node:fs";
const tests = [
  ["host-paul-excited", "9aa98f478ac94b3a85272470dff2aae4", "কিন্তু দাঁড়ান… আরও কম আছে!", 1.1],
  ["checker-elizabeth-serious", "31cb5883a81d486e9f2ffea8464dabc4", "উনি মজা করছেন না। ব্যবহার এখন অর্ধেক।", 1.0],
];
for (const [name, voice_id, text, speed] of tests) {
  try {
    const p = await heygenJSON("/voices/speech", { method: "POST", headers: heygenAuthHeaders(), body: { text, voice_id, speed, language: "bn" } });
    const d = p.data ?? p;
    const url = d.audio_url.replace("://resource2.heygen.ai/", "://resource.heygen.ai/");
    const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
    writeFileSync(`.hyperframes/tts-test/${name}.mp3`, buf);
    console.log(name, "dur", d.duration, "words", JSON.stringify((d.word_timestamps || []).map((w) => [w.word, +w.start.toFixed(2)])));
  } catch (e) { console.log(name, "ERR", e.message); }
}
