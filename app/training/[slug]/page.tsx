import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { SiteShell } from "../../components/SiteChrome";
import { formatTrainingTitle, getTrainingItem, trainingItems } from "../trainingData";

export function generateStaticParams() {
  return trainingItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getTrainingItem(slug);

  if (!item) {
    return {
      title: "Training Video | Utah Mediations",
    };
  }

  return {
    title: `${formatTrainingTitle(item.title)} | Utah Mediations`,
    description: item.excerpt,
  };
}

export default async function TrainingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getTrainingItem(slug);

  if (!item) {
    notFound();
  }

  if (slug !== item.slug) {
    permanentRedirect(`/training/${item.slug}`);
  }

  const related = trainingItems.filter((trainingItem) => trainingItem.slug !== slug).slice(0, 3);

  return (
    <SiteShell>
      <section className="page-hero compact-hero">
        <p className="eyebrow">Training</p>
        <h1>{formatTrainingTitle(item.title)}</h1>
        <p>{item.excerpt}</p>
      </section>

      <section className="training-detail-section">
        <article className="training-detail-card">
          <div className="training-detail-toolbar">
            <Link className="training-back-link" href="/training">
              <span aria-hidden="true">←</span>
              Back to Training
            </Link>
          </div>
          {item.youtubeUrl ? (
            <iframe
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="training-video-embed"
              src={item.youtubeUrl}
              title={item.title}
            />
          ) : null}
          {(item.body ?? [
            "This topic is part of the Utah Mediations training archive. The old site opened each entry as its own detail page with the date, title, and written text or transcript for the topic.",
            "Use this page for the full transcript, source links, and any updated notes you want to preserve from the original training archive.",
          ]).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>

        <aside className="related-training">
          <p className="eyebrow">More Training</p>
          <h2>Related topics</h2>
          <div className="related-training-list">
            {related.map((relatedItem) => (
              <Link href={`/training/${relatedItem.slug}`} key={relatedItem.slug}>
                {formatTrainingTitle(relatedItem.title)}
              </Link>
            ))}
          </div>
        </aside>
      </section>
    </SiteShell>
  );
}
