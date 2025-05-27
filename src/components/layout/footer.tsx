"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/config/site";
import { NewsletterForm } from "@/components/shared/newsletter-form";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background/95">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <h3 className="font-bold text-lg tracking-tight text-dill-green-700">PCL PikiCeramicLab</h3>
            <p className="text-muted-foreground">
              Ceramiche artigianali con gocce tridimensionali in rilievo. Design contemporaneo e artigianato artistico per la tua casa.
            </p>
            <div className="flex space-x-4 pt-2">
              {Object.entries(siteConfig.links).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visita il nostro ${platform}`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {getSocialIcon(platform)}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Collegamenti rapidi</h3>
            <nav>
              <ul className="space-y-2">
                {siteConfig.mainNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contatti</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-muted-foreground">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>{siteConfig.contact.address}</span>
              </li>
              <li className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span>{siteConfig.contact.phone}</span>
              </li>
              <li className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-foreground transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-muted-foreground mb-4">
              Iscriviti per ricevere aggiornamenti su nuovi prodotti e offerte speciali.
            </p>
            <NewsletterForm variant="footer" />
          </div>
        </div>

        <div className="border-t mt-10 pt-6 text-center text-sm text-muted-foreground">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} PCL PikiCeramicLab. Tutti i diritti riservati.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Termini e Condizioni
              </Link>
              <Link href="/cookies" className="hover:text-foreground transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Helper function to get social media icons
function getSocialIcon(platform: string) {
  switch(platform) {
    case 'instagram':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      );
    case 'facebook':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      );
    case 'pinterest':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0z"></path>
          <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5l-.3 3.9 3.9-.3c1.5.8 3.2 1.3 5 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2"></path>
        </svg>
      );
    default:
      return <ExternalLink className="h-5 w-5" />;
  }
}
