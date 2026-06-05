import { permanentRedirect } from "next/navigation";
import { getLawPost } from "../../law/lawData";

export default async function OldLawBlogRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getLawPost(slug);
  permanentRedirect(`/law/${post?.slug ?? slug}`);
}
