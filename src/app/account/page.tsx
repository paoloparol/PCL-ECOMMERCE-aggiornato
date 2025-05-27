"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signOut } from "next-auth/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      // In una versione futura, qui recupereremo gli ordini dell'utente
      setIsLoading(false);
    }
  }, [status, router]);

  if (status === "loading" || isLoading) {
    return (
      <div className="container py-16 flex justify-center">
        <div className="w-full max-w-3xl">
          <div className="h-40 flex items-center justify-center">
            <p>Caricamento in corso...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-16">
      <div className="w-full max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Il mio account</h1>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profilo</TabsTrigger>
            <TabsTrigger value="orders">Ordini</TabsTrigger>
            <TabsTrigger value="addresses">Indirizzi</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Informazioni personali</CardTitle>
                <CardDescription>
                  Gestisci i dettagli del tuo account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Nome</p>
                    <p className="font-medium">{session?.user?.name || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{session?.user?.email || "N/A"}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <Button variant="outline" onClick={() => router.push("/account/edit-profile")}>
                    Modifica profilo
                  </Button>
                  <Button variant="destructive" onClick={() => signOut({ callbackUrl: "/" })}>
                    Esci
                  </Button>
                </div>
              </CardContent>
            </Card>

            {session?.user?.role === "ADMIN" && (
              <Card>
                <CardHeader>
                  <CardTitle>Pannello amministratore</CardTitle>
                  <CardDescription>
                    Accedi alle funzionalità di amministrazione
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => router.push("/admin")}>
                    Vai al pannello admin
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="orders" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>I miei ordini</CardTitle>
                <CardDescription>
                  Visualizza e gestisci i tuoi ordini
                </CardDescription>
              </CardHeader>
              <CardContent>
                {orders && orders.length > 0 ? (
                  <div className="space-y-4">
                    {/* Qui mostreremmo gli ordini dell'utente */}
                    <p>Funzionalità in arrivo</p>
                  </div>
                ) : (
                  <Alert>
                    <AlertTitle>Nessun ordine trovato</AlertTitle>
                    <AlertDescription>
                      Non hai ancora effettuato ordini. Esplora il nostro catalogo e scopri i nostri prodotti.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="addresses" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>I miei indirizzi</CardTitle>
                <CardDescription>
                  Gestisci i tuoi indirizzi di spedizione e fatturazione
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert>
                  <AlertTitle>Funzionalità in arrivo</AlertTitle>
                  <AlertDescription>
                    Presto potrai gestire i tuoi indirizzi di spedizione e fatturazione.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
