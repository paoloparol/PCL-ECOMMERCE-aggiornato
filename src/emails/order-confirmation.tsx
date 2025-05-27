import React from 'react';
import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Row,
  Section,
  Text,
} from '@react-email/components';
import { siteConfig } from '@/lib/config/site';
import type { CartItem } from '@/types';

interface OrderConfirmationEmailProps {
  orderNumber: string;
  customer: {
    name: string;
    email: string;
  };
  items: CartItem[];
  shippingAddress: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  orderSummary: {
    subtotal: number;
    shipping: number;
    tax: number;
    discount?: number;
    total: number;
  };
  paymentMethod: string;
  shippingMethod: string;
  estimatedDelivery: string;
}

export const OrderConfirmationEmail = ({
  orderNumber,
  customer,
  items,
  shippingAddress,
  orderSummary,
  paymentMethod,
  shippingMethod,
  estimatedDelivery,
}: OrderConfirmationEmailProps) => {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={headerText}>PCL CERAMIC LAB</Text>
          </Section>

          {/* Order confirmation title */}
          <Section style={titleSection}>
            <Heading style={title}>Conferma Ordine</Heading>
            <Text style={subtitle}>
              Grazie per il tuo ordine, {customer.name}!
            </Text>
            <Text style={orderNumberText}>
              Ordine #{orderNumber} • {new Date().toLocaleDateString('it-IT')}
            </Text>
          </Section>

          {/* Order summary */}
          <Section style={section}>
            <Heading as="h2" style={sectionTitle}>
              Riepilogo Ordine
            </Heading>
            <Hr style={hr} />

            {/* Products */}
            {items.map((item, index) => (
              <Row key={index} style={productRow}>
                <Column style={productImageContainer}>
                  <Img src={item.image} width="80" height="80" alt={item.name} style={productImage} />
                </Column>
                <Column style={productDetails}>
                  <Text style={productName}>{item.name}</Text>
                  <Text style={productVariant}>
                    {item.color}{item.size ? ` - ${item.size}` : ''}
                  </Text>
                  <Text style={productPrice}>
                    {item.quantity} x €{item.price.toFixed(2)}
                  </Text>
                </Column>
                <Column style={productTotal}>
                  <Text style={productTotalText}>
                    €{(item.price * item.quantity).toFixed(2)}
                  </Text>
                </Column>
              </Row>
            ))}

            <Hr style={hr} />

            {/* Pricing breakdown */}
            <Row style={summaryRow}>
              <Column style={{ width: '70%' }}>
                <Text style={summaryLabel}>Subtotale:</Text>
              </Column>
              <Column style={{ width: '30%' }}>
                <Text style={summaryValue}>€{orderSummary.subtotal.toFixed(2)}</Text>
              </Column>
            </Row>

            {orderSummary.discount && (
              <Row style={summaryRow}>
                <Column style={{ width: '70%' }}>
                  <Text style={summaryLabel}>Sconto:</Text>
                </Column>
                <Column style={{ width: '30%' }}>
                  <Text style={summaryValue}>-€{orderSummary.discount.toFixed(2)}</Text>
                </Column>
              </Row>
            )}

            <Row style={summaryRow}>
              <Column style={{ width: '70%' }}>
                <Text style={summaryLabel}>Spedizione:</Text>
              </Column>
              <Column style={{ width: '30%' }}>
                <Text style={summaryValue}>
                  {orderSummary.shipping === 0
                    ? 'Gratuita'
                    : `€${orderSummary.shipping.toFixed(2)}`}
                </Text>
              </Column>
            </Row>

            <Row style={summaryRow}>
              <Column style={{ width: '70%' }}>
                <Text style={summaryLabel}>IVA (22%):</Text>
              </Column>
              <Column style={{ width: '30%' }}>
                <Text style={summaryValue}>€{orderSummary.tax.toFixed(2)}</Text>
              </Column>
            </Row>

            <Hr style={hr} />

            <Row style={totalRow}>
              <Column style={{ width: '70%' }}>
                <Text style={totalLabel}>Totale:</Text>
              </Column>
              <Column style={{ width: '30%' }}>
                <Text style={totalValue}>€{orderSummary.total.toFixed(2)}</Text>
              </Column>
            </Row>
          </Section>

          {/* Shipping details */}
          <Section style={section}>
            <Heading as="h2" style={sectionTitle}>
              Informazioni di Spedizione
            </Heading>
            <Hr style={hr} />

            <Row>
              <Column style={{ width: '50%', paddingRight: '8px' }}>
                <Text style={detailsTitle}>Indirizzo di spedizione</Text>
                <Text style={detailsText}>
                  {shippingAddress.addressLine1}
                  {shippingAddress.addressLine2 && <><br />{shippingAddress.addressLine2}</>}
                  <br />
                  {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}
                  <br />
                  {shippingAddress.country}
                </Text>
              </Column>
              <Column style={{ width: '50%', paddingLeft: '8px' }}>
                <Text style={detailsTitle}>Metodo di spedizione</Text>
                <Text style={detailsText}>{shippingMethod}</Text>
                <Text style={detailsText}>Consegna stimata: {estimatedDelivery}</Text>
              </Column>
            </Row>
          </Section>

          {/* Payment details */}
          <Section style={section}>
            <Heading as="h2" style={sectionTitle}>
              Informazioni di Pagamento
            </Heading>
            <Hr style={hr} />

            <Text style={detailsTitle}>Metodo di pagamento</Text>
            <Text style={detailsText}>{paymentMethod}</Text>
          </Section>

          {/* Help and support */}
          <Section style={section}>
            <Text style={supportText}>
              Hai domande sul tuo ordine? Contattaci all'indirizzo{' '}
              <Link href={`mailto:${siteConfig.supportEmail}`} style={link}>
                {siteConfig.supportEmail}
              </Link>{' '}
              o visita la sezione{' '}
              <Link href={`${siteConfig.url}/faq`} style={link}>
                FAQ
              </Link>{' '}
              sul nostro sito.
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
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
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default OrderConfirmationEmail;

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

const titleSection = {
  padding: '30px 20px',
  textAlign: 'center' as const,
  backgroundColor: '#fff',
};

const title = {
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0 0 15px',
  color: '#111',
};

const subtitle = {
  fontSize: '16px',
  margin: '0 0 10px',
  color: '#555',
};

const orderNumberText = {
  fontSize: '14px',
  color: '#777',
  margin: '0',
};

const section = {
  backgroundColor: '#fff',
  padding: '20px',
  marginTop: '15px',
  borderRadius: '5px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
};

const sectionTitle = {
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 15px',
  color: '#111',
};

const hr = {
  borderColor: '#eee',
  margin: '15px 0',
};

const productRow = {
  marginBottom: '15px',
};

const productImageContainer = {
  width: '80px',
  verticalAlign: 'top',
};

const productImage = {
  borderRadius: '4px',
  border: '1px solid #eee',
};

const productDetails = {
  paddingLeft: '15px',
  verticalAlign: 'top',
};

const productName = {
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 5px',
  color: '#111',
};

const productVariant = {
  fontSize: '14px',
  color: '#777',
  margin: '0 0 5px',
};

const productPrice = {
  fontSize: '14px',
  color: '#555',
  margin: '0',
};

const productTotal = {
  width: '25%',
  textAlign: 'right' as const,
  verticalAlign: 'top',
};

const productTotalText = {
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#111',
};

const summaryRow = {
  margin: '5px 0',
};

const summaryLabel = {
  fontSize: '14px',
  color: '#555',
  textAlign: 'right' as const,
  paddingRight: '10px',
};

const summaryValue = {
  fontSize: '14px',
  color: '#555',
  textAlign: 'right' as const,
};

const totalRow = {
  margin: '10px 0',
};

const totalLabel = {
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#111',
  textAlign: 'right' as const,
  paddingRight: '10px',
};

const totalValue = {
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#111',
  textAlign: 'right' as const,
};

const detailsTitle = {
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0 0 5px',
  color: '#111',
};

const detailsText = {
  fontSize: '14px',
  color: '#555',
  margin: '0 0 10px',
};

const supportText = {
  fontSize: '14px',
  color: '#555',
  margin: '0',
  lineHeight: '1.5',
};

const link = {
  color: '#0070f3',
  textDecoration: 'underline',
};

const footer = {
  padding: '20px',
  textAlign: 'center' as const,
  color: '#888',
};

const footerText = {
  fontSize: '12px',
  margin: '0 0 10px',
};

const footerLinks = {
  fontSize: '12px',
  margin: '0',
};

const footerLink = {
  color: '#888',
  textDecoration: 'underline',
};
