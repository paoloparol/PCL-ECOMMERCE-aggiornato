"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCartStore } from "@/lib/store/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { PaymentForm } from "@/components/checkout/payment-form";
import { toast } from "@/hooks/use-toast";
import {
  ChevronLeft,
  CreditCard,
  Lock,
  MapPin,
  Truck
} from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { cart } = useCartStore();
  const [step, setStep] = useState(1);
  const [isMounted, setIsMounted] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Italia",
    shippingMethod: "standard"
  });

  // Hydration fix
  useEffect(() => {
    setIsMounted(true);

    // Prefill form with user data if logged in
    if (status === "authenticated" && session.user) {
      setFormData(prev => ({
        ...prev,
        email: session.user.email || "",
        firstName: session.user.name?.split(" ")[0] || "",
        lastName: session.user.name?.split(" ").slice(1).join(" ") || ""
      }));
    }
  }, [status, session]);

  if (!isMounted) {
    return <div className="container-custom py-20">Caricamento checkout...</div>;
  }

  // Redirect to cart if cart is empty
  if (cart.items.length === 0) {
    router.push("/cart");
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleShippingMethodChange = (method: string) => {
    setFormData(prev => ({
      ...prev,
      shippingMethod: method
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const requiredFields = [
      "firstName", "lastName", "email", "phone",
      "address", "city", "postalCode", "country"
    ];

    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

    if (missingFields.length > 0) {
      toast({
        title: "Informazioni mancanti",
        description: "Completa tutti i campi obbligatori",
        variant: "destructive"
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Email non valida",
        description: "Inserisci un indirizzo email valido",
        variant: "destructive"
      });
      return;
    }

    // Proceed to payment
    setStep(2);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Informazioni personali</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-1">Nome *</label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-1">Cognome *</label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email *</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">Telefono *</label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="text-xl font-semibold mb-4">Indirizzo di spedizione</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium mb-1">Indirizzo *</label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium mb-1">Città *</label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium mb-1">CAP *</label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium mb-1">Paese *</label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="text-xl font-semibold mb-4">Metodo di spedizione</h2>
              <div className="space-y-3">
                <div className="border rounded-lg p-4 flex items-start gap-4 hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => handleShippingMethodChange("standard")}
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className={`w-5 h-5 rounded-full border-2 ${formData.shippingMethod === "standard" ? "border-primary bg-primary/20" : "border-muted-foreground"}`}>
                      {formData.shippingMethod === "standard" && (
                        <div className="w-3 h-3 rounded-full bg-primary mx-auto mt-0.5" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div className="font-medium">Spedizione standard</div>
                      <div className="font-medium">
                        {cart.shipping === 0 ? "Gratuita" : `€${cart.shipping.toFixed(2)}`}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Consegna in 3-5 giorni lavorativi
                    </p>
                  </div>
                </div>

                <div className="border rounded-lg p-4 flex items-start gap-4 hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => handleShippingMethodChange("express")}
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className={`w-5 h-5 rounded-full border-2 ${formData.shippingMethod === "express" ? "border-primary bg-primary/20" : "border-muted-foreground"}`}>
                      {formData.shippingMethod === "express" && (
                        <div className="w-3 h-3 rounded-full bg-primary mx-auto mt-0.5" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div className="font-medium">Spedizione espressa</div>
                      <div className="font-medium">€12.90</div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Consegna in 1-2 giorni lavorativi
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button asChild variant="outline">
                <Link href="/cart">
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Torna al carrello
                </Link>
              </Button>
              <Button onClick={handleSubmit}>
                Procedi al pagamento
              </Button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Pagamento</h2>
              <div className="bg-muted/30 rounded-lg p-6">
                <PaymentForm
                  amount={cart.total}
                  onSuccess={() => router.push("/checkout/success")}
                  onError={(message) => {
                    toast({
                      title: "Errore nel pagamento",
                      description: message,
                      variant: "destructive"
                    });
                  }}
                />
              </div>
            </div>

            <div className="bg-muted/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Lock className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Il tuo pagamento è sicuro. Utilizziamo la più recente tecnologia di crittografia SSL per proteggere i tuoi dati.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep(1)}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Indietro
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container-custom py-10">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative">
        {/* Checkout steps */}
        <div className="lg:col-span-2">
          {/* Progress Steps */}
          <div className="mb-8 flex items-center justify-center">
            <div className="flex items-center w-full max-w-lg">
              <div className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="text-sm mt-1">Spedizione</div>
              </div>
              <div className={`flex-1 h-1 ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
              <div className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  <CreditCard className="h-5 w-5" />
                </div>
                <div className="text-sm mt-1">Pagamento</div>
              </div>
              <div className={`flex-1 h-1 ${step >= 3 ? "bg-primary" : "bg-muted"}`} />
              <div className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  <Truck className="h-5 w-5" />
                </div>
                <div className="text-sm mt-1">Conferma</div>
              </div>
            </div>
          </div>

          {/* Step content */}
          {getStepContent()}
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-muted/30 rounded-lg p-6 space-y-6 lg:sticky lg:top-24">
            <h2 className="text-xl font-bold">Riepilogo ordine</h2>

            <div className="space-y-4">
              {cart.items.map((item) => (
                <div key={`${item.id}-${item.color}-${item.size}`} className="flex gap-3">
                  <div className="relative bg-muted w-16 h-16 rounded-md flex-shrink-0">
                    <div
                      className="absolute inset-0 bg-cover bg-center rounded-md"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{item.name}</h4>
                      <span>€{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {item.color}{item.size ? ` / ${item.size}` : ""} × {item.quantity}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotale</span>
                <span>€{cart.subtotal.toFixed(2)}</span>
              </div>

              {cart.discountAmount > 0 && (
                <div className="flex justify-between text-primary">
                  <span>Sconto</span>
                  <span>-€{cart.discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-muted-foreground">Spedizione</span>
                <span>
                  {cart.shipping === 0 ? "Gratuita" : `€${cart.shipping.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">IVA (22%)</span>
                <span>€{cart.tax.toFixed(2)}</span>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between text-lg font-bold">
              <span>Totale</span>
              <span>€{cart.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
