import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Magic Banner Plugin",
  description: "Create and manage dynamic banners",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
