"use client";

import { useState, useEffect } from "react";
import { ThreeDDrop, DropsGroup } from "./3d-drop";
import { Card, CardContent } from "@/components/ui/card";

export function DropsShowcase() {
  const [mounted, setMounted] = useState(false);
  const [activeColor, setActiveColor] = useState("#4E6813");

  // Solo rendering lato client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const colors = [
    { name: "Dill Green", value: "#4E6813" },
    { name: "Verde Scuro", value: "#3E5210" },
    { name: "Verde Chiaro", value: "#5E7E16" },
    { name: "Verde Saturo", value: "#5A7413" }
  ];

  return (
    <div className="py-20 px-6 bg-muted/50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Le iconiche gocce tridimensionali</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Esplora la nostra collezione di ceramiche con le caratteristiche gocce tridimensionali,
            il tratto distintivo di PCL. Ogni pezzo è unico, realizzato e dipinto a mano.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="flex justify-center">
            <DropsGroup
              colors={colors.map(c => c.value)}
              size="lg"
            />
          </div>

          <div className="space-y-8">
            <div className="text-lg">
              <p className="mb-4">
                Le gocce tridimensionali sono l'elemento chiave del nostro design.
                Ogni goccia è plasmata a mano con cura, creando texture uniche che rendono ogni pezzo irripetibile.
              </p>
              <p>
                Scegli tra diverse colorazioni vibranti o l'eleganza del bianco, per arredare la tua casa con
                oggetti che combinano funzionalità e carattere.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-medium">Scegli un colore</h3>
              <div className="flex flex-wrap gap-3">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    className={`flex flex-col items-center p-2 rounded-md transition-all ${activeColor === color.value ? 'bg-background shadow-md' : 'hover:bg-background/50'}`}
                    onClick={() => setActiveColor(color.value)}
                  >
                    <div
                      className="w-8 h-8 rounded-full mb-2"
                      style={{ backgroundColor: color.value }}
                    />
                    <span className="text-sm">{color.name}</span>
                  </button>
                ))}
              </div>

              <Card className="mt-6 overflow-hidden">
                <CardContent className="p-0 flex items-center justify-center py-8">
                  <ThreeDDrop
                    color={activeColor}
                    size="md"
                    interactive={true}
                    autoRotate={true}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
