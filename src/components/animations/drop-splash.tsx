"use client";

import { Canvas } from "@react-three/fiber";

// Pantone Dill Green
const PANTONE_DILL_GREEN = "#4E6813";

// Componente goccia statica
function StaticDrop({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <mesh position={position} scale={scale}>
      <sphereGeometry args={[0.3, 12, 12]} />
      <meshStandardMaterial
        color={PANTONE_DILL_GREEN}
        roughness={0.3}
        metalness={0.2}
      />
    </mesh>
  );
}

// Pioggia di gocce statiche
function StaticDropsRain() {
  // Posizioni casuali per le gocce (pioggia)
  const dropPositions: { pos: [number, number, number]; scale: number }[] = [
    { pos: [0, 2, 0], scale: 1.2 },          // Centro grande
    { pos: [-1.5, 1, 0.5], scale: 0.8 },    // Sinistra
    { pos: [1.8, 0.5, -0.3], scale: 1.0 },  // Destra
    { pos: [-0.8, -0.5, 1], scale: 0.9 },   // Sinistra basso
    { pos: [0.5, -1.2, 0.8], scale: 0.7 },  // Destra basso
    { pos: [-2, 2.5, -0.8], scale: 0.6 },   // Lontano sinistra
    { pos: [2.2, 1.8, 1.2], scale: 0.9 },   // Lontano destra
    { pos: [0.2, 3, -1.5], scale: 0.5 },    // Molto alto
    { pos: [-1, 0, -1.8], scale: 0.8 },     // Profondità
    { pos: [1.5, -0.8, 2], scale: 0.6 },    // Vicino
    { pos: [-0.5, 1.5, 1.5], scale: 0.7 },  // Medio
    { pos: [0.8, 0.2, -0.9], scale: 0.9 },  // Centro-destra
  ];

  return (
    <>
      {dropPositions.map((drop, index) => (
        <StaticDrop
          key={index}
          position={drop.pos}
          scale={drop.scale}
        />
      ))}
    </>
  );
}

export function DropSplashAnimation() {
  return (
    <div className="w-full h-[400px] relative rounded-lg overflow-hidden">

      {/* Sfondo elegante */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100" />

      {/* Canvas 3D statico */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 45 }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} />
          <directionalLight position={[-5, 5, 5]} intensity={0.6} />

          <StaticDropsRain />
        </Canvas>
      </div>

      {/* Etichetta */}
      <div className="absolute bottom-4 left-4 text-dill-green-700 text-sm font-medium">
        💧 Composizione Statica 3D
      </div>
    </div>
  );
}
