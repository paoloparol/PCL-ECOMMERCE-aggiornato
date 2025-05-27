"use client";

import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product/product-card";
import { products } from "@/lib/db/products";

// Mappa delle categorie
const categoryMap: Record<string, string> = {
  "tazze": "Tazze",
  "mugs": "Mugs",
  "shots": "Shots",
  "piatti": "Piatti",
  "borse": "Borse",
  "accessori": "Accessori"
};

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;
  const categoryName = categoryMap[slug];

  if (!categoryName) {
    notFound();
  }

  // Filtra prodotti per categoria
  const categoryProducts = products.filter(
    product => product.category.toLowerCase() === categoryName.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-12">
        {/* Header categoria */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            {categoryName}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Scopri la nostra collezione di {categoryName.toLowerCase()} con gocce tridimensionali uniche
          </p>
        </div>

        {/* Prodotti */}
        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {categoryProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                size="md"
                withAnimation={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-4">
              Nessun prodotto trovato
            </h2>
            <p className="text-muted-foreground mb-8">
              Non ci sono prodotti disponibili in questa categoria al momento.
            </p>
            <a
              href="/products"
              className="btn-humanrace"
            >
              Vedi tutti i prodotti
            </a>
          </div>
        )}

        {/* Breadcrumb */}
        <div className="mt-16 pt-8 border-t">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <a href="/" className="hover:text-primary">Home</a>
            <span>/</span>
            <a href="/products" className="hover:text-primary">Shop</a>
            <span>/</span>
            <span className="text-foreground">{categoryName}</span>
          </nav>
        </div>
      </div>
    </div>
  );
}

// Generate static params per le categorie
export function generateStaticParams() {
  return Object.keys(categoryMap).map((slug) => ({
    slug: slug,
  }));
}
