import type { Metadata } from "next";
import BookingWidget from "./components/BookingWidget";
import { MiniTestimonials, SiteShell } from "./components/SiteChrome";

export const metadata: Metadata = {
  title: "Utah Mediations | Family Law Mediation in Utah",
  description:
    "Schedule family law mediation for divorce, custody, parent-time, support, QDROs, and settlement matters with Dave Hunter.",
};

const credentials = [
  ["family", "Child Focused"],
  ["lock", "Confidential"],
  ["scale", "Neutral & Fair"],
  ["cost", "Cost Effective"],
];

const process = [
  ["Schedule", "Choose a time and provide basic case details."],
  ["Prepare", "Gather financials, pleadings, parenting plans, and proposals."],
  ["Mediate", "Work toward practical settlement with structured guidance."],
  ["Sign", "Finalize terms with remote signing when appropriate."],
];

function TrustIcon({ name }: { name: string }) {
  if (name === "family") {
    return (
      <svg aria-hidden="true" className="trust-icon" viewBox="0 0 24 24">
        <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
      </svg>
    );
  }

  if (name === "lock") {
    return (
      <svg aria-hidden="true" className="trust-icon" viewBox="0 0 24 24">
        <rect height="10" rx="2" width="14" x="5" y="10" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </svg>
    );
  }

  if (name === "scale") {
    return (
      <svg aria-hidden="true" className="trust-icon" viewBox="0 0 24 24">
        <path d="M12 4v16" />
        <path d="M5 7h14" />
        <path d="M7 7 4 14h6L7 7Z" />
        <path d="m17 7-3 7h6l-3-7Z" />
        <path d="M8 20h8" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="trust-icon" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7v10" />
      <path d="M15 9.5a3 3 0 0 0-3-1.5c-1.7 0-3 1-3 2.4 0 1.6 1.5 2.1 3 2.4 1.7.4 3 .8 3 2.4 0 1.4-1.3 2.4-3 2.4a3.7 3.7 0 0 1-3.4-1.8" />
    </svg>
  );
}

export default function Home() {
  return (
    <SiteShell>
      <section className="hero">
        <div className="hero-media" aria-hidden="true" />
        <div className="hero-content">
          <p className="eyebrow">Family Law Mediation in Utah</p>
          <h1>Local roots. Trusted guidance.</h1>
          <p>
            Peaceful resolutions for divorce, custody, parent-time, QDROs, and
            family law matters across Utah.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#booking">
              Schedule a Mediation
            </a>
            <a className="secondary-button" href="/about-dave">
              Meet Dave
            </a>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Credentials">
        {credentials.map(([icon, credential]) => (
          <span key={credential}>
            <TrustIcon name={icon} />
            {credential}
          </span>
        ))}
      </section>

      <BookingWidget />

      <section className="split-section home-split-section">
        <div>
          <p className="eyebrow">Mediation</p>
          <h2>Focused support for family law settlement.</h2>
        </div>
        <div className="prose">
          <p>
            Utah Mediations helps families, attorneys, and parties work through
            divorce, custody, parent-time, support, property division, QDROs,
            and settlement documentation with steady structure.
          </p>
          <p>
            The site is now organized into dedicated pages so clients can find
            Dave&apos;s background, pricing, reviews, QDRO help, training
            resources, and legal updates without digging through one long page.
          </p>
        </div>
      </section>

      <section className="process-section">
        <div className="section-heading">
          <p className="eyebrow">Process</p>
          <h2>Simple steps, clearly presented.</h2>
        </div>
        <div className="process-grid">
          {process.map(([title, text], index) => (
            <article className="process-card" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <MiniTestimonials />
    </SiteShell>
  );
}
