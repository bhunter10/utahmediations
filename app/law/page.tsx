import type { Metadata } from "next";
import { LawIndex } from "./LawIndex";

export const metadata: Metadata = {
  title: "Utah Family Law Articles | Utah Mediations",
  description:
    "Read Utah family law case notes and mediation-related legal updates from the Utah Mediations archive.",
};

export default function LawPage() {
  return <LawIndex />;
}
