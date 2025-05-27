import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AuthProvider } from "@/components/auth/auth-provider";
import { StripeProvider } from "@/lib/payments/stripe-provider";
import { ClientBody } from "./ClientBody";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PCL Ceramic Lab",
  description: "Ceramiche artigianali con gocce tridimensionali",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <head />
      <body className={inter.className}>
        <AuthProvider>
          <StripeProvider>
            <ClientBody>
              <Navbar />
              <main className="flex-1 min-h-[calc(100vh-70px)]">
                {children}
              </main>
              <Footer />
              <Toaster />
            </ClientBody>
          </StripeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
