import type { Metadata } from "next";
import { SiteShell } from "../components/SiteChrome";

export const metadata: Metadata = {
  title: "Contact | Utah Mediations",
  description:
    "Contact Utah Mediations to ask about family law mediation, scheduling, Zoom appointments, and case details.",
};

export default function ContactPage() {
  return (
    <SiteShell>
      <section className="page-hero compact-hero contact-hero">
        <p className="eyebrow">Contact</p>
        <h1>Get in Touch</h1>
        <p>
          Send a few words about what you are looking to achieve, and Dave can
          schedule a free initial consultation to discuss your problems and
          goals.
        </p>
      </section>

      <section className="contact-form-section">
        <aside className="contact-intro">
          <p className="eyebrow">Get in Touch</p>
          <h2>Start with a short message.</h2>
          <p>
            Use the form to describe your situation, or contact Dave directly by
            email or phone.
          </p>
          <div className="contact-detail-list">
            <a href="mailto:Dave@UtahMediations.com">Dave@UtahMediations.com</a>
            <a href="tel:8014734444">801-473-4444</a>
            <p>Fibernet Building, 1145 S 800 E, Orem, UT 84097</p>
          </div>
        </aside>

        <form className="contact-form">
          <div className="field-grid">
            <label>
              First Name
              <input name="firstName" required type="text" />
            </label>
            <label>
              Last Name
              <input name="lastName" required type="text" />
            </label>
          </div>
          <div className="field-grid">
            <label>
              Email
              <input name="email" required type="email" />
            </label>
            <label>
              Confirm Email
              <input name="confirmEmail" required type="email" />
            </label>
          </div>
          <label>
            Comments
            <textarea name="comments" required />
          </label>
          <label className="human-check">
            Are you human?
            <input name="humanCheck" placeholder="Type yes" required type="text" />
          </label>
          <button className="primary-button full" type="submit">
            Send Message
          </button>
        </form>
      </section>
    </SiteShell>
  );
}
