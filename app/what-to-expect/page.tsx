import type { Metadata } from "next";
import { SiteShell } from "../components/SiteChrome";

export const metadata: Metadata = {
  title: "What to Expect in Mediation | Utah Mediations",
  description:
    "Learn what happens before, during, and after a family law mediation with Dave Hunter, including separate rooms, offers, preparation, and settlement documents.",
};

const mediationSteps = [
  {
    title: "Before the Session",
    text:
      "Dave's office confirms the appointment details, party information, attorneys or support people, and any documents that may help everyone understand the issues.",
  },
  {
    title: "Separate Rooms",
    text:
      "Most mediations happen in separate rooms, either by Zoom or in person. Dave moves between rooms to discuss concerns, options, and possible settlement terms.",
  },
  {
    title: "Offers and Responses",
    text:
      "Each side can make proposals, ask questions, and revise offers as new information comes into focus. The pace depends on the issues and the people involved.",
  },
  {
    title: "Agreement Terms",
    text:
      "If the case settles, the important terms are usually put in writing before everyone leaves so the agreement can be reviewed and finalized by the parties or counsel.",
  },
];

const bringItems = [
  "Contracts",
  "Court documents",
  "Proof or evidence",
  "Financial declarations",
  "Pay stubs and W-2s",
  "Tax returns",
  "Bank statements",
  "Retirement account statements",
  "Debt statements",
  "Home or vehicle appraisals",
  "Personal property lists",
];

const expectationCards = [
  {
    title: "Plan for a Full Day",
    text:
      "Many family law mediations take several hours. Keep your calendar open so there is enough time to work through the details without rushing.",
  },
  {
    title: "Bring Decision Makers",
    text:
      "The people who need to approve terms should be available. If someone else must review a proposal, make sure they can be reached during the session.",
  },
  {
    title: "Settlement Is Voluntary",
    text:
      "Dave helps the parties evaluate options and communicate proposals, but settlement terms are decided by the parties, not imposed by the mediator.",
  },
];

export default function WhatToExpectPage() {
  return (
    <SiteShell>
      <section className="page-hero compact-hero">
        <p className="eyebrow">Mediation Day</p>
        <h1>What to Expect</h1>
        <p>
          A practical overview of how family law mediation usually works, what
          to prepare, and what may happen if the case settles.
        </p>
      </section>

      <section className="process-section what-to-expect-section">
        <div className="section-heading">
          <p className="eyebrow">Process</p>
          <h2>How the session usually unfolds.</h2>
        </div>
        <div className="expectation-step-list">
          {mediationSteps.map((step, index) => (
            <article className="expectation-step" key={step.title}>
              <span>{index + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="split-section">
        <div>
          <p className="eyebrow">Preparation</p>
          <h2>What to bring to mediation.</h2>
        </div>
        <div className="check-grid expectation-checklist">
          {bringItems.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="feature-section">
        <div className="feature-grid expectation-card-grid">
          {expectationCards.map((card) => (
            <article key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="documents-section">
        <div>
          <p className="eyebrow">After Mediation</p>
          <h2>If you reach an agreement.</h2>
        </div>
        <div className="prose">
          <p>
            When the parties settle, the terms are typically written down so
            everyone has a clear record of the agreement. Attorneys may prepare
            final court documents, or unrepresented parties may need help turning
            the agreement into the paperwork required by the court.
          </p>
          <p>
            If some issues remain unresolved, the session can still narrow the
            dispute. The parties may schedule another mediation session, continue
            negotiating, or address the remaining issues through the court.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
