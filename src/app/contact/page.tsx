"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Instagram, Facebook } from "lucide-react";

import { siteConfig } from "@/lib/config/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function ContactPage() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");

    // Simuliamo l'invio e la risposta
    setTimeout(() => {
      setFormState("success");
    }, 1500);
  };

  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold mb-2">Contattaci</h1>
      <p className="text-muted-foreground mb-12 max-w-2xl">
        Hai domande sui nostri prodotti, ordini o altro?
        Compila il modulo sottostante o utilizzare uno dei nostri canali di contatto diretto.
        Saremo felici di aiutarti!
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div>
          {formState === "success" ? (
            <div className="p-6 rounded-lg bg-primary/10 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 text-primary mb-4">
                <Send className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Messaggio inviato!</h2>
              <p className="text-muted-foreground">
                Grazie per averci contattato. Ti risponderemo al più presto.
              </p>
              <Button
                className="mt-6"
                onClick={() => setFormState("idle")}
              >
                Invia un altro messaggio
              </Button>
            </div>
          ) : (
            <form
              className="space-y-6 p-6 rounded-lg border"
              onSubmit={handleSubmit}
            >
              <div className="space-y-2">
                <Label htmlFor="name">Nome e cognome</Label>
                <Input id="name" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Oggetto</Label>
                <Input id="subject" required />
              </div>

              <div className="space-y-2">
                <Label>Motivo del contatto</Label>
                <RadioGroup defaultValue="info">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="info" id="info" />
                    <Label htmlFor="info" className="font-normal">Informazioni sui prodotti</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="order" id="order" />
                    <Label htmlFor="order" className="font-normal">Informazioni su un ordine</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="wholesale" id="wholesale" />
                    <Label htmlFor="wholesale" className="font-normal">Vendita all'ingrosso</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other" className="font-normal">Altro</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Messaggio</Label>
                <Textarea
                  id="message"
                  required
                  className="h-40 resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={formState === "submitting"}
              >
                {formState === "submitting" ? "Invio in corso..." : "Invia messaggio"}
              </Button>
            </form>
          )}
        </div>

        {/* Contact Info */}
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-bold mb-4">Come raggiungerci</h2>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Indirizzo</h3>
                  <p className="text-muted-foreground">{siteConfig.contact.address}</p>
                  <p className="text-sm mt-1">
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.contact.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Visualizza sulla mappa
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Telefono</h3>
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Orari di apertura</h2>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-muted-foreground">Lunedì - Venerdì</span>
                <span>9:30 - 18:30</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Sabato</span>
                <span>10:00 - 16:00</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Domenica</span>
                <span>Chiuso</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Seguici sui social</h2>
            <div className="flex gap-4">
              <a
                href={siteConfig.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href={siteConfig.links.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Map */}
          <div>
            <h2 className="text-xl font-bold mb-4">Dove siamo</h2>
            <div className="rounded-lg overflow-hidden border h-[300px] bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">Mappa del laboratorio</p>
              {/* In un'applicazione reale, qui inseriremmo una mappa interattiva */}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Domande frequenti</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg border">
            <h3 className="font-bold mb-2">Qual è il tempo di consegna?</h3>
            <p className="text-muted-foreground">
              I nostri ordini vengono spediti entro 1-3 giorni lavorativi e consegnati generalmente in 2-4 giorni lavorativi.
              Per ordini personalizzati i tempi possono variare, contattaci per maggiori informazioni.
            </p>
          </div>

          <div className="p-6 rounded-lg border">
            <h3 className="font-bold mb-2">Accettate ordini personalizzati?</h3>
            <p className="text-muted-foreground">
              Sì, realizziamo anche prodotti personalizzati su richiesta. Contattaci via email specificando
              le tue esigenze e ti forniremo tutte le informazioni necessarie.
            </p>
          </div>

          <div className="p-6 rounded-lg border">
            <h3 className="font-bold mb-2">Posso visitare il vostro laboratorio?</h3>
            <p className="text-muted-foreground">
              Assolutamente sì! Il nostro laboratorio è aperto al pubblico negli orari indicati.
              Ti consigliamo di contattarci in anticipo per assicurarti che ci sia qualcuno disponibile
              a mostrarti il processo di creazione.
            </p>
          </div>

          <div className="p-6 rounded-lg border">
            <h3 className="font-bold mb-2">Come posso tracciare il mio ordine?</h3>
            <p className="text-muted-foreground">
              Una volta spedito il tuo ordine, riceverai un'email con il numero di tracciamento.
              Potrai seguire lo stato della spedizione direttamente dal sito del corriere o dalla
              sezione "I miei ordini" del tuo account sul nostro sito.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
