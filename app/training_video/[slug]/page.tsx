import { permanentRedirect } from "next/navigation";
import { getTrainingItem } from "../../training/trainingData";

export default async function OldTrainingVideoRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getTrainingItem(slug);
  permanentRedirect(`/training/${item?.slug ?? slug}`);
}
