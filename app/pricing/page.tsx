import type { Metadata } from "next";
import { MiniTestimonials, SiteShell } from "../components/SiteChrome";

export const metadata: Metadata = {
  title: "Mediation Pricing | Utah Mediations",
  description:
    "Review Utah Mediations rates, minimum fees, payment methods, cancellation policy, and mediation session details.",
};

type PaymentMethod = {
  text: string;
  logo: {
    src: string;
    alt: string;
    wide?: boolean;
    compact?: boolean;
    cards?: boolean;
  };
};

const rateCards = [
  ["Hourly Rate", "$300/hr", "You are charged by the hour for the mediation appointment."],
  ["Minimum Fee", "$900", "Dave Hunter's minimum fee is 3 hours."],
  ["Reserved Time", "Up to 8 hours", "The mediator sets aside the mediation day for your case."],
];

const paymentMethods: PaymentMethod[] = [
  {
    text: "Venmo",
    logo: { src: "/logos/payments/venmo.svg", alt: "Venmo" },
  },
  {
    text: "Zelle",
    logo: { src: "/logos/payments/zelle.svg", alt: "Zelle", compact: true },
  },
  {
    text: "Apple Cash",
    logo: { src: "/logos/payments/apple-cash.svg", alt: "Apple Cash", compact: true },
  },
  {
    text: "Cash App",
    logo: { src: "/logos/payments/cash-app.svg", alt: "Cash App", compact: true },
  },
  {
    text: "Major credit and debit cards",
    logo: {
      src: "/logos/payments/cards.svg",
      alt: "Credit and debit cards",
      cards: true,
    },
  },
  {
    text: "Cash for in-person appointments",
    logo: { src: "/logos/payments/cash.svg", alt: "Cash" },
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

export default function PricingPage() {
  return (
    <SiteShell>
      <section className="page-hero compact-hero">
        <p className="eyebrow">Pricing</p>
        <h1>Rates and Details.</h1>
        <p>
          Mediation is billed hourly, with a minimum fee and cancellation policy
          designed to protect reserved mediation time.
        </p>
      </section>

      <section className="fees-section">
        <div className="pricing-grid">
          {rateCards.map(([title, price, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p className="price">{price}</p>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="split-section">
        <div>
          <p className="eyebrow">Billing</p>
          <h2>What time is billed.</h2>
        </div>
        <div className="prose">
          <p>
            You are charged for your mediation appointment by the hour. The time
            billed includes time spent by the mediator on activities related to
            your case and mediation before, during, and in some circumstances
            after your session.
          </p>
          <p>
            For parties represented by counsel, payment is due at the end of
            the session. For unrepresented parties, a deposit equal to the
            minimum fee is due upon booking. Non-payment of the booking deposit
            may result in cancellation of the appointment.
          </p>
        </div>
      </section>

      <section className="feature-section pricing-policy-section">
        <div className="feature-grid">
          <article>
            <h3>Cancellation and Rescheduling</h3>
            <p>
              The cancellation or rescheduling fee is $900. You may cancel at no
              cost and for any reason if you do so at least 14 days before your
              appointment.
            </p>
            <p>
              If an appointment is cancelled or rescheduled for any reason
              within 14 days of the appointment date, the cancellation fee is
              immediately due by credit card or Venmo from the cancelling party,
              or one-half by each party if the cancellation is mutual.
            </p>
          </article>
          <article>
            <h3>Session Length</h3>
            <p>
              When you book an appointment, the amount of time spent is up to
              you and the needs of the case. The mediator will set aside up to 8
              hours for your case that day.
            </p>
            <p>
              Unless there are only limited issues, most mediation sessions run
              between 3 and 8 hours, so plan your day without other conflicts.
              Follow-up sessions can be scheduled as needed.
            </p>
          </article>
          <article>
            <h3>Separate Rooms</h3>
            <p>
              Mediation usually takes place in separate rooms on Zoom or
              in-person unless everyone involved, including the mediator, agrees
              to meet together.
            </p>
            <p>
              Each party may bring one support person if desired, usually an
              attorney if represented. Please provide the support person's name
              and email in advance so the agreement to mediate can be signed.
            </p>
          </article>
        </div>
      </section>

      <section className="documents-section">
        <div>
          <p className="eyebrow">Payment</p>
          <h2>Accepted payment methods.</h2>
        </div>
        <div className="check-grid credential-list">
          {paymentMethods.map((method) => (
            <article className="credential-card" key={method.text}>
              <div className="credential-text">
                <p>{method.text}</p>
              </div>
              <div className="credential-logo-panel">
                <img
                  alt={method.logo.alt}
                  className={[
                    "credential-logo",
                    method.logo.wide ? "is-wide" : "",
                    method.logo.compact ? "is-compact" : "",
                    method.logo.cards ? "is-cards" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  src={method.logo.src}
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="documents-section preparation-list">
        <div>
          <p className="eyebrow">Preparation</p>
          <h2>What to bring to mediation.</h2>
        </div>
        <div className="check-grid">
          {bringItems.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <MiniTestimonials />

      <section className="contact-band">
        <article>
          <span>Office</span>
          <p>Fibernet Building, 1145 S 800 E, Orem, UT 84097</p>
        </article>
        <article>
          <span>Phone</span>
          <a href="tel:8014734444">(801) 473-4444</a>
        </article>
        <article>
          <span>Email</span>
          <a href="mailto:dj@hunter.org">dj@hunter.org</a>
        </article>
      </section>
    </SiteShell>
  );
}
