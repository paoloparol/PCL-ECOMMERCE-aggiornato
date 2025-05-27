"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon, ShoppingCartIcon, PackageIcon, UsersIcon, ReceiptIcon, TagIcon } from "lucide-react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      const isAdmin = session?.user?.role === "ADMIN";
      setIsAuthorized(isAdmin);
      setIsLoading(false);

      if (!isAdmin) {
        router.push("/account");
      }
    }
  }, [status, session, router]);

  if (isLoading) {
    return (
      <div className="container py-16 flex justify-center">
        <div className="w-full max-w-6xl">
          <div className="h-40 flex items-center justify-center">
            <p>Caricamento in corso...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="container py-16 flex justify-center">
        <div className="w-full max-w-6xl">
          <Alert variant="destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Accesso negato</AlertTitle>
            <AlertDescription>
              Non hai i permessi necessari per accedere a questa pagina.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-16">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Pannello Amministratore</h1>
          <Button variant="outline" onClick={() => router.push("/account")}>
            Torna all'account
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <AdminCard
            title="Prodotti"
            description="Gestisci il catalogo prodotti"
            icon={<PackageIcon className="h-8 w-8 mb-2" />}
            value="15 prodotti"
            href="/admin/products"
          />

          <AdminCard
            title="Ordini"
            description="Gestisci gli ordini dei clienti"
            icon={<ShoppingCartIcon className="h-8 w-8 mb-2" />}
            value="3 nuovi ordini"
            href="/admin/orders"
          />

          <AdminCard
            title="Clienti"
            description="Gestisci gli account cliente"
            icon={<UsersIcon className="h-8 w-8 mb-2" />}
            value="24 clienti"
            href="/admin/customers"
          />

          <AdminCard
            title="Vendite"
            description="Metriche e statistiche di vendita"
            icon={<ReceiptIcon className="h-8 w-8 mb-2" />}
            value="€1,250 questo mese"
            href="/admin/sales"
          />

          <AdminCard
            title="Coupon"
            description="Gestisci codici sconto e promozioni"
            icon={<TagIcon className="h-8 w-8 mb-2" />}
            value="5 coupon attivi"
            href="/admin/coupons"
          />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Funzionalità in arrivo</CardTitle>
              <CardDescription>
                Nuove funzionalità di amministrazione in fase di sviluppo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Dashboard con statistiche in tempo reale</li>
                <li>Gestione inventario avanzata</li>
                <li>Importazione/esportazione prodotti CSV</li>
                <li>Reportistica avanzata vendite</li>
                <li>Gestione recensioni clienti</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function AdminCard({ title, description, icon, value, href }: {
  title: string;
  description: string;
  icon: React.ReactNode;
  value: string;
  href: string;
}) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex flex-col items-center text-xl">
          {icon}
          {title}
        </CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center font-semibold text-lg">{value}</p>
      </CardContent>
      <CardFooter className="bg-muted/50 p-2">
        <Link href={href} className="w-full">
          <Button variant="default" className="w-full">
            Gestisci
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
