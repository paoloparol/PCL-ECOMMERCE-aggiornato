"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon, SearchIcon, FilterIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { MoreHorizontalIcon } from "lucide-react";

// Mock data for orders
const mockOrders = [
  {
    id: "ord-001",
    customerName: "Mario Rossi",
    customerEmail: "mario.rossi@example.com",
    date: "2025-05-12T14:30:00Z",
    total: 135.90,
    status: "pending",
    paymentStatus: "pending",
    items: [
      { id: "item-1", name: "Mug Drop", quantity: 2, price: 35.00 },
      { id: "item-2", name: "Tazza Goccia", quantity: 1, price: 28.00 },
      { id: "item-3", name: "Set di Shot Drop", quantity: 1, price: 45.00 }
    ]
  },
  {
    id: "ord-002",
    customerName: "Giulia Bianchi",
    customerEmail: "giulia.bianchi@example.com",
    date: "2025-05-11T10:15:00Z",
    total: 62.00,
    status: "processing",
    paymentStatus: "completed",
    items: [
      { id: "item-1", name: "Tazza Goccia", quantity: 1, price: 28.00 },
      { id: "item-2", name: "Piatto Drop", quantity: 1, price: 32.00 }
    ]
  },
  {
    id: "ord-003",
    customerName: "Luigi Verdi",
    customerEmail: "luigi.verdi@example.com",
    date: "2025-05-10T16:45:00Z",
    total: 125.00,
    status: "shipped",
    paymentStatus: "completed",
    items: [
      { id: "item-1", name: "Set di Shot Drop", quantity: 1, price: 45.00 },
      { id: "item-2", name: "Contenitore Drop", quantity: 2, price: 38.00 }
    ]
  },
  {
    id: "ord-004",
    customerName: "Anna Neri",
    customerEmail: "anna.neri@example.com",
    date: "2025-05-09T09:20:00Z",
    total: 153.00,
    status: "delivered",
    paymentStatus: "completed",
    items: [
      { id: "item-1", name: "Mug Drop", quantity: 3, price: 35.00 },
      { id: "item-2", name: "Tazza Goccia", quantity: 2, price: 28.00 }
    ]
  },
  {
    id: "ord-005",
    customerName: "Marco Gialli",
    customerEmail: "marco.gialli@example.com",
    date: "2025-05-08T11:00:00Z",
    total: 25.00,
    status: "canceled",
    paymentStatus: "refunded",
    items: [
      { id: "item-1", name: "Borsa in Tela PCL", quantity: 1, price: 25.00 }
    ]
  }
];

const statusLabels: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  pending: { label: "In attesa", variant: "outline" },
  processing: { label: "In elaborazione", variant: "default" },
  shipped: { label: "Spedito", variant: "secondary" },
  delivered: { label: "Consegnato", variant: "default" },
  canceled: { label: "Annullato", variant: "destructive" }
};

const paymentStatusLabels: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  pending: { label: "In attesa", variant: "outline" },
  completed: { label: "Completato", variant: "default" },
  failed: { label: "Fallito", variant: "destructive" },
  refunded: { label: "Rimborsato", variant: "secondary" }
};

export default function AdminOrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      const isAdmin = session?.user?.role === "ADMIN";
      setIsAuthorized(isAdmin);

      if (isAdmin) {
        // Carica gli ordini (attualmente utilizziamo dati di esempio)
        setOrders(mockOrders);
      } else {
        router.push("/account");
      }

      setIsLoading(false);
    }
  }, [status, session, router]);

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).format(date);
  };

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
          <h1 className="text-3xl font-bold">Gestione Ordini</h1>
          <Button variant="outline" onClick={() => router.push("/admin")}>
            Torna alla dashboard
          </Button>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Ordini clienti</CardTitle>
            <CardDescription>
              Visualizza e gestisci tutti gli ordini dei clienti
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-6 gap-4">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cerca per ordine, cliente o email..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2">
                <FilterIcon className="h-4 w-4 text-muted-foreground" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filtra per stato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tutti gli stati</SelectItem>
                    <SelectItem value="pending">In attesa</SelectItem>
                    <SelectItem value="processing">In elaborazione</SelectItem>
                    <SelectItem value="shipped">Spedito</SelectItem>
                    <SelectItem value="delivered">Consegnato</SelectItem>
                    <SelectItem value="canceled">Annullato</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Ordine</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Totale</TableHead>
                    <TableHead>Stato</TableHead>
                    <TableHead>Pagamento</TableHead>
                    <TableHead className="w-[80px]">Azioni</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>
                          <div>
                            <div>{order.customerName}</div>
                            <div className="text-sm text-muted-foreground">{order.customerEmail}</div>
                          </div>
                        </TableCell>
                        <TableCell>{formatDate(order.date)}</TableCell>
                        <TableCell>€{order.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge variant={statusLabels[order.status].variant}>
                            {statusLabels[order.status].label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={paymentStatusLabels[order.paymentStatus].variant}>
                            {paymentStatusLabels[order.paymentStatus].label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontalIcon className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Azioni</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => router.push(`/admin/orders/${order.id}`)}>
                                Visualizza dettagli
                              </DropdownMenuItem>
                              <DropdownMenuItem>Aggiorna stato</DropdownMenuItem>
                              <DropdownMenuItem>Invia email cliente</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Genera fattura</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                Annulla ordine
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        Nessun ordine trovato.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
