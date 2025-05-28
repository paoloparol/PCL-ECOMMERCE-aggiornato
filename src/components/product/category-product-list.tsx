"use client";

import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/lib/db/products";

interface Props {
  products: Product[];
}

export default function CategoryProductList({ products }: Props) {
  if (!products.length) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold mb-4">
          Nessun prodotto trovato
        </h2>
        <p className="text-muted-foreground mb-8">
          Non ci sono prodotti disponibili in questa categoria al momento.
        </p>
        <a href="/products" className="btn-humanrace">
          Vedi tutti i prodotti
        </a>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          size="md"
          withAnimation={true}
        />
      ))}
    </div>
  );
}
