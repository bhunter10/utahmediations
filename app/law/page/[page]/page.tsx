import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { getTotalLawPages, LawIndex } from "../../LawIndex";

export function generateStaticParams() {
  return Array.from({ length: getTotalLawPages() - 1 }, (_, index) => ({
    page: String(index + 2),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  return {
    title: `Utah Family Law Articles - Page ${page} | Utah Mediations`,
    description:
      "Browse Utah family law case notes and mediation-related legal updates from the Utah Mediations archive.",
  };
}

export default async function PaginatedLawPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const pageNumber = Number(page);
  const totalPages = getTotalLawPages();

  if (!Number.isInteger(pageNumber)) {
    notFound();
  }

  if (pageNumber <= 1) {
    permanentRedirect("/law");
  }

  if (pageNumber > totalPages) {
    notFound();
  }

  return <LawIndex page={pageNumber} />;
}
