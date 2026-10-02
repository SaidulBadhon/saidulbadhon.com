import localFont from "next/font/local";

/** Noto Sans Bengali, for the Bangla channel name and episode titles on
 *  /shortoprojojjo. The rest of the site is Latin-only and uses Inter. */
export const bengali = localFont({
  src: "./noto-sans-bengali-800.woff2",
  weight: "800",
  display: "swap",
});
