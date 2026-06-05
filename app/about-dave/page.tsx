import type { Metadata } from "next";
import { SiteShell } from "../components/SiteChrome";

export const metadata: Metadata = {
  title: "About Dave Hunter | Utah Mediations",
  description:
    "Learn about David Hunter, a court-certified master attorney-mediator with decades of Utah family law and mediation experience.",
};

type Credential = {
  text: string;
  logo: {
    src: string;
    alt: string;
    wide?: boolean;
  };
};

const strengths = [
  [
    "Court-Certified Master Attorney-Mediator",
    "Dave has mediated hundreds of cases and helps parties resolve divorce and domestic matters outside the courtroom whenever possible.",
  ],
  [
    "Deep Family Law Background",
    "Before limiting his practice to mediations, Dave was a tenacious family law litigator with substantial courtroom experience.",
  ],
  [
    "Community and Professional Leadership",
    "He has served in Utah dispute resolution leadership roles and contributed to divorce procedure work in the court system.",
  ],
];

const credentials: Credential[] = [
  {
    text: "Certificates from Harvard University in mediation, negotiations, and leadership",
    logo: { src: "/logos/harvard.png", alt: "Harvard University" },
  },
  {
    text: "JD, Brigham Young University, 2000",
    logo: { src: "/logos/byu.png", alt: "Brigham Young University" },
  },
  {
    text: "Bachelor's degree in business administration, Brigham Young University, 1992",
    logo: { src: "/logos/byu.png", alt: "Brigham Young University" },
  },
  {
    text: "Mediation certificate received in 2001",
    logo: { src: "/logos/mediation.svg", alt: "Mediation certificate" },
  },
  {
    text: "Member of the Utah State Bar and admitted in all Utah courts",
    logo: { src: "/logos/utah-state-bar.png", alt: "Utah State Bar" },
  },
  {
    text: "Active member of the Association of Family and Conciliation Courts",
    logo: {
      src: "/logos/afcc-utah.svg",
      alt: "AFCC Utah Chapter",
    },
  },
  {
    text: "Former President and board member of the Utah State Bar Dispute Resolution Section",
    logo: { src: "/logos/utah-state-bar.png", alt: "Utah State Bar" },
  },
  {
    text: "Fluent in Spanish",
    logo: { src: "/logos/spanish.png", alt: "Spanish language" },
  },
];

export default function AboutDavePage() {
  return (
    <SiteShell>
      <section className="about-dave-hero">
        <div className="about-dave-copy">
          <p className="eyebrow">Master Mediator</p>
          <h1>David Hunter</h1>
          <p>
            Decades of experience and education make Dave a valuable resource
            as a court-certified master attorney-mediator for settling cases
            before clients spend thousands, and sometimes tens of thousands, of
            dollars in litigation costs.
          </p>
          <div className="about-dave-actions">
            <a className="primary-button" href="/#booking">
              Schedule Mediation
            </a>
            <a className="secondary-button" href="/reviews">
              Read Reviews
            </a>
          </div>
          <dl className="about-dave-stats" aria-label="Mediator credentials">
            <div>
              <dt>Experience</dt>
              <dd>Hundreds of Mediations</dd>
            </div>
            <div>
              <dt>Credential</dt>
              <dd>Master Mediator</dd>
            </div>
            <div>
              <dt>Language</dt>
              <dd>Spanish Fluent</dd>
            </div>
          </dl>
        </div>
        <div className="about-dave-portrait" aria-hidden="true">
          <img alt="" src="/dave-mediator-larger.png" />
        </div>
      </section>

      <section className="split-section">
        <div>
          <p className="eyebrow">Background</p>
          <h2>A seasoned family law attorney focused solely on mediation.</h2>
        </div>
        <div className="prose">
          <p>
            Dave finds deep satisfaction through mediation in helping parties
            solve divorce and other domestic cases outside of the courtroom
            whenever possible. Before limiting his practice solely to
            mediations, he was a tenacious family law litigator with vast
            courtroom experience and deep knowledge of the law.
          </p>
          <p>
            Although born and raised in Southern California, Dave has been a
            resident of Utah Valley for almost 40 years and is closely tied to
            serving those in his community.
          </p>
          <p>
            Contact Dave directly at{" "}
            <a href="mailto:dave@utahmediations.com">dave@utahmediations.com</a>.
          </p>
        </div>
      </section>

      <section className="feature-section">
        <div className="section-heading">
          <p className="eyebrow">Approach</p>
          <h2>What Dave brings to the table.</h2>
        </div>
        <div className="feature-grid">
          {strengths.map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="documents-section">
        <div>
          <p className="eyebrow">Education & Memberships</p>
          <h2>Training, bar membership, and mediation leadership.</h2>
        </div>
        <div className="check-grid credential-list">
          {credentials.map((credential) => (
            <article className="credential-card" key={credential.text}>
              <div className="credential-text">
                <p>{credential.text}</p>
              </div>
              <div className="credential-logo-panel">
                <img
                  alt={credential.logo.alt}
                  className={[
                    "credential-logo",
                    credential.logo.wide ? "is-wide" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  src={credential.logo.src}
                />
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
