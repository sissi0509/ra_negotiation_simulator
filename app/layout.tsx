import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { isExperiment } from "@/lib/appMode";
import ExperimentTopBar from "@/components/ExperimentTopBar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Negotiation Simulator",
  description: "Practice negotiation against an AI counterpart in realistic scenarios.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          {isExperiment && <ExperimentTopBar />}
          <div className={isExperiment ? "pt-10" : ""}>
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
