# Bangla cue maps — re-time each English frame to the Bangla voice

Times are seconds from the frame's start, measured from the Bangla voice track (aligned onsets,
± ~0.2s). For each frame: the new duration, then every reveal from the English frame with its new
time. **Set each listed reveal's timeline position to its new time.** Anything not listed (follow-
up tweens, blinks, settles, jitters) keeps its offset relative to the nearest listed reveal that
precedes it in the English file, and must still finish inside the new duration. Reveals may change
order versus English (Bangla is verb-final) — follow the new times, not the old order.

## 01-cold-open — HOST — duration 7.564s
VO: আসছে একদম নতুন ChatGPT Pro! সেই একই দুইশো ডলার দাম… আর ইউসেজ এখন মাত্র অর্ধেক!
| reveal (English cue @ old) | Bangla cue | new t |
|---|---|---|
| "ALL NEW!" star-burst pops (all-new @0.93) | নতুন | 1.03 |
| PRO box drops in (ChatGPT @1.44) | ChatGPT | 1.45 |
| "AS SEEN AT DEVDAY" pill (Pro! @2.21) | Pro! | 2.19 |
| mascot blink (~2.6) | — | 2.6 |
| blue "$200" star-burst + price roll (two-hundred-dollar @3.57, lands ~4.2) | দুইশো → ডলার | 3.74 (lands ~4.4) |
| banner "এখন মাত্র ½ ইউসেজ!" slaps in + gauge drains to 50% + grin widens (HALF @5.35) | অর্ধেক! | 6.78 |

## 02-freeze — silent — duration 1.4s (unchanged timing)
Re-draw 01's FINAL state with the Bangla copy (banner "এখন মাত্র ½ ইউসেজ!", "একদম নতুন!", "DevDay-তে দেখানো", "মাত্র $200 /মাস", gauge tag "অর্ধেক"), pill "ফ্যাক্ট চেক". Times unchanged.

## 03-its-real — CHECKER — duration 21.187s
VO: না, উনি ফাজলামি করছেন না। OpenAI তাদের দুইশো ডলারের Pro প্ল্যান আবার চালু করেছে… কিন্তু এখন পাবেন অর্ধেক। Codex ইউসেজ: Plus-এর বিশ গুণ ছিল — এখন দশ গুণ। GPT-6 Pro মেসেজ: সপ্তাহে দুইশোটা — এখন একশোটা।
| reveal | Bangla cue | new t |
|---|---|---|
| white card slides up + "CHATGPT PRO $200" pill (OpenAI @1.28) | OpenAI | 3.04 |
| headline line 1 "দাম সেই $200।" (two-hundred-dollar @2.94) | দুইশো | 4.20 |
| green chip "আবার চালু · 30 সেপ্টেম্বর" (reopened @2.35) | চালু | 6.83 |
| headline line 2 "ইউসেজ অর্ধেক।" (half @5.16) | অর্ধেক। | 9.91 |
| red underline under "অর্ধেক" (5.45) | — | 10.2 |
| row 1 label "Codex + ChatGPT Work ইউসেজ" (Codex @6.23) | Codex | 10.96 |
| "20x" + "PLUS" chip (twenty @7.34 / Plus @8.11) | বিশ | 13.11 (PLUS chip 13.3) |
| red strike through 20x (now @8.53) | এখন | 14.63 |
| red "10x" written (ten @8.75) | দশ | 14.98 |
| row 2 label "GPT-6 Pro মেসেজ / সপ্তাহ" (GPT-6 @9.52) | GPT-6 | 16.15 |
| "200" (two @12.07) | দুইশোটা | 18.61 |
| red strike (now @12.97) | এখন | 19.95 |
| red "100" written (one @13.36) | একশোটা। | 20.30 |
| pink "−50%" sticker (13.6) | — | 20.75 |

## 04-title — HOST — duration 2.401s
VO: কিন্তু দাঁড়ান… আরও কম আছে!
| reveal | Bangla cue | new t |
|---|---|---|
| "কিন্তু দাঁড়ান" flashes in (But @0.27) | কিন্তু | 0.05 |
| ellipsis dots tick in (dots ~0.43–0.9) | দাঁড়ান… | 0.75 / 0.95 / 1.15 |
| yellow star-burst explodes (there's @1.05) | আরও | 1.42 |
| "আরও" + white card "কম আছে!" slam in (LESS! @1.28 / card 1.34) | কম | 1.71 (card 1.77) |

## 05-the-tin — CHECKER — duration 22.238s
VO: ত্রিশে আগস্ট: OpenAI-এর Codex প্রধান বললেন, বিশ গুণ মানে কৌটার গায়ে যা লেখা, ঠিক তাই। দশই সেপ্টেম্বর: সাইন-আপ বন্ধ — নতুন মডেল Astra-র চাহিদা নাকি অভূতপূর্ব। তারপর DevDay। আর কৌটার গায়ে… এখন লেখা দশ গুণ।
| reveal | Bangla cue | new t |
|---|---|---|
| "30 আগস্ট" callout pops (August @0.30) | ত্রিশে | 0.1 |
| pill "OpenAI-এর Codex প্রধান" (OpenAI's @1.20) | OpenAI-এর | 1.70 |
| tin "20x" pulse (twenty-x @2.99) | বিশ | 5.24 |
| quote card builds word by word (does @3.52 … tin. @4.91) | কৌটার 6.58 · গায়ে 7.36 · যা 7.81 · লেখা, 7.99 · ঠিক 8.80 · তাই। 9.07 | 6.58 → 9.07 |
| camera pans to station 2 (September @5.59) | দশই | 9.75 |
| "10 সেপ্টেম্বর" callout (tenth @5.97) | সেপ্টেম্বর: | 10.06 |
| stamp "সাইন-আপ বন্ধ" slams (sign-ups @6.61) | সাইন-আপ | 11.38 |
| label "Astra-র চাহিদা:" (demand @7.47) | Astra-র | 13.66 |
| chip "“অভূতপূর্ব”" (unprecedented @9.41) | অভূতপূর্ব। | 15.35 |
| camera pans to station 3 (Then DevDay @10.62) | তারপর | 16.85 |
| "DevDay · 28–29 সেপ্টেম্বর" callout (DevDay @10.79) | DevDay। | 17.53 |
| footnote quote card (11.0) | — | 17.9 |
| camera eases in on the tin (tin… @11.95) | কৌটার | 19.10 |
| red strike through "20x" (now @12.46) | এখন | 20.38 |
| red "10x" written (ten-x @12.88) | দশ | 21.43 |

## 06-extras — HOST — duration 8.855s
VO: আর দেখুন কী দারুণ সব এক্সট্রা! পাঁচ ঘণ্টার কোনো লিমিট নেই! আড়াই হাজার ডলারের ক্রেডিট! আর… আনমিটারড এক্সট্রা!
| reveal | Bangla cue | new t |
|---|---|---|
| "বোনাস!" star-burst (look @0.43) | দেখুন | 0.2 |
| "সীমিত সময়ের অফার" pill + "দারুণ সব এক্সট্রা!" heading (amazing @0.93) | দারুণ | 0.76 |
| card 1 "5 ঘণ্টার লিমিট নেই!" (No @2.25) | পাঁচ | 2.38 |
| card 2 "$2,500 ক্রেডিট!" + 2,500 roll (twenty-five-hundred @3.57, lands 4.6) | আড়াই | 4.21 (lands ~5.2) |
| dashed "?" placeholder jitters (And… @5.16) | আর… | 6.71 |
| card 3 "আনমিটারড এক্সট্রা*!" (unmetered @6.44) | আনমিটারড | 7.44 |
| footnote "*এক্সট্রা কী, বলা হয়নি" (extras! @6.90) | এক্সট্রা! | 8.05 |

## 07-fair-is-fair — CHECKER — duration 18.455s
VO: সত্যি বলতে, পাঁচ ঘণ্টার লিমিট না থাকাটা আসলেই ভালো। ক্রেডিটটাও সত্যি — তবে শুধু পুরনো সাবস্ক্রাইবারদের জন্য, আর পুরনো কোটা শেষ উনত্রিশে অক্টোবর। আর এক্সট্রাগুলো? নামই বলেনি। ত্রিশে অক্টোবর থেকে সবাই পাবে দশ গুণ।
| reveal | Bangla cue | new t |
|---|---|---|
| card "ছোট অক্ষরের শর্ত" slides up (Fair's @0.26) | সত্যি | 0.05 |
| row 1 "5 ঘণ্টার ক্যাপ নেই" (no @1.15) | পাঁচ | 1.42 |
| red check (genuinely @2.56) | আসলেই | 3.37 |
| red "সত্যি" note (nice. @3.20) | ভালো। | 3.79 |
| row 2 "$2,500 ক্রেডিট" (The credit @3.92) | ক্রেডিটটাও | 4.58 |
| red check (real @4.48) | সত্যি | 5.24 |
| red "শুধু পুরনোদের জন্য" (only @4.99) | শুধু | 6.47 |
| red arrow + "পুরনো কোটা 29 অক্টোবর পর্যন্ত" (quota @7.25) | কোটা | 10.34 |
| row 3 "আনমিটারড এক্সট্রা" (extras @9.43) | এক্সট্রাগুলো? | 13.29 |
| red "?" scribble (9.7) | — | 13.6 |
| red "নামই বলেনি" (Never @10.28) | নামই | 14.49 |
| pink banner "30 অক্টোবর → সবাই পাবে 10x" (From @11.35) | ত্রিশে | 15.65 |
| "10x" box jolt (ten-x @13.06) | দশ | 17.85 |

## 08-unit-price — CHECKER — duration 20.063s
VO: এবার সুপারশপের প্রাইস ট্যাগের মতো করে পড়ুন। Plus: বিশ ডলারে এক গুণ ইউসেজ — মানে প্রতি ইউনিট বিশ ডলার। পুরনো Pro: দুইশো ডলারে বিশ গুণ। প্রতি ইউনিট দশ ডলার। অর্ধেক দাম। আসল মজাটাই ছিল এখানে।
| reveal | Bangla cue | new t |
|---|---|---|
| shelf plank slides in (Now @0.30) | এবার | 0.05 |
| chip "ইউনিট দাম = দাম ÷ ইউসেজ" (shelf @1.45) | ট্যাগের | 1.65 |
| PLUS box drops (Plus: @2.30) | Plus: | 3.66 |
| PLUS tag swings down (twenty @2.99) | বিশ | 5.00 |
| laser + "$20 / 1x" rolls in (twenty a unit @5.25) | বিশ (ডলার।) | 9.06 |
| OLD PRO box drops (The old Pro @6.53) | পুরনো | 10.25 |
| OLD PRO tag swings (two hundred @7.34) | দুইশো | 12.26 |
| laser + "$10 / 1x" (Ten @8.83) | দশ | 15.68 |
| red circle on $10 (Half @9.77) | অর্ধেক | 16.77 |
| red "অর্ধেক দাম!" (price. @10.03) | দাম। | 17.66 |
| double underline (whole point @11.44) | মজাটাই | 18.67 |

## 09-same-as-plus — HOST — duration 7.374s
VO: আর নতুন Pro? প্রতি ইউনিট মাত্র বিশ ডলার! একদম Plus-এর সমান! কী দারুণ… অফার?
| reveal | Bangla cue | new t |
|---|---|---|
| NEW PRO box slides onto shelf (new @0.50) | নতুন | 0.20 |
| "নতুন!" star-burst (Pro? @0.62) | Pro? | 0.60 |
| unit price rolls $10 → $20 (twenty @1.71, lands unit! @2.52) | মাত্র → ডলার! | 1.90 (lands 2.70) |
| burst "Plus-এর সমান!" pops (same @3.30) | Plus-এর | 3.99 |
| reference tag "PLUS · $20 / 1x" (Plus! @3.65) | সমান! | 4.30 |
| everything stops dead (What @4.54) | কী | 5.80 |
| burst droops (from 4.9) | দারুণ… | 6.0 |
| "!" → "?" swap + grin flattens (deal? @5.55) | অফার? | 6.71 |

## 10-every-plan — CHECKER — duration 13.831s
VO: ChatGPT-এর প্রতিটা প্ল্যানেই এখন প্রতি ইউনিট বিশ ডলার। Plus। Pro একশো। Pro দুইশো। এমনকি নতুন পাঁচশো ডলারের প্ল্যানটাও। কোনো পাইকারি ছাড় নেই। কোথাও না।
| reveal | Bangla cue | new t |
|---|---|---|
| chart card slides up (Every @0.30) | ChatGPT-এর | 0.05 |
| axis + baseline draw (plan @1.36) | প্ল্যানেই | 1.71 |
| dotted $20 guide (twenty @2.39) | বিশ | 3.67 |
| legend chips (unit. @3.12) | ডলার। | 3.93 |
| PLUS bars (Plus. @3.75) | Plus। | 4.74 |
| PRO $100 bars (Pro one hundred @4.61) | Pro (একশো) | 5.67 |
| PRO $200 blue $10 bar (Pro two hundred @5.80) | Pro (দুইশো) | 6.87 |
| PRO $200 pink $20 bar + "দ্বিগুণ" tag (6.36) | দুইশো। | 7.40 |
| PRO $500 pink bar + "নতুন" chip (brand-new @7.47) | নতুন | 8.49 |
| red flat line at $20 (No @9.43) | কোনো | 10.89 |
| red "সব $20" (discount. @9.98) | ছাড় | 11.72 |
| stamp "পাইকারি ছাড় নেই" (Anywhere. @10.75) | কোথাও | 12.71 |

## 11-one-shelf-over — CHECKER — duration 14.754s
VO: এদিকে, পাশের তাকেই: Claude Max বিশ গুণ। একই দুইশো ডলার। এখনও বিশ গুণ। এখনও প্রতি ইউনিট দশ ডলার। বেস প্ল্যান অবশ্য আলাদা — কিন্তু Anthropic এই বছর দুইবার লিমিট বাড়িয়েছে।
| reveal | Bangla cue | new t |
|---|---|---|
| shelf plank tracks in (Meanwhile @0.30) | এদিকে | 0.05 |
| aisle sign "তাক 2: $200-এর প্ল্যান" swings in (shelf @1.41) | তাকেই | 1.17 |
| split-tilt entry of both boxes (Claude @2.30) | Claude | 2.07 |
| "$200/মাস" tags drop (two hundred @4.31) | দুইশো | 4.77 |
| badge "এখনও 20x" (Still twenty-x @5.72) | এখনও (বিশ) | 6.0 |
| Claude "$10 / 1x" rolls + laser; ChatGPT "$20 / 1x" dimmed (ten a unit @6.87) | দশ | 8.62 |
| caveat footnote (Different @8.11) | বেস | 9.67 |
| sticker "লিমিট ↑ 6 মে" (raised @10.62) | দুইবার | 13.11 |
| sticker "লিমিট ↑ 22 সেপ্টেম্বর" (twice @11.35) | বাড়িয়েছে। | 13.86 |

## 12-models-cheaper — HOST — duration 5.788s
VO: কিন্তু দাঁড়ান! মডেলগুলো তো সস্তা হয়েছে! তাই অর্ধেক ডলারেও সমান কাজ! …তাই না?
| reveal | Bangla cue | new t |
|---|---|---|
| "কিন্তু দাঁড়ান!" flash (wait! @0.43) | দাঁড়ান! | 0.31 |
| pink star "মডেল এখন / 50% ছাড়!" (CHEAPER! @1.47) | সস্তা | 1.48 |
| tile "½ $" (half @2.33) | অর্ধেক | 2.64 |
| "×" + "½ দাম" (buys @2.83) | ডলারেও | 3.16 |
| "= সমান!" (as much! @3.26) | সমান | 3.68 |
| freeze + "!" → "?" + "?" bubble (Right? @3.85) | …তাই | 4.97 |

## 13-model-math — CHECKER — duration 19.785s
VO: অর্ধেক সত্যি। GPT-6 Sol-এর দাম অর্ধেক, তাই Sol ইউজাররা মোটামুটি সমান-সমান। Luna ইউজাররা বরং আউটপুট পাবে প্রায় বিশ শতাংশ বেশি। কিন্তু Astra সস্তা হয়নি। Astra ইউজাররা পাবে অর্ধেক। আর বেশিরভাগ মানুষ Pro দুইশো কিনেছিল এই Astra-র জন্যই।
| reveal | Bangla cue | new t |
|---|---|---|
| chart card + title pill (Partly. @0.30) | অর্ধেক সত্যি। | 0.05 |
| dashed 100% "কোনো বদল নেই" line (0.7) | — | 0.6 |
| row 1 "GPT-6 SOL" (GPT-6 @1.15) | GPT-6 | 1.43 |
| Sol bar grows to 100% (half price @2.52) | অর্ধেক, | 2.77 |
| "সমান-সমান" tag (break @4.52) | সমান-সমান। | 5.61 |
| row 2 "GPT-6 LUNA · আউটপুট" (Luna @5.33) | Luna | 6.71 |
| Luna bar 120% + "+20%" (twenty percent @6.49) | বিশ | 9.54 |
| row 3 "GPT-6 ASTRA" + "অপরিবর্তিত" (Astra @8.11) | Astra | 11.67 |
| Astra bar 50% + "অর্ধেক" tag + GPT-5.6 Sol row (half @10.45) | অর্ধেক। | 14.53 |
| red circle on Astra row (And Astra @11.39) | বেশিরভাগ | 15.61 |
| red arrow + "যেটার জন্য টাকা দিয়েছিলেন" (most people @12.16) | Astra-র | 18.39 |

## 14-pro-500 — HOST — duration 6.928s
VO: এতেও হচ্ছে না? নিয়ে নিন একদম নতুন Pro পাঁচশো! পঁচিশ গুণ! আল্ট্রাফাস্ট স্পিড! এখনই কল করুন!
| reveal | Bangla cue | new t |
|---|---|---|
| pill "এতেও হচ্ছে না?" (enough? @0.66) | হচ্ছে না? | 0.45 |
| speed lines streak in (Upgrade @1.24) | নিয়ে | 0.79 |
| GIANT PRO $500 crash + shove (Pro @2.21) | Pro | 1.94 |
| heavy landing / squash (hundred! @2.72) | পাঁচশো! | 2.45 |
| "25x!" star (Twenty-five-x! @3.22) | পঁচিশ | 2.73 |
| "আল্ট্রাফাস্ট!" whip + "Codex-এ সেকেন্ডে 300 টোকেন পর্যন্ত*" (Ultrafast @4.11) | আল্ট্রাফাস্ট | 3.79 |
| "এখনই কল করুন" button pops (Call @5.08) | এখনই | 5.89 |
| button press (now! @5.31) | করুন! | 6.39 |
(If the crash's internal driver uses a fixed CRASH_AT/CRASH_DUR, move CRASH_AT so first contact and the landing land on the new times; keep the `visibility: inherit` fix.)

## 15-why — CHECKER — duration 17.433s
VO: সেটাও প্রতি ইউনিট বিশ ডলার। আপনি কিনছেন স্পিড, ভ্যালু না। তাহলে এটা করল কেন? ক্যাপাসিটি। Astra-র চাহিদা ছিল অভূতপূর্ব, আর ইউসেজ অর্ধেক করলে দ্বিগুণ GPU না কিনেই সাইন-আপ আবার খোলা যায়।
| reveal | Bangla cue | new t |
|---|---|---|
| shelf tag swings in (Also @0.26) | সেটাও | 0.05 |
| "$20 / 1x" rolls (twenty @0.64) | বিশ | 1.96 |
| red underline (unit. @1.28) | ডলার। | 2.32 |
| red "= স্পিড," (buying speed @2.22) | স্পিড, | 4.08 |
| red "ভ্যালু না" (not value. @3.20) | ভ্যালু | 4.94 |
| tag scale-swaps to the corner (So why @4.48) | তাহলে | 6.00 |
| "ক্যাপাসিটি।" slams (Capacity. @5.55) | ক্যাপাসিটি। | 7.99 |
| GPU rack rises + heat lines (Astra @6.61) | Astra-র | 9.17 |
| chip "“অভূতপূর্ব” চাহিদা" (unprecedented @7.59) | অভূতপূর্ব, | 10.79 |
| chip "ইউসেজ ÷ 2" (halving @8.92) | অর্ধেক | 12.78 |
| chip "2× GPU" (twice @11.22) | দ্বিগুণ | 13.74 |
| red strike on "2× GPU" (GPUs. @11.69) | না কিনেই | 14.70 |
| door sign "সাইন-আপ: বন্ধ" swings in (8.30) | সাইন-আপ | 15.10 |
| sign flips to "সাইন-আপ: খোলা" (reopens sign-ups @9.86) | খোলা | 16.46 |

## 16-what-to-do — CHECKER — duration 20.021s
VO: তাহলে আপনি কী করবেন? বেশিরভাগ সময় GPT-6 Sol চালান? নিশ্চিন্ত থাকুন। Astra বা GPT-6 Pro-র উপর নির্ভর করেন? আপনি অর্ধেক হারাচ্ছেন — পুরনো কোটা আর ক্রেডিট কাজে লাগান, তারপর সিদ্ধান্ত নিন। Codex খুব বেশি চালান? এক মাস Claude Max বিশ গুণ চালিয়ে দেখুন।
| reveal | Bangla cue | new t |
|---|---|---|
| card "কী করবেন" + column headers (So what @0.30) | তাহলে | 0.05 |
| row 1 square "1" (Mostly @1.24) | বেশিরভাগ | 2.30 |
| pill "GPT-6 SOL" (GPT-6 Sol? @1.75) | GPT-6 | 3.62 |
| action "নিশ্চিন্ত থাকুন — টেরই পাবেন না" + "≈ একই" (Relax. @3.20) | নিশ্চিন্ত | 5.39 |
| row 2 square "2" (Rely @3.97) | Astra | 6.70 |
| pill "ASTRA / GPT-6 PRO" (Astra or GPT-6 Pro? @4.35) | — | 6.85 |
| chip "−50%" (losing half @6.61) | অর্ধেক | 10.06 |
| action line 1 "পুরনো কোটা (29 অক্টোবর পর্যন্ত) + $2,500 ক্রেডিট কাজে লাগান" (use up @7.17) | পুরনো | 11.62 |
| line 2 "…তারপর সিদ্ধান্ত নিন" (then decide @9.00) | তারপর | 14.13 |
| row 3 square "3" (Heavy @10.24) | Codex | 15.67 |
| pill "Codex-এর ভারী ইউজার" (Codex user? @10.50) | — | 15.75 |
| action "এক মাস Claude Max 20x চালিয়ে দেখুন" (Try Claude Max @11.48) | এক মাস | 17.39 |
| chip "একই $200" (month. @13.18) | দেখুন। | 19.44 |

## 17-verdict — CHECKER — duration 13.337s
VO: OpenAI নাম ফিরিয়েছে, দামও ফিরিয়েছে। শুধু প্ল্যানটা না। AI কোডিংয়ের সেরা সাবস্ক্রিপশনের গায়ে একসময় OpenAI-এর নাম ছিল। আজ… আর নেই।
| reveal | Bangla cue | new t |
|---|---|---|
| row "নাম" + white check (name @1.36) | নাম | 0.68 |
| row "দাম" + white check (price. @2.22) | দামও | 2.31 |
| row "প্ল্যান" appears (plan. @3.50) | প্ল্যানটা | 4.34 |
| red X over its check slot (plan. @3.50) | না। | 5.17 |
| rows scale-swap out (The best @4.27) | AI | 5.78 |
| award rosette "সেরা ভ্যালু / AI কোডিংয়ে" springs in (4.44) | সেরা | 6.85 |
| "OPENAI" plate drops onto hooks (OpenAI's @6.49) | OpenAI-এর | 9.67 |
| left hook releases, plate swings (Today… @7.72) | আজ… | 11.48 |
| plate falls out of frame (doesn't. @8.53) | নেই। | 12.85 |

## 18-outro — HOST — duration 5.786s
VO: ChatGPT Pro দুইশো! এখন আরও কম! শর্ত প্রযোজ্য। সব সোর্স ডেসক্রিপশনে!
| reveal | Bangla cue | new t |
|---|---|---|
| PRO box drops in (ChatGPT @0.27) | ChatGPT | 0.05 |
| "$200" star-burst (hundred! @1.47) | দুইশো! | 0.77 |
| banner "এখন আরও কম!" (Now @2.21) | এখন | 1.16 |
| mascot wink (less! @2.64) | কম! | 1.62 |
| fine-print crawl zips (Terms @3.34) | শর্ত | 1.91 |
| pill "পুরো বিশ্লেষণ + সব সোর্স ↓ ডেসক্রিপশনে" (Sources @4.62) | সব | 3.35 |

## 19-end-card — silent — duration 3.0s (unchanged timing)
Swap the copy only (see the copy deck).
