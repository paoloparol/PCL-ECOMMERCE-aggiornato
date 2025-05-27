import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db/prisma';
import { emailService } from '@/lib/email/email-service';

// Schema di validazione
const newsletterSchema = z.object({
  email: z.string().email('Email non valida'),
  name: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    // Estrai e valida i dati
    const body = await req.json();
    const result = newsletterSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email, name } = result.data;

    // Verifica se l'email esiste già
    const existingSubscription = await prisma.newsletter.findUnique({
      where: { email },
    });

    if (existingSubscription) {
      // Se l'iscrizione era stata annullata, la riattiviamo
      if (!existingSubscription.subscribed) {
        await prisma.newsletter.update({
          where: { email },
          data: { subscribed: true },
        });

        return NextResponse.json(
          { success: true, message: 'Iscrizione alla newsletter riattivata con successo' },
          { status: 200 }
        );
      }

      return NextResponse.json(
        { success: false, error: 'Questa email è già iscritta alla newsletter' },
        { status: 409 }
      );
    }

    // Crea una nuova iscrizione
    await prisma.newsletter.create({
      data: {
        email,
        name,
        subscribed: true,
      },
    });

    // Invia email di benvenuto
    await emailService.sendNewsletterWelcome({
      email,
      firstName: name,
    });

    return NextResponse.json(
      { success: true, message: 'Iscrizione alla newsletter completata con successo' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Errore nell\'iscrizione alla newsletter:', error);
    return NextResponse.json(
      { success: false, error: 'Si è verificato un errore durante l\'iscrizione alla newsletter' },
      { status: 500 }
    );
  }
}
