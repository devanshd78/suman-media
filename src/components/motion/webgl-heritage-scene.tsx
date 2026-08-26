"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type WebGLHeritageSceneProps = {
  activeSlide: number;
  reducedMotion?: boolean;
  className?: string;
};

type GemConfig = {
  position: [number, number, number];
  scale: number;
  rotation: [number, number, number];
  color: string;
  opacity: number;
  speed: number;
};

const GOLD = "#E2BB5F";
const MAROON = "#6B1F2E";
const PEACOCK = "#0F4C4C";
const COPPER = "#A96B43";

function FloatingGem({
  config,
  index,
  reducedMotion,
}: {
  config: GemConfig;
  index: number;
  reducedMotion: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (reducedMotion || !meshRef.current) return;

    const mesh = meshRef.current;
    const t = state.clock.elapsedTime;

    mesh.rotation.x += delta * 0.06 * config.speed;
    mesh.rotation.y += delta * 0.085 * config.speed;
    mesh.position.y =
      config.position[1] + Math.sin(t * (0.32 + index * 0.018) + index) * 0.13;
  });

  return (
    <mesh
      ref={meshRef}
      position={config.position}
      rotation={config.rotation}
      scale={config.scale}
    >
      <octahedronGeometry args={[1, 0]} />
      <meshPhysicalMaterial
        color={config.color}
        metalness={0.78}
        roughness={0.23}
        clearcoat={1}
        clearcoatRoughness={0.18}
        transparent
        opacity={config.opacity}
        emissive={config.color}
        emissiveIntensity={0.035}
      />
    </mesh>
  );
}

function HeritageField({
  activeSlide,
  reducedMotion,
}: {
  activeSlide: number;
  reducedMotion: boolean;
}) {
  const rootRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);

  const gems = useMemo<GemConfig[]>(
    () => [
      {
        position: [-3.4, 1.85, -1.4],
        scale: 0.72,
        rotation: [0.6, 0.18, 0.78],
        color: GOLD,
        opacity: 0.34,
        speed: 0.8,
      },
      {
        position: [3.75, 1.45, -2.35],
        scale: 1.08,
        rotation: [0.78, -0.28, 0.78],
        color: PEACOCK,
        opacity: 0.23,
        speed: 0.62,
      },
      {
        position: [2.8, -1.25, -0.8],
        scale: 0.42,
        rotation: [0.55, 0.35, 0.78],
        color: COPPER,
        opacity: 0.38,
        speed: 1.02,
      },
      {
        position: [-2.6, -1.35, -2.4],
        scale: 0.92,
        rotation: [0.82, 0.18, 0.78],
        color: MAROON,
        opacity: 0.22,
        speed: 0.72,
      },
      {
        position: [0.7, 2.25, -3.1],
        scale: 0.52,
        rotation: [0.64, -0.4, 0.78],
        color: GOLD,
        opacity: 0.2,
        speed: 0.9,
      },
      {
        position: [-0.2, -1.95, -1.9],
        scale: 0.34,
        rotation: [0.4, 0.42, 0.78],
        color: PEACOCK,
        opacity: 0.28,
        speed: 1.12,
      },
    ],
    [],
  );

  useEffect(() => {
    const root = rootRef.current;
    const inner = innerRef.current;
    if (!root || !inner) return;

    if (reducedMotion) {
      root.rotation.set(0.05, activeSlide * 0.08, 0);
      root.position.set(0, 0, 0);
      return;
    }

    const direction = activeSlide % 2 === 0 ? 1 : -1;
    const ctx = gsap.context(() => {
      gsap.to(root.rotation, {
        x: 0.04 + (activeSlide % 3) * 0.025,
        y: direction * (0.12 + activeSlide * 0.035),
        duration: 1.45,
        ease: "power3.out",
        overwrite: true,
      });

      gsap.to(root.position, {
        x: direction * 0.18,
        y: activeSlide % 3 === 1 ? -0.08 : 0.06,
        duration: 1.45,
        ease: "power3.out",
        overwrite: true,
      });

      gsap.fromTo(
        inner.scale,
        { x: 0.94, y: 0.94, z: 0.94 },
        {
          x: 1,
          y: 1,
          z: 1,
          duration: 1.2,
          ease: "expo.out",
          overwrite: true,
        },
      );
    });

    return () => ctx.revert();
  }, [activeSlide, reducedMotion]);

  useFrame((state) => {
    if (reducedMotion || !innerRef.current) return;

    const t = state.clock.elapsedTime;
    innerRef.current.rotation.z = Math.sin(t * 0.12) * 0.025;
    innerRef.current.position.y = Math.sin(t * 0.22) * 0.035;
  });

  return (
    <group ref={rootRef}>
      <group ref={innerRef}>
        {gems.map((config, index) => (
          <FloatingGem
            key={`${config.position.join("-")}-${index}`}
            config={config}
            index={index}
            reducedMotion={reducedMotion}
          />
        ))}

        {/* Abstract Paithani-style orbit rings. */}
        <mesh position={[3.15, 0.1, -3.4]} rotation={[1.08, 0.15, 0.3]}>
          <torusGeometry args={[1.58, 0.008, 8, 96]} />
          <meshBasicMaterial color={GOLD} transparent opacity={0.2} />
        </mesh>

        <mesh position={[-3.45, -0.15, -3.8]} rotation={[1.2, -0.2, -0.35]}>
          <torusGeometry args={[1.06, 0.006, 8, 96]} />
          <meshBasicMaterial color={PEACOCK} transparent opacity={0.18} />
        </mesh>

        {/* Fort-step inspired floating planes. */}
        {[0, 1, 2, 3].map((step) => (
          <mesh
            key={step}
            position={[1.95 + step * 0.34, -2.1 + step * 0.2, -3.35 - step * 0.12]}
            rotation={[1.25, 0, -0.14]}
          >
            <boxGeometry args={[0.65, 0.025, 0.16]} />
            <meshStandardMaterial
              color={step % 2 === 0 ? GOLD : COPPER}
              metalness={0.72}
              roughness={0.28}
              transparent
              opacity={0.28}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export function WebGLHeritageScene({
  activeSlide,
  reducedMotion = false,
  className = "",
}: WebGLHeritageSceneProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 8.4], fov: 42, near: 0.1, far: 40 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        frameloop={reducedMotion ? "demand" : "always"}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.46} />
        <directionalLight position={[4, 5, 6]} intensity={2.1} color="#FFF0C9" />
        <directionalLight position={[-5, -2, 3]} intensity={0.65} color="#7AB8AF" />
        <pointLight position={[0, 1.5, 2.5]} intensity={8} distance={10} color={GOLD} />

        <HeritageField
          activeSlide={activeSlide}
          reducedMotion={reducedMotion}
        />
      </Canvas>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,transparent_0%,rgba(0,0,0,0.02)_45%,rgba(0,0,0,0.28)_100%)]" />
    </div>
  );
}
