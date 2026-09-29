import type { Project } from "../types";
import cover from "./cover.webp";
import onboarding from "./onboarding.webp";
import collectibles from "./collectibles.webp";
import website from "./website.webp";

const project: Project = {
  slug: "zodi-world",
  title: "Zodi World | Astrology App for iOS and Android",
  description:
    "An astrology app with daily horoscopes, tarot and crystal draws, a birth chart and collectible zodiac art, which I rebuilt in React Native for a client on Fiverr.",
  longDescription:
    "Zodi World was an astrology app for iOS and Android built on one idea: \"In Zodi World there are only two rules: have fun, and make it pretty.\" After a short onboarding (a name, a birth date, time and place, and a main sign), it gave each user a daily horoscope, a tarot card and a crystal of the day, a monthly horoscope, and a birth chart that explained their sun, moon and rising signs, calculated from their natal chart down to their Mercury through Pluto placements. Tarot and crystal draws and the user's chart placements unlocked original art for their collectibles gallery, alongside limited-edition collectibles for each zodiac season and a premium birth-element collectible behind a subscription. The founder had built the first version in Draftbit, a no-code app builder. I joined through Fiverr in May 2023 to design and wire up its paywall, then rewrote the whole app by hand in React Native and Expo and delivered it that July: sign-in, the onboarding flow, the home screen, horoscopes, tarot, the chart, the collectibles, the Adapty paywall, push reminders and account deletion, on a Supabase backend and an astrology API that calculates each natal chart. Over the following months I added the daily crystal, a detail page for each collectible, sharing to Instagram Stories and a redesigned home screen with daily and monthly readings. The app has since been taken off Google Play, and its Supabase project no longer exists. The phone screens are the app's final code running in a browser, with made-up data for a demo user; only screens whose art ships inside the app are shown.",
  type: "Project I worked on",
  role: "Freelance React Native Developer",
  duration: "May 2023 - Oct 2023",
  icon: "moon",
  gradient: "from-purple-500 to-indigo-400",
  tags: ["Mobile App", "React Native", "Astrology", "Subscriptions", "Freelance"],
  technologies: [
    "React Native",
    "Expo",
    "JavaScript",
    "React Navigation",
    "Supabase",
    "Adapty",
    "Expo Notifications",
    "EAS Build",
  ],
  features: [
    "A hand-written React Native and Expo app that replaced the founder's first version, built in the no-code tool Draftbit",
    "Email sign-in with a one-time code or a password, through Supabase Auth",
    "Onboarding that asks for a name and for email and push consent, then a birth date, time and place, with a place search",
    "Natal charts from an astrology API: the sun, moon and rising signs, and the Mercury through Pluto placements",
    "A home screen of daily cards for a horoscope, a tarot card and a crystal of the day, plus a monthly horoscope",
    "A limited-edition collectible for each zodiac season, claimed from the home screen",
    "A collectibles gallery in zodiac, tarot, crystal and special tabs, with a detail page for each piece",
    "A premium birth-element collectible, based on the elements in the user's natal chart, behind an Adapty paywall with subscriptions on iOS and Android",
    "Push notification reminders for daily readings, and sharing collectibles to Instagram Stories",
    "Settings to change the main sign, contact support, read the legal pages and delete the account",
  ],
  links: {},
  // The first image is the cover. The rest appear in the gallery.
  images: [
    { image: cover, caption: "Sign-in, the home screen with the daily cards and the Aries season collectible, and the birth place search." },
    { image: onboarding, caption: "Onboarding: a name, then the birth date and time used to calculate the natal chart." },
    { image: collectibles, caption: "Some of the collectible art that ships with the app, including the Aries season token and the card back." },
    { image: website, caption: "The zodi.world home page, which linked to the App Store and Google Play." },
  ],
};

export default project;
