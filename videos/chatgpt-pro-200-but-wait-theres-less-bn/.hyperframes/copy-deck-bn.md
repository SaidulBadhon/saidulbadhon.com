# Bangla on-screen copy deck

Every visible string in the English frames → its Bangla replacement. Rules:

- **Keep unchanged:** product / model / company names (ChatGPT, ChatGPT Pro, Plus, Pro $100/$200/$500,
  Codex, ChatGPT Work, Claude, Claude Max, Anthropic, OpenAI, DevDay, GPT-6 Sol/Luna/Astra/Pro,
  GPT-5.6 Sol, API), prices, multipliers, percentages, chart axis ticks and value labels
  ($200, 20x, 10x, 1x, 50%, $2 / $10 ← $4 / $20 …), the "½" glyph, and the VHS readouts
  "⏸ PAUSE", "▶ PLAY", "SP …" (a real VCR shows them in English). Western digits everywhere.
- Where an English label kept a product name in caps (e.g. "CHATGPT PRO" band), keep it as is.
- A visible string not listed here: translate it in the same short, punchy, everyday Bangladeshi
  register (English kept for tech words), or keep it if it is a name/number.
- Bengali has no case: write it as given (any `text-transform: uppercase` only affects Latin).

## 01-cold-open (HOST)
| English | বাংলা |
|---|---|
| ALL NEW! | একদম নতুন! |
| AS SEEN AT DEVDAY | DevDay-তে দেখানো |
| ONLY | মাত্র |
| /MO | /মাস |
| PER MONTH | প্রতি মাসে |
| NOW WITH ½ THE USAGE! | এখন মাত্র ½ ইউসেজ! (keep "½" in its white box) |
| CONTENTS | পরিমাণ |
| FULL / HALF (gauge tag) | ভরা / অর্ধেক |

## 02-freeze (silent)
Same strings as 01 (it re-draws frame 1's final state), plus:
| FACT CHECK | ফ্যাক্ট চেক |

## All CHECKER frames (paused-tape chrome)
| FACT CHECK | ফ্যাক্ট চেক |
("⏸ PAUSE" and the "SP" counter stay English.)

## 03-its-real (CHECKER)
| English | বাংলা |
|---|---|
| CHATGPT PRO $200 | CHATGPT PRO $200 |
| REOPENED · SEPT 30 | আবার চালু · 30 সেপ্টেম্বর |
| SAME $200. | দাম সেই $200। |
| HALF THE USAGE. | ইউসেজ অর্ধেক। (the red underline goes under "অর্ধেক") |
| CODEX + CHATGPT WORK USAGE | Codex + ChatGPT Work ইউসেজ |
| PLUS (suffix chip) | PLUS |
| GPT-6 PRO MESSAGES / WEEK | GPT-6 Pro মেসেজ / সপ্তাহ |

## 04-title (HOST)
| BUT WAIT… | কিন্তু দাঁড়ান… |
| THERE'S | আরও |
| LESS! (white card) | কম আছে! |

## 05-the-tin (CHECKER)
| AUG 30 | 30 আগস্ট |
| OPENAI'S CODEX LEAD | OpenAI-এর Codex প্রধান |
| “DOES EXACTLY WHAT IT SAYS ON THE TIN.” | “কৌটার গায়ে যা লেখা, ঠিক তাই।” |
| SEPT 10 | 10 সেপ্টেম্বর |
| SIGN-UPS PAUSED (stamp) | সাইন-আপ বন্ধ |
| DEMAND FOR ASTRA: | Astra-র চাহিদা: |
| “UNPRECEDENTED” | “অভূতপূর্ব” |
| DEVDAY · SEPT 28–29 | DevDay · 28–29 সেপ্টেম্বর |
| “…HALF THE DOLLAR IN API SPEND.” — OPENAI | “…API খরচে অর্ধেক ডলার।” — OpenAI |
(tin label "PRO $200 / 20x" and the red "10x" stay.)

## 06-extras (HOST)
| LIMITED TIME | সীমিত সময়ের অফার |
| AMAZING EXTRAS! | দারুণ সব এক্সট্রা! |
| BONUS! | বোনাস! |
| BONUS 01 / 02 / 03 | বোনাস 01 / 02 / 03 |
| NO 5-HOUR LIMIT! | 5 ঘণ্টার লিমিট নেই! |
| $2,500 CREDIT! | $2,500 ক্রেডিট! |
| UNMETERED EXTRAS*! | আনমিটারড এক্সট্রা*! |
| *EXTRAS NOT SPECIFIED | *এক্সট্রা কী, বলা হয়নি |

## 07-fair-is-fair (CHECKER)
| THE FINE PRINT | ছোট অক্ষরের শর্ত |
| CLAIM / GRADE / NOTES | দাবি / গ্রেড / নোট |
| NO 5-HOUR CAP | 5 ঘণ্টার ক্যাপ নেই |
| $2,500 CREDIT | $2,500 ক্রেডিট |
| UNMETERED EXTRAS | আনমিটারড এক্সট্রা |
| LEGIT (marker) | সত্যি |
| EXISTING SUBS ONLY (marker) | শুধু পুরনোদের জন্য |
| OLD QUOTA ENDS OCT 29 (marker) | পুরনো কোটা 29 অক্টোবর পর্যন্ত |
| NEVER NAMED (marker) | নামই বলেনি |
| OCT 30 → EVERYONE GETS | 30 অক্টোবর → সবাই পাবে |
(the white "10x" box stays.)

## 08-unit-price (CHECKER)
| UNIT PRICE = PRICE ÷ USAGE | ইউনিট দাম = দাম ÷ ইউসেজ |
| OLD (sticker) | পুরনো |
| UNIT PRICE (tag label) | ইউনিট দাম |
| $20/MO · 1x PLUS | $20/মাস · 1x PLUS |
| $200/MO · 20x PLUS | $200/মাস · 20x PLUS |
| HALF PRICE! (marker) | অর্ধেক দাম! |

## 09-same-as-plus (HOST)
| NEW! | নতুন! |
| UNIT PRICE | ইউনিট দাম |
| SAME AS PLUS! → SAME AS PLUS? | Plus-এর সমান! → Plus-এর সমান? |
| PLUS · $20 / 1x | PLUS · $20 / 1x |

## 10-every-plan (CHECKER)
| PRICE PER 1x OF PLUS USAGE | Plus-এর 1x ইউসেজের দাম |
| UNTIL OCT 29 | 29 অক্টোবর পর্যন্ত |
| FROM OCT 30 | 30 অক্টোবর থেকে |
| DOUBLED | দ্বিগুণ |
| NEW | নতুন |
| ALL $20 (marker) | সব $20 |
| NO BULK DISCOUNT (stamp) | পাইকারি ছাড় নেই |

## 11-one-shelf-over (CHECKER)
| AISLE 2: | তাক 2: |
| $200 PLANS | $200-এর প্ল্যান |
| $200/MO | $200/মাস |
| UNIT PRICE | ইউনিট দাম |
| STILL 20x | এখনও 20x |
| *EACH VS. ITS OWN $20 PLAN — COMPARE THE DIRECTION, NOT THE EXACT AMOUNT | *প্রতিটি নিজ নিজ $20 প্ল্যানের তুলনায় — দিকটা দেখুন, হুবহু পরিমাণ না |
| LIMITS ↑ / MAY 6 | লিমিট ↑ / 6 মে |
| LIMITS ↑ / SEPT 22 | লিমিট ↑ / 22 সেপ্টেম্বর |

## 12-models-cheaper (HOST)
| BUT WAIT! | কিন্তু দাঁড়ান! |
| MODELS NOW | মডেল এখন |
| 50% OFF! | 50% ছাড়! |
| ½ PRICE | ½ দাম |
| SAME! → SAME? | সমান! → সমান? |

## 13-model-math (CHECKER)
| TOKENS YOU GET vs. THE OLD PRO $200 | পুরনো Pro $200-এর তুলনায় কত টোকেন পাবেন |
| NO CHANGE | কোনো বদল নেই |
| GPT-6 LUNA · OUTPUT | GPT-6 LUNA · আউটপুট |
| $10 / $50 · UNCHANGED | $10 / $50 · অপরিবর্তিত |
| $4 / $20 · STILL ON SALE | $4 / $20 · এখনও বিক্রি হচ্ছে |
| BREAK EVEN | সমান-সমান |
| HALF | অর্ধেক |
| THE ONE YOU PAID FOR (marker) | যেটার জন্য টাকা দিয়েছিলেন |

## 14-pro-500 (HOST)
| NOT ENOUGH? | এতেও হচ্ছে না? |
| PER MONTH | প্রতি মাসে |
| CONTENTS | পরিমাণ |
| FULL | ভরা |
| ULTRAFAST! | আল্ট্রাফাস্ট! |
| UP TO 300 TOKENS/SEC IN CODEX* | Codex-এ সেকেন্ডে 300 টোকেন পর্যন্ত* |
| CALL NOW | এখনই কল করুন |
| NEW! | নতুন! |

## 15-why (CHECKER)
| UNIT PRICE | ইউনিট দাম |
| $500/MO · 25x PLUS | $500/মাস · 25x PLUS |
| = SPEED, / NOT VALUE (marker) | = স্পিড, / ভ্যালু না |
| CAPACITY. | ক্যাপাসিটি। |
| “UNPRECEDENTED” DEMAND | “অভূতপূর্ব” চাহিদা |
| ALLOWANCE ÷ 2 | ইউসেজ ÷ 2 |
| SIGN-UPS: / CLOSED → OPEN | সাইন-আপ: / বন্ধ → খোলা |
| 2× GPUs | 2× GPU |

## 16-what-to-do (CHECKER)
| WHAT TO DO | কী করবেন |
| IF YOU MOSTLY USE… | আপনি বেশি চালান… |
| DO THIS | তাহলে |
| RELAX — YOU'LL BARELY NOTICE | নিশ্চিন্ত থাকুন — টেরই পাবেন না |
| ≈ SAME | ≈ একই |
| USE THE OLD QUOTA (TO OCT 29) + THE $2,500 CREDIT | পুরনো কোটা (29 অক্টোবর পর্যন্ত) + $2,500 ক্রেডিট কাজে লাগান |
| …THEN DECIDE | …তারপর সিদ্ধান্ত নিন |
| HEAVY CODEX USE | Codex-এর ভারী ইউজার |
| TRY CLAUDE MAX 20x FOR A MONTH | এক মাস Claude Max 20x চালিয়ে দেখুন |
| SAME $200 | একই $200 |

## 17-verdict (CHECKER)
| THE VERDICT | রায় |
| THE NAME | নাম |
| THE PRICE | দাম |
| THE PLAN | প্ল্যান |
| BEST VALUE | সেরা ভ্যালু |
| IN AI CODING | AI কোডিংয়ে |
| OPENAI (name plate) | OPENAI |

## 18-outro (HOST)
| /MO | /মাস |
| NOW WITH LESS! | এখন আরও কম! |
| fine-print crawl | *শর্ত প্রযোজ্য · 30 অক্টোবর থেকে 10x PLUS · প্রতি 1x $20 · GPT-6 PRO সপ্তাহে 100 · এক্সট্রা অনির্দিষ্ট · পাইকারি ছাড় নেই · একই $200 |
| FULL BREAKDOWN + SOURCES ↓ IN THE DESCRIPTION | পুরো বিশ্লেষণ + সব সোর্স ↓ ডেসক্রিপশনে |

## 19-end-card (silent)
| THE FULL BREAKDOWN + SOURCES | পুরো বিশ্লেষণ + সব সোর্স |
| CHATGPT PRO $200 IS BACK, WITH HALF THE USAGE | ChatGPT Pro $200 ফিরেছে, ইউসেজ অর্ধেক |
| saidulbadhon.com | saidulbadhon.com |
