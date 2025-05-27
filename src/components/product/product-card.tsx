"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/db/products";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThreeDDrop } from "@/components/animations/3d-drop";
import { useCartStore } from "@/lib/store/cart";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  size?: "sm" | "md" | "lg";
  withAnimation?: boolean;
}

export function ProductCard({
  product,
  size = "md",
  withAnimation = true,
}: ProductCardProps) {
  const { addItem } = useCartStore();
  const [isHovered, setIsHovered] = useState(false);

  // Determina le dimensioni della card in base al parametro size
  const cardSize = {
    sm: "max-w-[250px]",
    md: "max-w-[320px]",
    lg: "max-w-[380px]",
  }[size];

  const handleAddToCart = () => {
    addItem({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0],
      color: product.colors[0]?.name || "",
      size: product.sizes[0]?.value || "",
    });
  };

  return (
    <Card
      className={`overflow-hidden hover:shadow-lg transition-shadow ${cardSize}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="p-0">
        <AspectRatio ratio={1}>
          <div className="relative w-full h-full image-hover-zoom">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300"
              sizes={size === "lg" ? "400px" : size === "md" ? "320px" : "250px"}
            />
            {product.isNew && (
              <Badge variant="secondary" className="absolute top-2 right-2">
                Nuovo
              </Badge>
            )}
            {product.isBestseller && (
              <Badge variant="default" className="absolute top-2 left-2">
                Bestseller
              </Badge>
            )}
          </div>
        </AspectRatio>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="text-sm text-muted-foreground mb-1">{product.category}</div>
        <h3 className="font-medium text-lg">{product.name}</h3>
        <div className="flex justify-between items-center mt-2">
          <div className="font-bold">€{product.price.toFixed(2)}</div>
          {withAnimation && isHovered && (
            <div className="scale-in-center">
              <ThreeDDrop
                color={product.colors[0]?.color || "#4E6813"}
                size="sm"
                interactive={false}
                autoRotate={true}
                showEnvironment={false}
              />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          asChild
          className="w-full"
        >
          <Link href={`/products/${product.slug}`}>
            Dettagli
          </Link>
        </Button>
        <Button
          onClick={handleAddToCart}
          className="w-full"
        >
          Acquista
        </Button>
      </CardFooter>
    </Card>
  );
}
