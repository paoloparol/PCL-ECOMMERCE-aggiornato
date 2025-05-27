"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";

// Schema di validazione per l'email
const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, { message: "L'email è obbligatoria" })
    .email({ message: "Inserisci un indirizzo email valido" }),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

interface NewsletterFormProps {
  variant?: "default" | "footer";
}

export function NewsletterForm({ variant = "default" }: NewsletterFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: NewsletterFormValues) {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Si è verificato un errore durante l'iscrizione");
      }

      toast({
        title: "Iscrizione avvenuta con successo!",
        description: "Grazie per esserti iscritto alla nostra newsletter.",
      });

      form.reset();
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      toast({
        title: "Errore durante l'iscrizione",
        description: error instanceof Error ? error.message : "Si è verificato un errore, riprova più tardi",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (variant === "footer") {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex">
                    <Input
                      {...field}
                      placeholder="Il tuo indirizzo email"
                      type="email"
                      className="rounded-r-none"
                      disabled={isSubmitting}
                    />
                    <Button
                      type="submit"
                      className="rounded-l-none"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "..." : "Iscriviti"}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex">
                  <Input
                    {...field}
                    placeholder="Il tuo indirizzo email"
                    type="email"
                    className="rounded-r-none"
                    disabled={isSubmitting}
                  />
                  <Button
                    type="submit"
                    className="rounded-l-none"
                    disabled={isSubmitting}
                    size="lg"
                  >
                    {isSubmitting ? "..." : "Iscriviti"}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
