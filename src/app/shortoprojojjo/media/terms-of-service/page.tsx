import Link from "next/link";
import JsonLd from "@/components/json-ld";
import LegalPage from "@/components/legal-page";
import { channel, publisher } from "@/content/shorto-projojjo";
import { absoluteUrl, pageMetadata, site } from "@/lib/site";
import { PERSON_ID, WEBSITE_ID, breadcrumbs, graph } from "@/lib/structured-data";

// The terms of service for the upload app, the URL given to Google and Meta with the
// privacy policy. YouTube API Services require the terms to link to the YouTube Terms
// of Service and to say that using the app means agreeing to them (#youtube).

const { path, updated } = publisher.terms;
const title = `Terms of Service: ${publisher.name}`;
const description = `The terms for using ${publisher.name}, the app that uploads ${channel.name} episodes to YouTube and Facebook: what it's for, the YouTube and Meta terms that apply, and the rules for using it.`;
const privacyPolicy = publisher.privacyPolicy.path;

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
    { name: "Terms of service", path },
  ])
);

export default function Page() {
  return (
    <main className="px-4 pb-28 sm:px-6">
      <JsonLd data={structuredData} />
      <LegalPage
        title="Terms of service"
        updated={updated}
        lead={
          <>
            These terms cover the use of {publisher.name}, the app that uploads the {channel.name}{" "}
            episodes to the channel&rsquo;s own YouTube channel and Facebook Page. Please read them,
            together with the <Link href={privacyPolicy}>privacy policy</Link>, before using it.
          </>
        }
      >
        <h2 id="agreement">Agreeing to these terms</h2>
        <p>
          These terms are an agreement between you and {site.name}, an individual based in{" "}
          {site.location.city}, {site.location.country}, who makes and runs {publisher.name}{" "}
          (&ldquo;the app&rdquo;). By signing in to the app or using it, you agree to these terms
          and to the <Link href={privacyPolicy}>privacy policy</Link>. If you don&rsquo;t agree,
          don&rsquo;t use the app.
        </p>

        <h2 id="service">What the app does</h2>
        <p>
          The app publishes the videos of{" "}
          <Link href="/shortoprojojjo">
            {channel.name} (<span lang="bn">{channel.nameBn}</span>)
          </Link>
          , a Bangla tech video channel. It uploads each finished episode, with its title,
          description, thumbnail and captions, to the channel&rsquo;s YouTube channel and Facebook
          Page.
        </p>
        <p>
          It is not a public service. There is no sign-up, and the app is only for the
          channel&rsquo;s owner, to publish the channel&rsquo;s own videos. It is free, and it shows
          no ads.
        </p>

        <h2 id="youtube">YouTube and Google</h2>
        <p>
          The app uses YouTube API Services. By using the app, you agree to be bound by the{" "}
          <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer">
            YouTube Terms of Service
          </a>
          . Google&rsquo;s handling of your information is described in the{" "}
          <a href="https://www.google.com/policies/privacy" target="_blank" rel="noopener noreferrer">
            Google Privacy Policy
          </a>
          , and you can remove the app&rsquo;s access to your Google Account at any time in your{" "}
          <a
            href="https://security.google.com/settings/security/permissions"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google security settings
          </a>
          .
        </p>

        <h2 id="facebook">Facebook and Meta</h2>
        <p>
          Publishing to Facebook goes through Facebook Login and the Meta Graph API. By using the
          app with Facebook, you also agree to Meta&rsquo;s{" "}
          <a href="https://www.facebook.com/terms" target="_blank" rel="noopener noreferrer">
            Terms of Service
          </a>
          , and the app is run under Meta&rsquo;s{" "}
          <a href="https://developers.facebook.com/terms" target="_blank" rel="noopener noreferrer">
            Platform Terms
          </a>
          . You can remove the app&rsquo;s access in your Facebook settings at any time, as the{" "}
          <Link href={`${privacyPolicy}#data-deletion`}>privacy policy explains</Link>.
        </p>

        <h2 id="independent">An independent app</h2>
        <p>
          {publisher.name} is an independent app. It isn&rsquo;t made, endorsed or sponsored by
          Google, YouTube or Meta, and their names and trademarks belong to them.
        </p>

        <h2 id="accounts">Your accounts and your content</h2>
        <ul>
          <li>
            You may only connect a YouTube channel or Facebook Page that you own or are authorised
            to manage.
          </li>
          <li>
            The app only uploads what you choose to publish. You are responsible for that content,
            and for having the rights to everything in it, including the footage, images, music and
            voices.
          </li>
          <li>
            Uploads must follow YouTube&rsquo;s and Facebook&rsquo;s rules, including the{" "}
            <a
              href="https://www.youtube.com/howyoutubeworks/policies/community-guidelines/"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube Community Guidelines
            </a>{" "}
            and the{" "}
            <a
              href="https://transparency.meta.com/policies/community-standards/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook Community Standards
            </a>
            .
          </li>
          <li>You own your content. Using the app gives {site.name} no rights to it.</li>
        </ul>

        <h2 id="acceptable-use">Acceptable use</h2>
        <p>When using the app, don&rsquo;t:</p>
        <ul>
          <li>upload content you don&rsquo;t have the rights to, or that breaks the law;</li>
          <li>use it for spam, scams, misleading content or impersonation;</li>
          <li>
            try to get around YouTube&rsquo;s or Meta&rsquo;s limits, quotas or security, or misuse
            their APIs;
          </li>
          <li>
            try to break, reverse-engineer or get unauthorised access to the app or the accounts it
            connects to.
          </li>
        </ul>
        <p>Access to the app can be ended at any time if these terms are broken.</p>

        <h2 id="privacy">Privacy</h2>
        <p>
          What the app accesses, how it&rsquo;s stored and how to have it deleted is set out in the{" "}
          <Link href={privacyPolicy}>privacy policy</Link>.
        </p>

        <h2 id="availability">Availability and changes to the app</h2>
        <p>
          The app depends on YouTube&rsquo;s and Meta&rsquo;s APIs, which can change, limit or stop
          working without notice. Uploads can fail, be delayed or be held for processing by the
          platforms. The app may be changed, paused or retired at any time.
        </p>

        <h2 id="disclaimer">Disclaimer</h2>
        <p>
          The app is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;, without any
          warranty that it will be error-free, uninterrupted or fit for a particular purpose. Keep
          your own copies of everything you upload.
        </p>

        <h2 id="liability">Limitation of liability</h2>
        <p>
          As far as the law allows, {site.name} isn&rsquo;t liable for indirect or consequential
          losses from using the app, including lost content, lost revenue, failed or delayed
          uploads, or action YouTube or Meta take against an account. Nothing in these terms limits
          liability that can&rsquo;t be limited by law, or your rights as a consumer.
        </p>

        <h2 id="ending">Stopping using the app</h2>
        <p>
          You can stop using the app at any time by removing its access in your Google or Facebook
          settings. To have your data deleted as well, follow the steps in the{" "}
          <Link href={`${privacyPolicy}#data-deletion`}>privacy policy</Link>. Videos already
          published stay on YouTube and Facebook until you remove them there.
        </p>

        <h2 id="changes">Changes to these terms</h2>
        <p>
          These terms may be updated, with a new &ldquo;last updated&rdquo; date at the top. If a
          change is significant, you&rsquo;ll be told before it applies. Using the app after a change
          means you accept the new terms.
        </p>

        <h2 id="law">Governing law</h2>
        <p>
          These terms are governed by the laws of Spain, and disputes go to the courts of Madrid,
          unless the law where you live gives you the right to use your local courts or laws.
        </p>

        <h2 id="contact">Contact</h2>
        <p>
          Questions about these terms go to {site.name}, {site.location.city},{" "}
          {site.location.country}, at <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </LegalPage>
    </main>
  );
}
