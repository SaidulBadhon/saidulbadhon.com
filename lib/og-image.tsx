import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import { toImage, type Project } from "@/content/projects";
import { SITE_URL, site } from "./site";

// The preview card shown when a page is shared on LinkedIn, X, Slack and the
// like. Each route's opengraph-image.tsx renders one with its own text.
// File paths are spelled out from a fixed folder so the build only bundles
// those folders, not the whole project.

export const ogSize = { width: 1200, height: 630 };

const assets = Promise.all([
  readFile(path.join(process.cwd(), "lib", "fonts", "inter-latin-400-normal.woff")),
  readFile(path.join(process.cwd(), "lib", "fonts", "inter-latin-600-normal.woff")),
  readFile(path.join(process.cwd(), "public", "profileImg.jpeg")),
]);

/** Tailwind colours used in project gradients, for the accent on their cards. */
const colors: Record<string, string> = {
  "amber-500": "#f59e0b",
  "blue-500": "#3b82f6",
  "blue-600": "#2563eb",
  "cyan-400": "#22d3ee",
  "cyan-500": "#06b6d4",
  "fuchsia-400": "#e879f9",
  "indigo-400": "#818cf8",
  "indigo-500": "#6366f1",
  "orange-500": "#f97316",
  "pink-500": "#ec4899",
  "rose-500": "#f43f5e",
  "sky-500": "#0ea5e9",
  "violet-500": "#8b5cf6",
  "violet-600": "#7c3aed",
};

/** A Tailwind gradient like "from-sky-500 to-cyan-400" as a CSS gradient, or
 *  the site's pink and lavender for colours not in the table above. */
export function accentFrom(gradient?: string): string {
  const from = colors[gradient?.match(/from-([a-z]+-\d+)/)?.[1] ?? ""];
  const to = colors[gradient?.match(/to-([a-z]+-\d+)/)?.[1] ?? ""];
  return from && to
    ? `linear-gradient(90deg, ${from}, ${to})`
    : "linear-gradient(90deg, #f472b6, #818cf8)";
}

/** Shortens text to about `max` characters, at a word break. */
function clip(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, text.lastIndexOf(" ", max)).replace(/[\s,.;:–-]+$/, "")}…`;
}

/**
 * A project's cover as a JPEG data URL, since the card renderer can't read
 * WebP. Bundled images are served as e.g. /_next/static/media/cover.<hash>.webp,
 * so the source file is found by that name in the project's folder. Resolves
 * to undefined if it isn't there, and the card goes without.
 *
 * The cards are rendered at build time, so the screenshots are left out of the
 * server bundle (turbopackIgnore) rather than deployed a second time.
 */
export async function projectCover(project: Project) {
  const image = project.images[0] && toImage(project.images[0]).image;
  const name = image?.src.match(/\/([^/]+)\.[\w-]+\.(\w+)$/);
  if (!image || !name) return undefined;
  const file = path.join(
    /*turbopackIgnore: true*/ process.cwd(),
    "content",
    "projects",
    project.slug,
    `${name[1]}.${name[2]}`
  );
  if (!existsSync(file)) return undefined;
  const jpeg = await sharp(file).resize({ width: 1240, withoutEnlargement: true }).jpeg({ quality: 82 }).toBuffer();
  return {
    src: `data:image/jpeg;base64,${jpeg.toString("base64")}`,
    aspectRatio: image.width / image.height,
  };
}

type OgCard = {
  /** Small caps label above the title, e.g. "Blog". Without one, the text is
   *  centred in the space above the footer. */
  eyebrow?: string;
  title: string;
  /** Second line of the title, in the accent colours. */
  subtitle?: string;
  description?: string;
  /** Right of the footer, e.g. the publish date. */
  meta?: string;
  /** A CSS gradient; see accentFrom(). */
  accent?: string;
  /** A screenshot beside the text; see projectCover(). */
  image?: Awaited<ReturnType<typeof projectCover>>;
};

export async function ogImage({
  eyebrow,
  title,
  subtitle,
  description,
  meta,
  accent = accentFrom(),
  image,
}: OgCard) {
  const [regular, semibold, photo] = await assets;
  // With a screenshot, the text gets the left half of the card.
  const textWidth = image ? 560 : 1000;
  const titleSize = image
    ? title.length > 30 ? 52 : 64
    : title.length > 70 ? 50 : title.length > 40 ? 60 : 72;
  const descriptionSize = image ? 24 : 28;
  const imageWidth = 640;

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          padding: "64px 72px",
          backgroundColor: "#f9fafb",
          backgroundImage:
            "radial-gradient(circle at 85% -10%, #fbe2e3 0%, rgba(251,226,227,0) 45%), radial-gradient(circle at -5% 35%, #dbd7fb 0%, rgba(219,215,251,0) 45%)",
          fontFamily: "Inter",
          color: "#030712",
        }}
      >
        {image && (
          <div
            style={{
              position: "absolute",
              left: 680,
              top: 96,
              display: "flex",
              flexDirection: "column",
              width: imageWidth,
              overflow: "hidden",
              borderRadius: 18,
              border: "1px solid #e5e7eb",
              backgroundColor: "#ffffff",
              boxShadow: "0 30px 60px -12px rgba(17, 24, 39, 0.28)",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 8,
                padding: "14px 18px",
                borderBottom: "1px solid #e5e7eb",
                backgroundColor: "#f9fafb",
              }}
            >
              {["#ff5f57", "#febc2e", "#28c840"].map((color) => (
                <div key={color} style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: color }} />
              ))}
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element -- rendered to a PNG, not a page */}
            <img src={image.src} alt="" width={imageWidth} height={Math.round(imageWidth / image.aspectRatio)} />
          </div>
        )}

        {eyebrow && (
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 44, height: 5, borderRadius: 3, backgroundImage: accent }} />
            <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: 4, color: "#6b7280", textTransform: "uppercase" }}>
              {eyebrow}
            </div>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", width: textWidth, marginTop: eyebrow ? 40 : "auto" }}>
          <div style={{ fontSize: titleSize, fontWeight: 600, lineHeight: 1.12, letterSpacing: -1.5 }}>
            {clip(title, 100)}
          </div>
          {subtitle && (
            <div
              style={{
                marginTop: 10,
                paddingBottom: 6,
                fontSize: image ? 40 : 44,
                fontWeight: 600,
                lineHeight: 1.15,
                letterSpacing: -1,
                backgroundImage: accent,
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {subtitle}
            </div>
          )}
          {description && (
            <div style={{ marginTop: 24, fontSize: descriptionSize, lineHeight: 1.45, color: "#4b5563" }}>
              {clip(description, image ? 110 : 160)}
            </div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", marginTop: "auto" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- rendered to a PNG, not a page */}
          <img
            src={`data:image/jpeg;base64,${photo.toString("base64")}`}
            alt=""
            width={60}
            height={60}
            style={{ borderRadius: 30, border: "3px solid #ffffff", boxShadow: "0 4px 12px rgba(0,0,0,0.12)" }}
          />
          <div style={{ display: "flex", flexDirection: "column", marginLeft: 18 }}>
            <div style={{ fontSize: 26, fontWeight: 600, color: "#111827" }}>{site.name}</div>
            <div style={{ fontSize: 20, color: "#6b7280" }}>{new URL(SITE_URL).host}</div>
          </div>
          {meta && <div style={{ marginLeft: "auto", fontSize: 22, color: "#6b7280" }}>{meta}</div>}
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Inter", data: regular, weight: 400, style: "normal" },
        { name: "Inter", data: semibold, weight: 600, style: "normal" },
      ],
    }
  );
}
