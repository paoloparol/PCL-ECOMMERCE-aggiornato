import { Resend } from 'resend';
import { renderAsync } from '@react-email/components';
import OrderConfirmationEmail from '@/emails/order-confirmation';
import NewsletterWelcomeEmail from '@/emails/newsletter-welcome';
import type { CartItem } from '@/types';

// Inizializza Resend con la chiave API
const resend = new Resend(process.env.RESEND_API_KEY);

export interface OrderEmailData {
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

export interface NewsletterEmailData {
  firstName?: string;
  email: string;
}

export const emailService = {
  /**
   * Invia email di conferma ordine
   */
  async sendOrderConfirmation(data: OrderEmailData): Promise<{ success: boolean; error?: string }> {
    try {
      // Renderizza l'email come HTML
      const html = await renderAsync(OrderConfirmationEmail(data));

      // Invia l'email
      const { data: emailData, error } = await resend.emails.send({
        from: `PCL Ceramic Lab <noreply@pikiceramiclab.com>`,
        to: [data.customer.email],
        subject: `Conferma Ordine #${data.orderNumber} - PCL Ceramic Lab`,
        html,
      });

      if (error) {
        console.error('Error sending order confirmation email:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error: any) {
      console.error('Error sending order confirmation email:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Invia email di benvenuto alla newsletter
   */
  async sendNewsletterWelcome(data: NewsletterEmailData): Promise<{ success: boolean; error?: string }> {
    try {
      // Renderizza l'email come HTML
      const html = await renderAsync(NewsletterWelcomeEmail(data));

      // Invia l'email
      const { data: emailData, error } = await resend.emails.send({
        from: `PCL Ceramic Lab <newsletter@pikiceramiclab.com>`,
        to: [data.email],
        subject: `Benvenuto nella Newsletter di PCL Ceramic Lab`,
        html,
      });

      if (error) {
        console.error('Error sending newsletter welcome email:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error: any) {
      console.error('Error sending newsletter welcome email:', error);
      return { success: false, error: error.message };
    }
  }
};
