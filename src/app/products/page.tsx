"use client";

import { useState, useMemo } from "react";
import { ProductCard } from "@/components/product/product-card";
import { products } from "@/lib/db/products";
import { DropsShowcase } from "@/components/animations/drops-showcase";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");

  // Ottieni categorie uniche dai prodotti
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    return [
      { id: "all", name: "Tutti i prodotti" },
      ...uniqueCategories.map(cat => ({ id: cat.toLowerCase(), name: cat }))
    ];
  }, []);

  // Filtra e ordina prodotti
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filtra per categoria
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === selectedCategory
      );
    }

    // Filtra per prezzo
    if (priceRange !== "all") {
      filtered = filtered.filter(product => {
        switch (priceRange) {
          case "0-25": return product.price <= 25;
          case "25-50": return product.price > 25 && product.price <= 50;
          case "50-100": return product.price > 50 && product.price <= 100;
          case "100+": return product.price > 100;
          default: return true;
        }
      });
    }

    // Ordina
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-asc": return a.price - b.price;
        case "price-desc": return b.price - a.price;
        case "name-asc": return a.name.localeCompare(b.name);
        case "name-desc": return b.name.localeCompare(a.name);
        case "newest": return a.isNew ? -1 : 1;
        default: return 0;
      }
    });

    return filtered;
  }, [selectedCategory, priceRange, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero section */}
      <section className="bg-background py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            La Nostra Collezione
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Scopri tutte le ceramiche artigianali PCL con le iconiche gocce tridimensionali in rilievo
          </p>
        </div>
      </section>

      {/* Showcase gocce */}
      <section className="py-12 bg-muted/30">
        <DropsShowcase />
      </section>

      {/* Prodotti */}
      <section className="py-16">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Sidebar filtri */}
            <div className="lg:w-1/4">
              <div className="sticky top-24 space-y-6">

                {/* Filtro categorie */}
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="font-semibold text-lg mb-4">Categorie</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`block w-full text-left py-2 px-3 rounded transition-colors ${
                          selectedCategory === category.id
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filtro prezzo */}
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="font-semibold text-lg mb-4">Prezzo</h3>
                  <div className="space-y-2">
                    {[
                      { id: "all", label: "Tutti i prezzi" },
                      { id: "0-25", label: "€0 - €25" },
                      { id: "25-50", label: "€25 - €50" },
                      { id: "50-100", label: "€50 - €100" },
                      { id: "100+", label: "€100+" }
                    ].map(range => (
                      <button
                        key={range.id}
                        onClick={() => setPriceRange(range.id)}
                        className={`block w-full text-left py-2 px-3 rounded transition-colors ${
                          priceRange === range.id
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Griglia prodotti */}
            <div className="lg:w-3/4">

              {/* Header con conteggio e ordinamento */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <p className="text-muted-foreground">
                  {filteredProducts.length} prodotti trovati
                </p>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-input rounded-md px-3 py-2 bg-background text-foreground"
                >
                  <option value="name">Ordina per nome</option>
                  <option value="price-asc">Prezzo: dal più basso</option>
                  <option value="price-desc">Prezzo: dal più alto</option>
                  <option value="newest">Più recenti</option>
                </select>
              </div>

              {/* Griglia prodotti */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map((product) => (
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
                  <h3 className="text-2xl font-semibold mb-4">
                    Nessun prodotto trovato
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Prova a cambiare i filtri per vedere più prodotti.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      setPriceRange("all");
                    }}
                    className="btn-humanrace"
                  >
                    Rimuovi filtri
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
