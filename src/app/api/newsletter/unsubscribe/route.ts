import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db/prisma';

// Schema di validazione
const unsubscribeSchema = z.object({
  email: z.string().email('Email non valida'),
});

export async function POST(req: Request) {
  try {
    // Estrai e valida i dati
    const body = await req.json();
    const result = unsubscribeSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email } = result.data;

    // Verifica se l'email esiste
    const existingSubscription = await prisma.newsletter.findUnique({
      where: { email },
    });

    if (!existingSubscription) {
      return NextResponse.json(
        { success: false, error: 'Questa email non è iscritta alla newsletter' },
        { status: 404 }
      );
    }

    // Aggiorna lo stato dell'iscrizione
    await prisma.newsletter.update({
      where: { email },
      data: { subscribed: false },
    });

    return NextResponse.json(
      { success: true, message: 'Iscrizione alla newsletter annullata con successo' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Errore nell\'annullamento dell\'iscrizione alla newsletter:', error);
    return NextResponse.json(
      { success: false, error: 'Si è verificato un errore durante l\'annullamento dell\'iscrizione alla newsletter' },
      { status: 500 }
    );
  }
}

// Supporto per chiamate GET (clic su link di annullamento iscrizione)
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email non specificata' },
        { status: 400 }
      );
    }

    // Verifica se l'email esiste
    const existingSubscription = await prisma.newsletter.findUnique({
      where: { email },
    });

    if (!existingSubscription) {
      return new Response(
        '<html><body><h1>Errore</h1><p>Questa email non è iscritta alla newsletter</p></body></html>',
        {
          status: 404,
          headers: { 'Content-Type': 'text/html' },
        }
      );
    }

    // Aggiorna lo stato dell'iscrizione
    await prisma.newsletter.update({
      where: { email },
      data: { subscribed: false },
    });

    return new Response(
      '<html><body><h1>Iscrizione annullata</h1><p>La tua iscrizione alla newsletter è stata annullata con successo</p></body></html>',
      {
        status: 200,
        headers: { 'Content-Type': 'text/html' },
      }
    );
  } catch (error) {
    console.error('Errore nell\'annullamento dell\'iscrizione alla newsletter:', error);
    return new Response(
      '<html><body><h1>Errore</h1><p>Si è verificato un errore durante l\'annullamento dell\'iscrizione alla newsletter</p></body></html>',
      {
        status: 500,
        headers: { 'Content-Type': 'text/html' },
      }
    );
  }
}
