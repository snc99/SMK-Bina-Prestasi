"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { metadata } from "@/components/landing/MetaData";
import { Poppins } from 'next/font/google';


const poppins = Poppins({
  subsets: ['latin'], 
  weight: ['400', '700'], 
  style: ['normal', 'italic'], 
  display: 'swap', 
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {typeof metadata.title === "string" ? (
          <title>{metadata.title}</title>
        ) : metadata.title && "default" in metadata.title ? (
          <title>{metadata.title.default}</title>
        ) : null}
        <meta name="description" content={metadata.description || ""} />
      </head>

      <body
        className={`${poppins.className} ${poppins.className} antialiased`}
      >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
