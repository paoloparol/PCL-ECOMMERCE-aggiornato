"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Info, Minus, Plus, ShoppingBag } from "lucide-react";
import { products, Product, type ProductColor } from "@/lib/db/products";
import { ThreeDDrop } from "@/components/animations/3d-drop";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/product/product-card";
import { useCartStore } from "@/lib/store/cart";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function ProductPage() {
  const params = useParams();
  const { addItem } = useCartStore();
// Stati per la selezione di colore, taglia e quantità
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]?.value || "");
  const [quantity, setQuantity] = useState(1);
  // Trova il prodotto in base allo slug nell'URL
  const product = products.find((p) => p.slug === params.slug);

  // Se il prodotto non esiste, visualizza un messaggio di errore
  if (!product) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="text-2xl font-bold">Prodotto non trovato</h1>
        <p className="mt-4 text-muted-foreground">
          Il prodotto che stai cercando non esiste o è stato rimosso.
        </p>
        <Button asChild className="mt-8">
          <Link href="/products">Torna al catalogo</Link>
        </Button>
      </div>
    );
  }

  

  // Prodotti correlati (altri prodotti della stessa categoria)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      quantity,
      image: product.images[0],
      color: selectedColor?.name || "",
      size: selectedSize,
    });
  };

  return (
    <div className="container-custom py-10">
      {/* Breadcrumb e navigazione */}
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" asChild className="flex items-center text-muted-foreground">
          <Link href="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Torna ai prodotti
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Immagini prodotto */}
        <div className="space-y-4">
          <Carousel className="w-full">
            <CarouselContent>
              {(selectedColor?.images || product.images).map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-square overflow-hidden rounded-md">
                    <Image
                      src={image}
                      alt={`${product.name} - Immagine ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={index === 0}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>

          <div className="grid grid-cols-4 gap-2">
            {(selectedColor?.images || product.images).slice(0, 4).map((image, index) => (
              <div key={index} className="relative aspect-square overflow-hidden rounded-md border">
                <Image
                  src={image}
                  alt={`${product.name} - Miniatura ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 25vw, 10vw"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dettagli prodotto */}
        <div className="space-y-6">
          {/* Nome, prezzo e distintivi */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              {product.isNew && <Badge variant="secondary">Nuovo</Badge>}
              {product.isBestseller && <Badge>Bestseller</Badge>}
            </div>
            <div className="text-2xl font-bold">€{product.price.toFixed(2)}</div>
          </div>

          {/* Descrizione */}
          <p className="text-muted-foreground">{product.description}</p>

          {/* Anteprima 3D */}
          <div className="flex justify-center py-4">
            <ThreeDDrop
              color={selectedColor?.color || "#00aaff"}
              size="lg"
              interactive={true}
              autoRotate={true}
            />
          </div>

          {/* Selettore colori */}
          {product.colors.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Colore:</span>
                <span>{selectedColor?.name || "Non selezionato"}</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    className={`relative w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor?.name === color.name
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-muted hover:border-primary/50"
                    }`}
                    style={{ backgroundColor: color.color }}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Seleziona colore ${color.name}`}
                  >
                    {selectedColor?.name === color.name && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <Check className="h-4 w-4 text-white drop-shadow-md" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Selettore taglie */}
          {product.sizes.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Taglia:</span>
                <span>{product.sizes.find(s => s.value === selectedSize)?.name || "Non selezionata"}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size.value}
                    className={`px-4 py-2 border rounded-md transition-colors ${
                      selectedSize === size.value
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-input hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedSize(size.value)}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Selettore quantità e pulsante aggiungi al carrello */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Quantità:</span>
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-10 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button
              className="w-full h-12 text-base"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="mr-2 h-5 w-5" /> Aggiungi al carrello
            </Button>

            <div className="flex items-center text-sm text-muted-foreground">
              <Info className="h-4 w-4 mr-2" />
              {product.stock > 10
                ? "Disponibilità immediata"
                : product.stock > 0
                  ? `Solo ${product.stock} rimasti in magazzino`
                  : "Prodotto esaurito"}
            </div>
          </div>
        </div>
      </div>

      {/* Schede informative */}
      <div className="mt-16">
        <Tabs defaultValue="details">
          <TabsList className="grid grid-cols-3 w-full md:w-[600px] mx-auto">
            <TabsTrigger value="details">Dettagli</TabsTrigger>
            <TabsTrigger value="specs">Specifiche</TabsTrigger>
            <TabsTrigger value="care">Manutenzione</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="mt-6 px-1">
            <div className="max-w-3xl mx-auto prose">
              <p>
                {product.description}
              </p>
              <ul>
                {product.details.features?.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="specs" className="mt-6 px-1">
            <div className="max-w-3xl mx-auto">
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                {product.details.dimensions && (
                  <>
                    <dt className="font-medium">Dimensioni</dt>
                    <dd className="text-muted-foreground">{product.details.dimensions}</dd>
                  </>
                )}
                {product.details.material && (
                  <>
                    <dt className="font-medium">Materiale</dt>
                    <dd className="text-muted-foreground">{product.details.material}</dd>
                  </>
                )}
                <dt className="font-medium">Colori disponibili</dt>
                <dd className="text-muted-foreground">{product.colors.map(c => c.name).join(", ")}</dd>
                {product.sizes.length > 0 && (
                  <>
                    <dt className="font-medium">Taglie disponibili</dt>
                    <dd className="text-muted-foreground">{product.sizes.map(s => s.name).join(", ")}</dd>
                  </>
                )}
              </dl>
            </div>
          </TabsContent>
          <TabsContent value="care" className="mt-6 px-1">
            <div className="max-w-3xl mx-auto">
              <h3 className="font-medium text-lg mb-4">Istruzioni per la cura</h3>
              <ul className="space-y-2">
                {product.details.care?.map((care, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                    <span>{care}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Prodotti correlati */}
      {relatedProducts.length > 0 && (
        <div className="mt-20">
          <Separator className="mb-10" />
          <h2 className="text-2xl font-bold mb-8">Prodotti correlati</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
