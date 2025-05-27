import { NextResponse } from "next/server";
import { getServerAuthSession } from "@/lib/auth/session";
import Stripe from "stripe";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15"
});

export async function POST(request: Request) {
  try {
    // Ottieni la sessione dell'utente (opzionale)
    const session = await getServerAuthSession();

    // Parse della richiesta JSON
    const { amount } = await request.json();

    // Validazione
    if (!amount || typeof amount !== "number" || amount <= 0) {
      return NextResponse.json(
        { message: "L'importo deve essere un numero positivo." },
        { status: 400 }
      );
    }

    // Crea il payment intent con Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Deve essere in centesimi (es. 1000 = €10.00)
      currency: "eur",
      automatic_payment_methods: { enabled: true },
      metadata: {
        userId: session?.user?.id || "guest",
      },
    });

    // Restituisci il client secret al client
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return NextResponse.json(
      { message: "Si è verificato un errore durante la creazione del pagamento." },
      { status: 500 }
    );
  }
}
