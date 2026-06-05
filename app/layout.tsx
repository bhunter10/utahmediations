import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Utah Mediations | Family Law Mediation",
  description:
    "Professional family law mediation in Utah with online scheduling, Zoom appointments, and practical settlement support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
