import Link from "next/link";
import { MobileMenu, type NavItem } from "./MobileMenu";

const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about-dave", label: "About Dave" },
  { href: "/pricing", label: "Pricing" },
  { href: "https://utahqdro.com/", label: "QDROs", newTab: true },
  { href: "/training", label: "Training" },
  { href: "/law", label: "Law" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

const desktopNavItems: NavItem[] = [
  { href: "/about-dave", label: "About Dave" },
  { href: "/pricing", label: "Pricing" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

const resourceNavItems: NavItem[] = [
  { href: "https://utahqdro.com/", label: "QDROs", newTab: true },
  { href: "/training", label: "Training" },
  { href: "/law", label: "Law Blog" },
];

const trustBadges = [
  ["bar", "Utah State Bar", "Utah State Bar", "Member"],
  ["aca", "ACA", "American Arbitration Association", "Member"],
  ["uam", "UAM", "Utah Association for Mediation", "Member"],
  ["avvo", "avvo", "Top Rated Mediator", "★★★★★"],
  ["google", "Google", "★★★★★", "5.0 Star Rating"],
];

export function Logo() {
  return (
    <span className="logo-crop">
      <img alt="" className="logo-image" src="/utah-mediations-logo.png" />
    </span>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link aria-label="Utah Mediations home" className="brand" href="/">
        <Logo />
      </Link>
      <nav aria-label="Primary navigation">
        {desktopNavItems.map((item) => (
          <Link href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
        <div className="desktop-nav-dropdown">
          <button type="button">
            Resources
            <span aria-hidden="true">⌄</span>
          </button>
          <div className="desktop-nav-dropdown-menu">
            {resourceNavItems.map((item) => (
              <Link
                href={item.href}
                key={item.href}
                rel={item.newTab ? "noopener noreferrer" : undefined}
                target={item.newTab ? "_blank" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      <Link className="nav-button" href="/#booking">
        Book
      </Link>
      <MobileMenu navItems={navItems} />
    </header>
  );
}

function TrustBadgeMark({ type, label }: { type: string; label: string }) {
  if (type === "bar") {
    return (
      <svg aria-hidden="true" className="badge-column-icon" viewBox="0 0 48 48">
        <path d="M24 8 7 16h34L24 8Z" />
        <path d="M10 20h28" />
        <path d="M13 20v15" />
        <path d="M21 20v15" />
        <path d="M29 20v15" />
        <path d="M37 20v15" />
        <path d="M8 38h32" />
      </svg>
    );
  }

  if (type === "google") {
    return (
      <strong aria-label={label} className="google-wordmark">
        <span>G</span>
        <span>o</span>
        <span>o</span>
        <span>g</span>
        <span>l</span>
        <span>e</span>
      </strong>
    );
  }

  return <strong className={`badge-wordmark ${type}`}>{label}</strong>;
}

export function FooterTrustSection() {
  return (
    <section className="footer-trust-section" aria-labelledby="footer-trust-heading">
      <h2 id="footer-trust-heading">Trusted. Respected. Recommended.</h2>
      <span className="footer-trust-rule" aria-hidden="true" />
      <div className="footer-trust-row">
        {trustBadges.map(([type, mark, lineOne, lineTwo]) => (
          <article className="footer-trust-badge" key={lineOne}>
            <TrustBadgeMark type={type} label={mark} />
            <p className={lineOne.includes("★") ? "badge-stars" : ""}>{lineOne}</p>
            <strong className={lineTwo.includes("★") ? "badge-stars" : ""}>
              {lineTwo}
            </strong>
          </article>
        ))}
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <strong>Utah Mediations</strong>
        <p>Family law mediation by appointment.</p>
      </div>
    </footer>
  );
}

export function ScheduleCta() {
  return (
    <section className="schedule-cta" aria-labelledby="schedule-cta-heading">
      <div>
        <p className="eyebrow">Ready to Schedule?</p>
        <h2 id="schedule-cta-heading">Reserve a mediation date.</h2>
        <p>
          Choose a date, provide the party details, and Dave&apos;s office can
          review the appointment request.
        </p>
      </div>
      <Link className="primary-button" href="/#booking">
        Schedule a Mediation
      </Link>
    </section>
  );
}

export function MiniTestimonials() {
  const testimonials = [
    {
      quote:
        "Dave is very knowledgeable and can provide an informed, yet neutral analysis.",
      name: "Casey Hoyer",
      role: "Attorney",
    },
    {
      quote:
        "David was professional and helped us settle our case even when I thought there was no way.",
      name: "Jane",
      role: "Divorce Case",
    },
    {
      quote:
        "He takes on difficult issues and is able to work in fair resolutions.",
      name: "Scott Weight",
      role: "Attorney",
    },
  ];

  return (
    <section className="mini-testimonials" aria-labelledby="mini-testimonials-heading">
      <div className="section-heading">
        <p className="eyebrow">Reviews</p>
        <h2 id="mini-testimonials-heading">Trusted by clients and attorneys.</h2>
      </div>
      <div className="mini-testimonial-grid">
        {testimonials.map((testimonial) => (
          <article key={testimonial.name}>
            <blockquote>{testimonial.quote}</blockquote>
            <footer>
              <strong>{testimonial.name}</strong>
              <span>{testimonial.role}</span>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <SiteHeader />
      {children}
      <ScheduleCta />
      <FooterTrustSection />
      <SiteFooter />
    </main>
  );
}
