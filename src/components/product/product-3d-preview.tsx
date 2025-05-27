"use client";

import { useState, useEffect } from "react";
import { ThreeDDrop } from "@/components/animations/3d-drop";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import type { ProductColor } from "@/types";

const colorMap: Record<ProductColor, string> = {
  "bianco": "#ffffff",
  "verde": "#4E6813", // Pantone Dill Green
  "blu": "#3E5210", // Dill Green più scuro
  "arancione": "#5E7E16", // Dill Green più chiaro
  "giallo": "#5A7413", // Dill Green saturo
  "rosa": "#426013", // Dill Green con meno saturazione
  "multicolore": "#4E6813" // Default Pantone Dill Green
};

interface Product3DPreviewProps {
  color: ProductColor;
}

export function Product3DPreview({ color }: Product3DPreviewProps) {
  const [mounted, setMounted] = useState(false);
  const [show3D, setShow3D] = useState(false);

  // Solo rendering lato client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (!show3D) {
    return (
      <div className="flex flex-col items-center justify-center py-8 px-4 border rounded-md bg-muted/20">
        <p className="text-center mb-4">Visualizza il prodotto in 3D</p>
        <Button
          variant="outline"
          onClick={() => setShow3D(true)}
          className="flex items-center gap-2"
        >
          <Eye size={16} />
          <span>Mostra anteprima 3D</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="p-4 bg-muted/20 flex justify-between items-center">
        <h3 className="font-medium">Anteprima 3D</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShow3D(false)}
          className="flex items-center gap-1"
        >
          <EyeOff size={14} />
          <span className="text-xs">Nascondi</span>
        </Button>
      </div>
      <div className="p-8 flex justify-center items-center bg-gradient-to-b from-background to-muted/10">
        <ThreeDDrop
          color={colorMap[color] || "#4E6813"}
          size="md"
          interactive={true}
          autoRotate={true}
          shadow={true}
        />
      </div>
      <div className="p-4 text-center text-sm text-muted-foreground bg-muted/10">
        <p>Trascina per ruotare • Pizzica per zoom</p>
      </div>
    </div>
  );
}
