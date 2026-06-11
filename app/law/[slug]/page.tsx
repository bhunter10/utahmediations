import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { SiteShell } from "../../components/SiteChrome";
import { getLawPost, lawPosts } from "../lawData";

function isArchiveLinkFragment(paragraph: string) {
  return /\bclick\s+here\b/i.test(paragraph) && /\b(case|review|read|text)\b/i.test(paragraph);
}

export function generateStaticParams() {
  return lawPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getLawPost(slug);

  if (!post) {
    return {
      title: "Law Article | Utah Mediations",
    };
  }

  return {
    title: `${post.title} | Utah Mediations`,
    description: post.excerpt,
  };
}

export default async function LawPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getLawPost(slug);

  if (!post) {
    notFound();
  }

  if (slug !== post.slug) {
    permanentRedirect(`/law/${post.slug}`);
  }

  const related = lawPosts.filter((lawPost) => lawPost.slug !== slug).slice(0, 4);
  const body = post.body.filter((paragraph) => !isArchiveLinkFragment(paragraph));

  return (
    <SiteShell>
      <section className="law-detail-section">
        <article className="law-detail-card">
          <div className="law-detail-toolbar">
            <Link className="law-back-link" href="/law">
              <span aria-hidden="true">←</span>
              Back to Law Blog
            </Link>
          </div>
          <h1 className="law-detail-title">{post.title}</h1>
          {body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {post.caseLink ? (
            <p>
              <a className="law-case-link" href={post.caseLink.href}>
                {post.caseLink.label}
              </a>
            </p>
          ) : null}
        </article>

        <aside className="related-training law-related">
          <p className="eyebrow">More Law</p>
          <h2>Related articles</h2>
          <div className="related-training-list">
            {related.map((relatedPost) => (
              <Link href={`/law/${relatedPost.slug}`} key={relatedPost.slug}>
                {relatedPost.title}
              </Link>
            ))}
          </div>
        </aside>
      </section>
    </SiteShell>
  );
}
