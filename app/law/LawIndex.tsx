import Link from "next/link";
import { SiteShell } from "../components/SiteChrome";
import { lawPosts } from "./lawData";

const POSTS_PER_PAGE = 10;

function getPageHref(page: number) {
  return page === 1 ? "/law" : `/law/page/${page}`;
}

export function getTotalLawPages() {
  return Math.ceil(lawPosts.length / POSTS_PER_PAGE);
}

export function LawIndex({ page = 1 }: { page?: number }) {
  const totalPages = getTotalLawPages();
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const posts = lawPosts.slice(start, start + POSTS_PER_PAGE);

  return (
    <SiteShell>
      <section className="page-hero compact-hero">
        <p className="eyebrow">Law Blog</p>
        <h1>Utah Family Law Articles</h1>
        <p>
          Case notes and practical legal updates from the Utah Mediations archive,
          organized for clients, attorneys, and families preparing for settlement.
        </p>
      </section>

      <section className="feature-section">
        <div className="article-list">
          {posts.map((post) => (
            <article className="article-card" key={post.slug}>
              <Link className="article-image-link" href={`/law/${post.slug}`} tabIndex={-1}>
                <img alt={post.imageAlt} className="article-card-image" src={post.imageUrl} />
              </Link>
              <div className="article-card-copy">
                <h2>
                  <Link href={`/law/${post.slug}`}>{post.title}</Link>
                </h2>
                <p>{post.excerpt}</p>
                <Link className="article-read-link" href={`/law/${post.slug}`}>
                  Read article
                </Link>
              </div>
            </article>
          ))}
        </div>

        <nav aria-label="Law blog pagination" className="pagination">
          {currentPage > 1 ? (
            <Link href={getPageHref(currentPage - 1)}>Previous</Link>
          ) : (
            <span aria-disabled="true">Previous</span>
          )}
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <Link
              aria-current={pageNumber === currentPage ? "page" : undefined}
              href={getPageHref(pageNumber)}
              key={pageNumber}
            >
              {pageNumber}
            </Link>
          ))}
          {currentPage < totalPages ? (
            <Link href={getPageHref(currentPage + 1)}>Next</Link>
          ) : (
            <span aria-disabled="true">Next</span>
          )}
        </nav>
      </section>
    </SiteShell>
  );
}
