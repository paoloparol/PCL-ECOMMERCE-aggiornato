"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store/cart";
import { Button } from "@/components/ui/button";
import { CheckCircle, PackageOpen, Package, ChevronRight, Mail } from "lucide-react";

export default function SuccessPage() {
  const router = useRouter();
  const { cart, clearCart } = useCartStore();

  // Se l'utente va direttamente a questa pagina senza un carrello, redirigiamolo alla home
  useEffect(() => {
    if (!cart || cart.items.length === 0) {
      router.push("/");
      return;
    }

    // Pulisci il carrello solo se siamo arrivati qui dopo un checkout completo
    // Questo è un semplificazione - in un'app reale, verificheremmo lo stato dell'ordine nel database
    const timer = setTimeout(() => {
      clearCart();
    }, 1000);

    return () => clearTimeout(timer);
  }, [cart, router, clearCart]);

  // Numero d'ordine generato casualmente per questo esempio
  const orderNumber = `PCL-${Math.floor(Math.random() * 10000).toString().padStart(5, '0')}`;

  return (
    <div className="container-custom py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-primary" />
        </div>

        <h1 className="text-3xl font-bold mb-4">Grazie per il tuo ordine!</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Il tuo ordine è stato confermato e sarà spedito a breve.
        </p>

        <div className="bg-muted/30 p-6 rounded-lg mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Numero ordine</p>
              <p className="font-medium">{orderNumber}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Data ordine</p>
              <p className="font-medium">{new Date().toLocaleDateString('it-IT')}</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <p className="flex items-center gap-2 justify-center text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              Abbiamo inviato i dettagli dell'ordine alla tua email
            </p>
          </div>
        </div>

        <div className="space-y-3 mb-10">
          <h2 className="text-xl font-semibold">Cosa succederà ora?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-background p-6 rounded-lg border space-y-3">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium text-center">Preparazione</h3>
              <p className="text-sm text-muted-foreground text-center">
                Prepareremo il tuo ordine con la massima cura e attenzione
              </p>
            </div>

            <div className="bg-background p-6 rounded-lg border space-y-3">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                <PackageOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium text-center">Spedizione</h3>
              <p className="text-sm text-muted-foreground text-center">
                Spediremo i prodotti e riceverai un'email con il tracking
              </p>
            </div>

            <div className="bg-background p-6 rounded-lg border space-y-3">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium text-center">Consegna</h3>
              <p className="text-sm text-muted-foreground text-center">
                I tuoi prodotti arriveranno presto e pronti per essere utilizzati
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/account">
              Gestisci i tuoi ordini
            </Link>
          </Button>
          <Button asChild size="lg">
            <Link href="/products">
              Continua lo shopping
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
