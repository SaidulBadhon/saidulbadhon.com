import Link from "next/link";
import JsonLd from "@/components/json-ld";
import LegalPage from "@/components/legal-page";
import { channel, publisher } from "@/content/shorto-projojjo";
import { absoluteUrl, pageMetadata, site } from "@/lib/site";
import { PERSON_ID, WEBSITE_ID, breadcrumbs, graph } from "@/lib/structured-data";

// The privacy policy Google (YouTube API Services) and Meta (Facebook Login and the
// Graph API) ask for before the upload app can go live. Google's reviewers check it
// against their policies, so keep these in it: that the app uses YouTube API
// Services, links to the YouTube Terms of Service, the Google Privacy Policy and
// Google's revoke-access page, the Limited Use statement, and a way to ask for
// deletion. The #data-deletion section is the "data deletion instructions" URL for Meta;
// the terms of service are their own page.

const { path, updated } = publisher.privacyPolicy;
const title = `Privacy Policy: ${publisher.name}`;
const description = `How ${publisher.name}, the app that uploads ${channel.name} episodes to YouTube and Facebook, handles Google and Facebook data: what it accesses, how it's stored, and how to revoke access or have it deleted.`;
const deletionEmail = `mailto:${site.email}?subject=${encodeURIComponent(`Data deletion: ${publisher.name}`)}`;

export const metadata = pageMetadata({ path, title, description });

const structuredData = graph(
  {
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#page`,
    url: absoluteUrl(path),
    name: title,
    description,
    inLanguage: "en",
    dateModified: updated,
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": PERSON_ID },
  },
  breadcrumbs([
    { name: "Home", path: "/" },
    { name: channel.name, path: "/shortoprojojjo" },
    { name: "Privacy policy", path },
  ])
);

export default function Page() {
  return (
    <main className="px-4 pb-28 sm:px-6">
      <JsonLd data={structuredData} />
      <LegalPage
        title="Privacy policy"
        updated={updated}
        lead={
          <>
            {publisher.name} uploads the {channel.name} episodes to the channel&rsquo;s own YouTube
            channel and Facebook Page. This page explains what it accesses on Google and Facebook,
            what it keeps, and how to revoke its access or have your data deleted.
          </>
        }
      >
        <h2 id="summary">In short</h2>
        <ul>
          <li>
            The app only uploads {channel.name}&rsquo;s own videos to its own YouTube channel and
            Facebook Page. Only the channel&rsquo;s owner signs in to it.
          </li>
          <li>It uses YouTube API Services (Google) and Facebook Login and the Graph API (Meta).</li>
          <li>
            Sign-in tokens are kept private. Nothing is sold, shared, used for advertising or used
            to train AI models.
          </li>
          <li>
            It doesn&rsquo;t collect anything from people who watch the videos, and it sets no
            cookies.
          </li>
          <li>
            You can revoke its access at any time, and ask for your data to be deleted within 7
            days (<a href="#data-deletion">how</a>).
          </li>
        </ul>

        <h2 id="about">About the app</h2>
        <p>
          {publisher.name} (&ldquo;the app&rdquo;) is the publishing tool behind{" "}
          <Link href="/shortoprojojjo">
            {channel.name} (<span lang="bn">{channel.nameBn}</span>)
          </Link>
          , a Bangla tech video channel. When an episode is finished, the app uploads the video,
          its thumbnail and its text to the channel&rsquo;s YouTube channel and Facebook Page, so it
          doesn&rsquo;t have to be done by hand.
        </p>
        <p>
          The app is made and run by {site.name}, an individual based in {site.location.city},{" "}
          {site.location.country}, who is responsible for the data described here (the data
          controller). It is not a public service: it has no sign-up and no user accounts, and
          the only person who signs in to it is the channel&rsquo;s owner, to publish the
          channel&rsquo;s own videos.
        </p>

        <h2 id="data-accessed">What the app accesses</h2>
        <h3 id="google">From Google (YouTube)</h3>
        <p>
          The app uses <strong>YouTube API Services</strong>. When the channel owner signs in with
          Google and grants access, the app can manage the channel&rsquo;s YouTube videos, and uses
          that access to:
        </p>
        <ul>
          <li>read the channel&rsquo;s ID and name, to check it&rsquo;s uploading to the right channel;</li>
          <li>
            upload video files and set each video&rsquo;s title, description, tags, thumbnail,
            captions, language, category, privacy status and publish time;
          </li>
          <li>read back each new video&rsquo;s ID, link and processing status, to confirm the upload worked.</li>
        </ul>
        <p>
          It doesn&rsquo;t read the channel&rsquo;s comments, subscribers, analytics or messages, and it
          has no access to anything outside YouTube, such as Gmail, Drive or contacts.
        </p>

        <h3 id="facebook">From Facebook (Meta)</h3>
        <p>
          When the channel owner signs in with Facebook Login and grants access, the app receives:
        </p>
        <ul>
          <li>the owner&rsquo;s public profile (name and Facebook user ID), which Facebook Login always shares;</li>
          <li>the list of Pages the owner manages, to pick the {channel.name} Page;</li>
          <li>
            a Page access token for that Page, used to publish videos and Reels to it with their
            title, description and thumbnail;
          </li>
          <li>each published video&rsquo;s ID, link and processing status, to confirm it went up.</li>
        </ul>
        <p>
          It doesn&rsquo;t read the Page&rsquo;s messages, comments, followers or insights, and nothing
          from the owner&rsquo;s personal profile beyond the name and ID.
        </p>

        <h3 id="viewers">From viewers</h3>
        <p>
          Nothing. The app never sees who watches, likes, comments on or shares the videos.
        </p>

        <h2 id="use">How the information is used</h2>
        <p>
          Only to publish and manage the channel&rsquo;s own uploads: to put each episode on the
          right channel and Page, with the right details, and to confirm it went through. The
          information isn&rsquo;t used for advertising, profiling or marketing, isn&rsquo;t sold or
          rented, and isn&rsquo;t used to develop, improve or train AI or machine-learning models.
        </p>

        <h2 id="storage">How it&rsquo;s stored, and for how long</h2>
        <ul>
          <li>
            <strong>Sign-in tokens</strong> (the Google and Facebook access and refresh tokens, and
            the Facebook Page token) are kept in private, access-controlled storage that only{" "}
            {site.name} can reach. They are never published on this website, never committed to
            source control and never shared. They are kept while the app is in use, and deleted as
            soon as access is revoked or the app is retired.
          </li>
          <li>
            <strong>Upload results</strong> (each video&rsquo;s ID, link and status) are used to
            confirm the upload and are kept for no more than 30 days. The exception is the public
            link to each published episode, which may be listed on the{" "}
            <Link href="/shortoprojojjo">{channel.name} page</Link> on this website.
          </li>
          <li>
            The app talks to Google and Meta directly over encrypted connections (HTTPS). It keeps
            no other copies of account data.
          </li>
        </ul>

        <h2 id="sharing">Sharing</h2>
        <p>
          The app doesn&rsquo;t share, sell, rent or transfer any of this information to anyone. The
          only parties that receive data are Google and Meta themselves, as part of each upload,
          and their own handling of it is covered by the{" "}
          <a href="https://www.google.com/policies/privacy" target="_blank" rel="noopener noreferrer">
            Google Privacy Policy
          </a>{" "}
          and the{" "}
          <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer">
            Meta Privacy Policy
          </a>
          . The only exception would be disclosure required by law.
        </p>

        <h2 id="google-policy">Google API Services User Data Policy</h2>
        <p>
          {publisher.name}&rsquo;s use and transfer to any other app of information received from
          Google APIs will adhere to the{" "}
          <a
            href="https://developers.google.com/terms/api-services-user-data-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google API Services User Data Policy
          </a>
          , including the Limited Use requirements.
        </p>

        <h2 id="terms">YouTube and Meta terms</h2>
        <p>
          The app uses YouTube API Services. By using it, you agree to be bound by the{" "}
          <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer">
            YouTube Terms of Service
          </a>
          , and Google&rsquo;s use of your information is described in the{" "}
          <a href="https://www.google.com/policies/privacy" target="_blank" rel="noopener noreferrer">
            Google Privacy Policy
          </a>
          . Publishing to Facebook is subject to Meta&rsquo;s{" "}
          <a href="https://www.facebook.com/terms" target="_blank" rel="noopener noreferrer">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="https://developers.facebook.com/terms" target="_blank" rel="noopener noreferrer">
            Platform Terms
          </a>
          . The full terms for using the app are in its{" "}
          <Link href={publisher.terms.path}>terms of service</Link>.
        </p>

        <h2 id="cookies">Cookies and tracking</h2>
        <p>
          The app uses no cookies, analytics, tracking pixels or advertising, and no third party
          serves content or ads through it. This website doesn&rsquo;t either: the only thing it
          stores in your browser is your light or dark theme choice. Like any website, its host
          keeps standard server logs.
        </p>

        <h2 id="data-deletion">Revoking access and deleting your data</h2>
        <p>You can take back the app&rsquo;s access, or have your data deleted, at any time:</p>
        <ul>
          <li>
            <strong>Google:</strong> remove {publisher.name} from your{" "}
            <a
              href="https://security.google.com/settings/security/permissions"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Account&rsquo;s third-party access settings
            </a>
            . Its tokens stop working straight away, and the app deletes the tokens and any data it
            received from YouTube within 7 days.
          </li>
          <li>
            <strong>Facebook:</strong> on Facebook, open <em>Settings &amp; privacy</em>, then{" "}
            <em>Settings</em>, then <em>Apps and websites</em> (or <em>Business integrations</em>{" "}
            for a Page), find {publisher.name} and choose <em>Remove</em>. The app deletes its tokens
            and any data it received from Facebook within 7 days.
          </li>
          <li>
            <strong>By email:</strong> write to <a href={deletionEmail}>{site.email}</a> with the
            subject &ldquo;Data deletion: {publisher.name}&rdquo; and say which Google or Facebook
            account it&rsquo;s about. Everything the app holds about it is deleted within 7 days, and
            you get an email confirming it.
          </li>
        </ul>
        <p>
          This deletes what the app holds. It doesn&rsquo;t delete videos already published on
          YouTube or Facebook, or the data Google and Meta keep themselves: remove videos in
          YouTube Studio or on the Facebook Page, and use Google&rsquo;s and Meta&rsquo;s own tools for
          the rest.
        </p>

        <h2 id="rights">Your rights</h2>
        <p>
          Under data protection law, including the EU&rsquo;s General Data Protection Regulation
          (GDPR), you have the right to access, correct, delete or move your data, and to restrict
          or object to how it&rsquo;s used. The app processes data on the basis of your consent,
          given when you sign in and grant access, and you can withdraw it at any time as described
          above. To use any of these rights, email <a href={`mailto:${site.email}`}>{site.email}</a>
          . You can also complain to the Spanish data protection authority, the{" "}
          <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">
            Agencia Española de Protección de Datos
          </a>
          .
        </p>

        <h2 id="children">Children</h2>
        <p>
          The app is not meant for children and is used only by the channel&rsquo;s adult owner. It
          doesn&rsquo;t knowingly collect information from anyone under 16.
        </p>

        <h2 id="changes">Changes to this policy</h2>
        <p>
          If the app starts using data in a new way, this page is updated first, with a new
          &ldquo;last updated&rdquo; date at the top, and consent is asked for again where
          it&rsquo;s required.
        </p>

        <h2 id="contact">Contact</h2>
        <p>
          Questions or complaints about privacy go to {site.name}, {site.location.city},{" "}
          {site.location.country}, at <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </LegalPage>
    </main>
  );
}
