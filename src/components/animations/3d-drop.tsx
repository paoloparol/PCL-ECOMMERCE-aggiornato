"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, PresentationControls, Environment, ContactShadows, OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";

// Dill Green Pantone #4E6813 e varianti precise calcolate
const PANTONE_DILL_GREEN = "#4E6813"; // Colore base Pantone
const DILL_GREEN_VARIANTS = [
  "#4E6813", // Base Pantone Dill Green
  "#3E5210", // Più scuro (-20% luminosità)
  "#5E7E16", // Più chiaro (+20% luminosità)
  "#426013", // Variante con meno saturazione
  "#5A7413", // Variante con più saturazione
];

// Componente che renderizza una goccia 3D
function Drop({ color = PANTONE_DILL_GREEN, position = [0, 0, 0], scale = 1, rotation = [0, 0, 0], spin = false }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Animazione di rotazione continua se spin è true
  useFrame((state, delta) => {
    if (spin && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  // Effetto hover che aumenta leggermente la dimensione
  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={hovered ? scale * 1.1 : scale}
      rotation={rotation}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
    </mesh>
  );
}

function DropScene({ color = PANTONE_DILL_GREEN, interactive = true, autoRotate = true, shadow = true, showEnvironment = true, size = "md" }) {
  // Determina la dimensione del canvas in base all'opzione size
  const getDimensions = () => {
    switch (size) {
      case "sm": return { height: 150, width: 150 };
      case "lg": return { height: 400, width: 400 };
      case "xl": return { height: 600, width: 600 };
      case "md":
      default: return { height: 250, width: 250 };
    }
  };

  const { height, width } = getDimensions();

  return (
    <div style={{ height, width }}>
      <Canvas
        camera={{ position: [0, 2, 5], fov: 50 }}
        shadows
      >
        {interactive ? (
          <PresentationControls
            global
            rotation={[0.13, 0.1, 0]}
            polar={[-0.4, 0.2]}
            azimuth={[-0.4, 0.4]}
            config={{ mass: 2, tension: 400 }}
            snap={{ mass: 2, tension: 400 }}
          >
            <Drop color={color} spin={autoRotate} position={[0, 0.5, 0]} />
          </PresentationControls>
        ) : (
          <Drop color={color} spin={autoRotate} position={[0, 0.5, 0]} />
        )}

        {shadow && (
          <ContactShadows
            opacity={0.6}
            scale={5}
            blur={2.5}
            position={[0, -0.5, 0]}
          />
        )}

        <ambientLight intensity={0.5} />
        <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-5, -5, -5]} intensity={1} />

        {showEnvironment && <Environment preset="city" />}

        {interactive && <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 2} />}
      </Canvas>
    </div>
  );
}

// Componente per creare un gruppo di gocce (utile per visualizzazioni multiple)
export function DropsGroup({ colors = DILL_GREEN_VARIANTS, size = "lg" }) {
  return (
    <div style={{ position: "relative", height: size === "lg" ? 400 : 250, width: "100%" }}>
      <Canvas camera={{ position: [0, 3, 10], fov: 40 }} shadows>
        <ambientLight intensity={0.5} />
        <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} intensity={1} castShadow />

        <Drop color={colors[0]} position={[-3, 0.5, 0]} scale={1.2} spin />
        <Drop color={colors[1]} position={[-1, 0.5, 1]} scale={0.9} spin />
        <Drop color={colors[2]} position={[1, 0.5, -1]} scale={1.1} spin />
        <Drop color={colors[3]} position={[3, 0.5, 0]} scale={1} spin />

        <ContactShadows opacity={0.5} scale={10} blur={2} position={[0, -0.5, 0]} />
        <Environment preset="city" />
        <OrbitControls enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}

// Componente principale esportato
export function ThreeDDrop({ color = PANTONE_DILL_GREEN, interactive = true, autoRotate = true, shadow = true, showEnvironment = true, size = "md" }) {
  return (
    <DropScene
      color={color}
      interactive={interactive}
      autoRotate={autoRotate}
      shadow={shadow}
      showEnvironment={showEnvironment}
      size={size}
    />
  );
}
