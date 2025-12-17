/**
 * @fileoverview Root layout component for the Magic Banner Plugin application
 * @module app/layout
 */

import type { Metadata } from "next";
import "./globals.css";

/**
 * Application metadata configuration
 * @type {Metadata}
 * @description Defines page title, description, and favicon configuration
 */
export const metadata: Metadata = {
  title: "Magic Banner Plugin",
  description: "Create and manage dynamic banners",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon-32x32.png',
  },
};

/**
 * Root layout component that wraps all pages
 * @function RootLayout
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @returns {JSX.Element} HTML document structure with children
 * @description Provides the base HTML structure and global styles for the application
 */
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
