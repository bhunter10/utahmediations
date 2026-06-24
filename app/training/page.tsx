import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "../components/SiteChrome";
import { formatTrainingTitle, trainingItems } from "./trainingData";

export const metadata: Metadata = {
  title: "Mediation Training Videos | Utah Mediations",
  description:
    "Watch Utah Mediations training videos about mediator selection, mediation benefits, custody, child support, and family law case types.",
};

export default function TrainingPage() {
  return (
    <SiteShell>
      <section className="page-hero compact-hero">
        <p className="eyebrow">Training Videos</p>
        <h1>Mediation Training Videos</h1>
        <p>
          A library of short video topics from the old Utah Mediations training
          series, covering mediator selection, the mediation process, case
          types, custody, child support, and contested or uncontested matters.
        </p>
      </section>

      <section className="feature-section">
        <div className="section-heading">
          <p className="eyebrow">Video Library</p>
          <h2>Training topics</h2>
        </div>
        <div className="training-list">
          {trainingItems.map((item) => (
            <article className="training-card" key={item.slug}>
              <span aria-hidden="true">▶</span>
              <div>
                <h3>
                  <Link href={`/training/${item.slug}`}>
                    {formatTrainingTitle(item.title)}
                  </Link>
                </h3>
                <p>{item.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
