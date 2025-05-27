"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { LogOut, Menu, Search, ShoppingCart, User, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config/site";
import { useCartStore } from "@/lib/store/cart";
import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { cart } = useCartStore();

  const itemCount = cart.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-bold text-2xl tracking-tight">
            <span className="block text-dill-green-700 font-bold">PCL PikiCeramicLab</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={cn(
                "text-base font-medium hover:text-primary transition-colors",
                pathname === "/" && "text-primary font-semibold"
              )}
            >
              Home
            </Link>

            {/* Shop Link Diretto */}
            <Link
              href="/products"
              className={cn(
                "text-base font-medium hover:text-primary transition-colors",
                pathname.startsWith("/products") && "text-primary font-semibold"
              )}
            >
              Shop
            </Link>

            <Link
              href="/about"
              className={cn(
                "text-base font-medium hover:text-primary transition-colors",
                pathname === "/about" && "text-primary font-semibold"
              )}
            >
              Chi siamo
            </Link>

            <Link
              href="/contact"
              className={cn(
                "text-base font-medium hover:text-primary transition-colors",
                pathname === "/contact" && "text-primary font-semibold"
              )}
            >
              Contatti
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className={cn("relative", isSearchOpen && "flex-1")}>
              {isSearchOpen ? (
                <div className="flex items-center w-full border-b">
                  <Search className="h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Cerca prodotti..."
                    className="flex-1 px-2 py-1 bg-transparent focus:outline-none"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(true)}
                  className="text-foreground"
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}
            </div>

            <UserAccountButton />

            {/* Cart */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground relative">
                  <ShoppingCart className="h-5 w-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-md">
                <CartSheet />
              </SheetContent>
            </Sheet>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-foreground">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0">
                <MobileNavigation />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>


    </header>
  );
}

function MobileNavigation() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  return (
    <div className="flex flex-col space-y-6 mt-8">
      <Link href="/" className="font-bold text-2xl tracking-tight mb-6">
        <span className="block text-primary font-bold">PCL PikiCeramicLab</span>
      </Link>

      <Link
        href="/"
        className={cn(
          "text-lg font-medium hover:text-primary",
          pathname === "/" && "text-primary font-semibold"
        )}
      >
        Home
      </Link>

      <div className="space-y-3">
        <Link
          href="/products"
          className={cn(
            "text-lg font-medium hover:text-primary",
            pathname === "/products" && "text-primary font-semibold"
          )}
        >
          Shop
        </Link>

        <div className="ml-4 pl-2 border-l space-y-3">
          <Link
            href="/products/category/tazze"
            className="block text-base text-muted-foreground hover:text-primary"
          >
            Tazze
          </Link>
          <Link
            href="/products/category/mugs"
            className="block text-base text-muted-foreground hover:text-primary"
          >
            Mugs
          </Link>
          <Link
            href="/products/category/shots"
            className="block text-base text-muted-foreground hover:text-primary"
          >
            Sets di Shot
          </Link>
          <Link
            href="/products/category/piatti"
            className="block text-base text-muted-foreground hover:text-primary"
          >
            Piatti
          </Link>
          <Link
            href="/products/category/borse"
            className="block text-base text-muted-foreground hover:text-primary"
          >
            Borse
          </Link>
        </div>
      </div>

      <Link
        href="/about"
        className={cn(
          "text-lg font-medium hover:text-primary",
          pathname === "/about" && "text-primary font-semibold"
        )}
      >
        Chi siamo
      </Link>

      <Link
        href="/contact"
        className={cn(
          "text-lg font-medium hover:text-primary",
          pathname === "/contact" && "text-primary font-semibold"
        )}
      >
        Contatti
      </Link>

      <div className="mt-8 pt-8 border-t">
        {status === "authenticated" ? (
          <>
            <Link href="/account" className="flex items-center gap-2 text-base font-medium">
              <User className="h-4 w-4" />
              Il mio account
            </Link>
            {session?.user?.role === "ADMIN" && (
              <Link href="/admin" className="flex items-center gap-2 text-base font-medium mt-4">
                <User className="h-4 w-4" />
                Pannello admin
              </Link>
            )}
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-2 text-base font-medium mt-4"
            >
              <LogOut className="h-4 w-4" />
              Esci
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="flex items-center gap-2 text-base font-medium">
              <User className="h-4 w-4" />
              Accedi
            </Link>
            <Link href="/register" className="flex items-center gap-2 text-base font-medium mt-4">
              <User className="h-4 w-4" />
              Registrati
            </Link>
          </>
        )}
      </div>

      <div className="pt-8 mt-auto">
        <div className="flex gap-6">
          {Object.entries(siteConfig.links).map(([platform, url]) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function CartSheet() {
  const { cart, removeItem, updateItemQuantity, clearCart } = useCartStore();

  if (cart.items.length === 0) {
    return (
      <div className="flex flex-col h-full justify-center items-center">
        <h2 className="text-xl font-semibold">Il tuo carrello è vuoto</h2>
        <p className="text-muted-foreground mt-2 text-center">Aggiungi alcuni prodotti al carrello per vederli qui.</p>
        <Link href="/products" className="btn-humanrace mt-6">
          Continua lo shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between pb-4 border-b">
        <h2 className="text-lg font-semibold">Il tuo carrello</h2>
        <Button variant="ghost" size="sm" onClick={() => clearCart()}>
          Svuota
        </Button>
      </div>

      <div className="flex-1 overflow-auto py-4">
        <ul className="space-y-6">
          {cart.items.map((item) => (
  <li
    key={`${item.id}-${item.color || ""}-${item.size || ""}`}
    className="flex gap-4"
    >
              <div className="relative w-20 h-20 bg-muted rounded overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
              </div>

              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-medium">{item.name}</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => removeItem(item.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground mb-2">
                  {item.color}{item.size ? ` / ${item.size}` : ''}
                </p>

                <div className="flex justify-between items-center">
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </div>

                  <p className="font-medium">€{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t pt-4 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotale</span>
            <span>€{cart.subtotal.toFixed(2)}</span>
          </div>

          {cart.discountAmount ? (
            <div className="flex justify-between text-primary">
              <span>Sconto ({cart.couponCode})</span>
              <span>-€{cart.discountAmount.toFixed(2)}</span>
            </div>
          ) : null}

          <div className="flex justify-between">
            <span>Spedizione</span>
            <span>{cart.shipping === 0 ? 'Gratuita' : `€${cart.shipping.toFixed(2)}`}</span>
          </div>

          <div className="flex justify-between">
            <span>IVA (22%)</span>
            <span>€{cart.tax.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-lg font-bold pt-2 border-t">
            <span>Totale</span>
            <span>€{cart.total.toFixed(2)}</span>
          </div>
        </div>

        <Link href="/checkout" className="btn-humanrace w-full block text-center">
          Procedi al checkout
        </Link>

        <Link href="/cart" className="btn-humanrace-outline w-full block text-center">
          Vedi carrello
        </Link>
      </div>
    </div>
  );
}

function UserAccountButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <Button variant="ghost" size="icon" className="text-foreground">
        <User className="h-5 w-5" />
      </Button>
    );
  }

  if (status === "authenticated") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative text-foreground">
            <User className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary"></span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-1 leading-none">
              {session.user.name && <p className="font-medium">{session.user.name}</p>}
              {session.user.email && (
                <p className="w-[200px] truncate text-sm text-muted-foreground">
                  {session.user.email}
                </p>
              )}
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/account">Il mio account</Link>
          </DropdownMenuItem>
          {session.user.role === "ADMIN" && (
            <DropdownMenuItem asChild>
              <Link href="/admin">Pannello admin</Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onSelect={(event) => {
              event.preventDefault();
              signOut({ callbackUrl: "/" });
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Esci</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-foreground">
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem asChild>
          <Link href="/login">Accedi</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/register">Registrati</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
