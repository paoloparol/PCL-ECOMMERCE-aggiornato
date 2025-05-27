"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { MinusCircle, PlusCircle, ShoppingCart, Trash2, XCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function CartPage() {
  const router = useRouter();
  const { cart, removeItem, updateItemQuantity, clearCart, applyCoupon, removeCoupon } = useCartStore();
  const [couponCode, setCouponCode] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Hydration fix
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="container-custom py-20">Caricamento carrello...</div>;
  }

  const handleRemoveItem = (id: string) => {
    removeItem(id);
    toast({
      title: "Prodotto rimosso",
      description: "Il prodotto è stato rimosso dal carrello",
    });
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateItemQuantity(id, newQuantity);
  };

  const handleCouponApply = () => {
    if (!couponCode) return;

    setIsApplyingCoupon(true);

    // Simuliamo una chiamata API per verificare il coupon
    setTimeout(() => {
      // In un'app reale, qui verificheremmo il coupon con un'API
      if (couponCode.toLowerCase() === "sconto10") {
        // Applica uno sconto del 10% sul subtotal
        const discount = cart.subtotal * 0.10;
        applyCoupon(couponCode, discount);
        toast({
          title: "Coupon applicato",
          description: `Hai ricevuto uno sconto di €${discount.toFixed(2)}`,
        });
      } else {
        toast({
          title: "Coupon non valido",
          description: "Il codice inserito non è valido o è scaduto",
          variant: "destructive",
        });
      }
      setIsApplyingCoupon(false);
    }, 800);
  };

  const handleCouponRemove = () => {
    removeCoupon();
    setCouponCode("");
    toast({
      title: "Coupon rimosso",
      description: "Il codice sconto è stato rimosso",
    });
  };

  return (
    <div className="container-custom py-10">
      <h1 className="text-3xl font-bold mb-6">Il tuo carrello</h1>

      {cart.items.length === 0 ? (
        <div className="text-center py-20 space-y-6">
          <div className="mx-auto w-20 h-20 flex items-center justify-center rounded-full bg-muted">
            <ShoppingCart className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold">Il tuo carrello è vuoto</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Sembra che tu non abbia ancora aggiunto nessun prodotto al carrello.
          </p>
          <Button asChild size="lg" className="mt-4">
            <Link href="/products">Continua lo shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="hidden md:grid grid-cols-12 gap-4 py-3 px-4 bg-muted/50 rounded-lg text-sm font-medium">
              <div className="col-span-6">Prodotto</div>
              <div className="col-span-2 text-center">Prezzo</div>
              <div className="col-span-2 text-center">Quantità</div>
              <div className="col-span-2 text-right">Totale</div>
            </div>

            {cart.items.map((item) => (
              <div key={`${item.id}-${item.color}-${item.size}`} className="border rounded-lg p-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                {/* Mobile layout: Item info */}
                <div className="md:hidden flex items-center justify-between">
                  <h3 className="font-medium">{item.name}</h3>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                    aria-label="Rimuovi"
                  >
                    <XCircle className="h-5 w-5" />
                  </button>
                </div>

                {/* Product info */}
                <div className="md:col-span-6 flex items-center gap-4">
                  <div className="relative h-20 w-20 bg-muted rounded overflow-hidden flex-shrink-0">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium hidden md:block">
                      <Link href={`/products/${item.id}`} className="hover:underline">
                        {item.name}
                      </Link>
                    </h3>
                    {(item.color || item.size) && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.color}{item.size ? ` / ${item.size}` : ""}
                      </p>
                    )}
                    <div className="md:hidden flex items-center justify-between mt-2">
                      <span className="font-medium">€{item.price.toFixed(2)}</span>
                      <div className="flex items-center">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="text-muted-foreground hover:text-primary transition-colors disabled:opacity-50"
                        >
                          <MinusCircle className="h-5 w-5" />
                        </button>
                        <span className="mx-2 w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <PlusCircle className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    <div className="md:hidden mt-2 flex items-center justify-between">
                      <span>Totale:</span>
                      <span className="font-bold">€{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Price - visible on desktop */}
                <div className="hidden md:flex md:col-span-2 items-center justify-center">
                  <span>€{item.price.toFixed(2)}</span>
                </div>

                {/* Quantity - visible on desktop */}
                <div className="hidden md:flex md:col-span-2 items-center justify-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="text-muted-foreground hover:text-primary transition-colors disabled:opacity-50"
                  >
                    <MinusCircle className="h-5 w-5" />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <PlusCircle className="h-5 w-5" />
                  </button>
                </div>

                {/* Total - visible on desktop */}
                <div className="hidden md:flex md:col-span-2 items-center justify-between">
                  <span className="font-bold">€{(item.price * item.quantity).toFixed(2)}</span>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                    aria-label="Rimuovi"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between pt-4">
              <Button variant="outline" size="sm" onClick={clearCart} className="flex items-center gap-1">
                <Trash2 className="h-4 w-4" />
                Svuota carrello
              </Button>
              <Button asChild variant="outline">
                <Link href="/products">Continua lo shopping</Link>
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-muted/30 rounded-lg p-6 space-y-6">
              <h2 className="text-xl font-bold">Riepilogo ordine</h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotale</span>
                  <span>€{cart.subtotal.toFixed(2)}</span>
                </div>

                {cart.discountAmount > 0 && (
                  <div className="flex justify-between text-primary">
                    <span className="flex items-center">
                      Sconto
                      <button
                        onClick={handleCouponRemove}
                        className="ml-2 text-muted-foreground hover:text-destructive"
                        aria-label="Rimuovi coupon"
                      >
                        <XCircle className="h-4 w-4" />
                      </button>
                    </span>
                    <span>-€{cart.discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Spedizione</span>
                  <span>
                    {cart.shipping === 0 ? (
                      <span className="text-primary font-medium">Gratuita</span>
                    ) : (
                      `€${cart.shipping.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">IVA (22%)</span>
                  <span>€{cart.tax.toFixed(2)}</span>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Totale</span>
                  <span>€{cart.total.toFixed(2)}</span>
                </div>
              </div>

              {!cart.couponCode && (
                <div className="space-y-3">
                  <p className="text-sm font-medium">Hai un codice sconto?</p>
                  <div className="flex gap-2">
                    <Input
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Inserisci il codice"
                      disabled={isApplyingCoupon}
                    />
                    <Button
                      onClick={handleCouponApply}
                      disabled={!couponCode || isApplyingCoupon}
                      className="min-w-[80px]"
                    >
                      {isApplyingCoupon ? "..." : "Applica"}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Prova con il codice "SCONTO10" per uno sconto del 10%.
                  </p>
                </div>
              )}

              <Button
                onClick={() => router.push("/checkout")}
                className="w-full"
                size="lg"
              >
                Procedi al checkout
              </Button>

              <div className="text-xs text-center text-muted-foreground mt-4">
                <p>Spedizione gratuita per ordini superiori a €80</p>
                <p className="mt-1">
                  Accetti i nostri{" "}
                  <Link href="/terms" className="underline hover:text-foreground">
                    Termini e condizioni
                  </Link>{" "}
                  procedendo con l'acquisto.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
