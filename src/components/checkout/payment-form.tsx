"use client";

import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface PaymentFormProps {
  amount: number;
  onSuccess: () => void;
  onError: (message: string) => void;
}

export function PaymentForm({ amount, onSuccess, onError }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [cardError, setCardError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js non è ancora caricato
      return;
    }

    setIsLoading(true);
    setCardError(null);

    try {
      // Crea un payment intent sul server
      const response = await fetch("/api/payment/create-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // Converti in centesimi
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Errore durante la creazione del payment intent");
      }

      // Conferma il pagamento con Stripe.js
      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        throw new Error("Impossibile trovare l'elemento carta");
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: "PCL Customer", // In un'app reale useremmo i dati forniti dall'utente
          },
        },
      });

      if (error) {
        throw new Error(error.message || "Errore durante il pagamento");
      }

      if (paymentIntent.status === "succeeded") {
        // Pagamento riuscito!
        onSuccess();
      } else {
        throw new Error(`Pagamento non completato. Stato: ${paymentIntent.status}`);
      }
    } catch (error) {
      console.error("Payment error:", error);
      setCardError(error instanceof Error ? error.message : "Si è verificato un errore durante il pagamento");
      onError(error instanceof Error ? error.message : "Si è verificato un errore durante il pagamento");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <label className="block text-sm font-medium" htmlFor="card-element">
          Dettagli carta di credito
        </label>
        <div className="p-3 border rounded-md bg-background">
          <CardElement
            id="card-element"
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
        {cardError && (
          <div className="text-sm text-destructive">{cardError}</div>
        )}
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          disabled={!stripe || isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Elaborazione in corso...
            </>
          ) : (
            `Paga €${amount.toFixed(2)}`
          )}
        </Button>
      </div>

      <div className="text-xs text-muted-foreground text-center">
        * Per effettuare un pagamento di test, utilizza il numero carta 4242 4242 4242 4242, con qualsiasi data futura e CVC.
      </div>
    </form>
  );
}
