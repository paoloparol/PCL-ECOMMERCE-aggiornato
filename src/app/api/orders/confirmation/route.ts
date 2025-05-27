import { NextResponse } from 'next/server';
import { z } from 'zod';
import { emailService, type OrderEmailData } from '@/lib/email/email-service';
import { CartItem } from '@/types';
import { getServerAuthSession } from '@/lib/auth/session';

// Schema per validare gli articoli del carrello
const cartItemSchema = z.object({
  id: z.string(),
  productId: z.string(),
  variantId: z.string(),
  name: z.string(),
  price: z.number().positive(),
  color: z.string(),
  size: z.string().optional(),
  quantity: z.number().int().positive(),
  image: z.string(),
});

// Schema per validare l'indirizzo
const addressSchema = z.object({
  addressLine1: z.string(),
  addressLine2: z.string().optional(),
  city: z.string(),
  state: z.string(),
  postalCode: z.string(),
  country: z.string(),
});

// Schema principale
const orderConfirmationSchema = z.object({
  orderNumber: z.string(),
  customer: z.object({
    name: z.string(),
    email: z.string().email(),
  }),
  items: z.array(cartItemSchema),
  shippingAddress: addressSchema,
  orderSummary: z.object({
    subtotal: z.number().positive(),
    shipping: z.number().min(0),
    tax: z.number().min(0),
    discount: z.number().min(0).optional(),
    total: z.number().positive(),
  }),
  paymentMethod: z.string(),
  shippingMethod: z.string(),
  estimatedDelivery: z.string(),
});

export async function POST(req: Request) {
  try {
    // Verifica autenticazione (solo utenti autenticati o admin possono inviare emails)
    const session = await getServerAuthSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Non autorizzato' },
        { status: 401 }
      );
    }

    // Estrai e valida i dati
    const body = await req.json();
    const result = orderConfirmationSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.errors[0].message },
        { status: 400 }
      );
    }

    const orderData = result.data as OrderEmailData;

    // Invia email di conferma ordine
    const { success, error } = await emailService.sendOrderConfirmation(orderData);

    if (!success) {
      return NextResponse.json(
        { success: false, error },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Email di conferma ordine inviata con successo' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Errore nell\'invio dell\'email di conferma ordine:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Si è verificato un errore durante l\'invio dell\'email di conferma ordine' },
      { status: 500 }
    );
  }
}
