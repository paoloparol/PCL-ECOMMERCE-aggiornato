import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { prisma } from "@/lib/db/prisma";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15"
});

// Webhook secret
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Disabilita il parsing del body per webhook Stripe (Next.js API route config)
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: Request) {
  const body = await request.text();
  const sig = headers().get("stripe-signature") || "";

  let event: Stripe.Event;

  try {
    // Verifica la firma del webhook
    if (!endpointSecret) {
      return NextResponse.json(
        { message: "Webhook secret non configurato" },
        { status: 500 }
      );
    }

    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error("Errore nella verifica della firma webhook:", err);
    return NextResponse.json(
      { message: "Firma webhook non valida" },
      { status: 400 }
    );
  }

  try {
    // Gestisci diversi tipi di eventi
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentIntentSucceeded(paymentIntent);
        break;
      case "payment_intent.payment_failed":
        const failedPaymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentIntentFailed(failedPaymentIntent);
        break;
      default:
        console.log(`Evento non gestito: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Errore nella gestione del webhook:", error);
    return NextResponse.json(
      { message: "Errore interno del server" },
      { status: 500 }
    );
  }
}

// Funzione per gestire il successo del pagamento
async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  const { userId } = paymentIntent.metadata || {};

  // In un'app reale, qui creeremmo un ordine nel database
  // e invieremmo un'email di conferma all'utente
  console.log(`Pagamento completato con successo: ${paymentIntent.id}`);
  console.log(`Utente ID: ${userId}`);
  console.log(`Importo: ${paymentIntent.amount / 100} ${paymentIntent.currency}`);

  try {
    // Esempio: crea un record dell'ordine nel database
    // Questo è un esempio semplificato, in un'app reale avremmo più dati
    await prisma.order.create({
      data: {
        id: paymentIntent.id,
        userId: userId || "guest",
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        status: "completed",
        paymentIntentId: paymentIntent.id,
        // items: JSON.parse(paymentIntent.metadata.items || "[]"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    console.error("Errore nella creazione dell'ordine:", error);
    throw error;
  }
}

// Funzione per gestire il fallimento del pagamento
async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  console.log(`Pagamento fallito: ${paymentIntent.id}`);
  console.log(`Motivo: ${paymentIntent.last_payment_error?.message || "Sconosciuto"}`);

  // In un'app reale, potremmo aggiornare lo stato dell'ordine
  // e inviare un'email all'utente per informarlo del problema
}
