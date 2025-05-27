import React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import { siteConfig } from '@/lib/config/site';

interface NewsletterWelcomeEmailProps {
  firstName?: string;
  email: string;
}

export const NewsletterWelcomeEmail = ({
  firstName = 'Amico',
  email,
}: NewsletterWelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Benvenuto nella newsletter di PCL Ceramic Lab!</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={headerText}>PCL CERAMIC LAB</Text>
          </Section>

          {/* Welcome message */}
          <Section style={section}>
            <Heading style={title}>Benvenuto nella nostra newsletter!</Heading>
            <Text style={paragraph}>
              Ciao {firstName},
            </Text>
            <Text style={paragraph}>
              Grazie per esserti iscritto alla newsletter di PCL Ceramic Lab!
              Sei ora parte della nostra comunità di appassionati di ceramica e design.
            </Text>
            <Text style={paragraph}>
              Con la nostra newsletter riceverai:
            </Text>

            <ul style={list}>
              <li style={listItem}>Anteprime delle nuove collezioni</li>
              <li style={listItem}>Sconti esclusivi per gli iscritti</li>
              <li style={listItem}>Tutorial e consigli sulla cura delle ceramiche</li>
              <li style={listItem}>Notizie su eventi e collaborazioni speciali</li>
            </ul>

            <Text style={paragraph}>
              Visita il nostro sito per scoprire le nostre collezioni di ceramiche artigianali
              uniche con le caratteristiche gocce tridimensionali!
            </Text>

            <Section style={buttonContainer}>
              <Button
                pX={20}
                pY={12}
                style={button}
                href={siteConfig.url}
              >
                Visita il nostro sito
              </Button>
            </Section>
          </Section>

          {/* Popular products */}
          <Section style={section}>
            <Heading as="h2" style={sectionTitle}>
              I nostri prodotti più amati
            </Heading>
            <Hr style={hr} />
            <Text style={paragraph}>
              Dai un'occhiata ad alcuni dei nostri bestseller:
            </Text>

            <Section style={productSection}>
              <Img
                src={`${siteConfig.url}/images/products/mug-drop-main.jpg`}
                width="120"
                height="120"
                alt="Mug Drop"
                style={productImage}
              />
              <Text style={productName}>Mug Drop</Text>
              <Text style={productDescription}>
                Mug in ceramica con gocce tridimensionali in rilievo
              </Text>
              <Button
                pX={12}
                pY={8}
                style={smallButton}
                href={`${siteConfig.url}/products/mug-drop`}
              >
                Scopri di più
              </Button>
            </Section>

            <Section style={productSection}>
              <Img
                src={`${siteConfig.url}/images/products/set-shot-drop-main.jpg`}
                width="120"
                height="120"
                alt="Set di Shot Drop"
                style={productImage}
              />
              <Text style={productName}>Set di Shot Drop</Text>
              <Text style={productDescription}>
                Set di bicchierini da shot con gocce tridimensionali
              </Text>
              <Button
                pX={12}
                pY={8}
                style={smallButton}
                href={`${siteConfig.url}/products/set-shot-drop`}
              >
                Scopri di più
              </Button>
            </Section>
          </Section>

          {/* Social Media */}
          <Section style={section}>
            <Heading as="h2" style={sectionTitle}>
              Seguici sui social
            </Heading>
            <Hr style={hr} />
            <Text style={paragraph}>
              Seguici sui social media per rimanere aggiornato sulle ultime novità e offerte speciali.
            </Text>
            <Section style={socialLinks}>
              <Link href={siteConfig.links.instagram} style={socialLink}>Instagram</Link>
              <Link href={siteConfig.links.facebook} style={socialLink}>Facebook</Link>
              <Link href={siteConfig.links.pinterest} style={socialLink}>Pinterest</Link>
            </Section>
          </Section>

          {/* Footer with unsubscribe */}
          <Section style={footer}>
            <Text style={footerText}>
              Hai ricevuto questa email perché ti sei iscritto alla newsletter di PCL Ceramic Lab
              con l'indirizzo {email}.
            </Text>
            <Text style={footerText}>
              © {new Date().getFullYear()} PCL Ceramic Lab. Tutti i diritti riservati.
            </Text>
            <Text style={footerLinks}>
              <Link href={`${siteConfig.url}/terms`} style={footerLink}>
                Termini e Condizioni
              </Link>{' '}
              •{' '}
              <Link href={`${siteConfig.url}/privacy`} style={footerLink}>
                Privacy Policy
              </Link>{' '}
              •{' '}
              <Link href={`${siteConfig.url}/unsubscribe?email=${encodeURIComponent(email)}`} style={footerLink}>
                Cancellati
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default NewsletterWelcomeEmail;

// Styles
const main = {
  backgroundColor: '#f9f9f9',
  fontFamily: 'Arial, sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0',
  maxWidth: '600px',
};

const header = {
  padding: '20px',
  textAlign: 'center' as const,
  backgroundColor: '#111',
  borderRadius: '5px 5px 0 0',
};

const headerText = {
  margin: '0',
  fontSize: '26px',
  fontWeight: 'bold',
  color: '#fff',
  letterSpacing: '2px',
};

const section = {
  backgroundColor: '#fff',
  padding: '20px',
  marginTop: '15px',
  borderRadius: '5px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
};

const title = {
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0 0 20px',
  color: '#111',
  textAlign: 'center' as const,
};

const sectionTitle = {
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 15px',
  color: '#111',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '1.5',
  margin: '0 0 15px',
  color: '#555',
};

const list = {
  paddingLeft: '20px',
  margin: '15px 0',
};

const listItem = {
  fontSize: '16px',
  lineHeight: '1.5',
  margin: '5px 0',
  color: '#555',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '25px 0',
};

const button = {
  backgroundColor: '#111',
  borderRadius: '5px',
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
};

const smallButton = {
  backgroundColor: '#111',
  borderRadius: '4px',
  color: '#fff',
  fontWeight: 'normal',
  fontSize: '14px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
};

const hr = {
  borderColor: '#eee',
  margin: '15px 0',
};

const productSection = {
  textAlign: 'center' as const,
  margin: '20px 0',
};

const productImage = {
  borderRadius: '4px',
  border: '1px solid #eee',
  margin: '0 auto 10px',
};

const productName = {
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 5px',
  color: '#111',
};

const productDescription = {
  fontSize: '14px',
  color: '#777',
  margin: '0 0 10px',
};

const socialLinks = {
  textAlign: 'center' as const,
  margin: '15px 0',
};

const socialLink = {
  color: '#0070f3',
  textDecoration: 'underline',
  margin: '0 10px',
};

const footer = {
  padding: '20px',
  textAlign: 'center' as const,
  color: '#888',
  marginTop: '15px',
};

const footerText = {
  fontSize: '12px',
  margin: '0 0 10px',
  lineHeight: '1.5',
};

const footerLinks = {
  fontSize: '12px',
  margin: '0',
};

const footerLink = {
  color: '#888',
  textDecoration: 'underline',
};
