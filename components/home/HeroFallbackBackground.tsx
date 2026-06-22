"use client";

import { Suspense, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";

const CarScene = dynamic(
  () => import("@/components/three/CarScene").then((m) => m.CarScene),
  { ssr: false }
);

type HeroFallbackBackgroundProps = {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
};

export function HeroFallbackBackground({ mouseRef }: HeroFallbackBackgroundProps) {
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: -((e.clientY - rect.top) / rect.height) * 2 + 1,
      };
    },
    [mouseRef]
  );

  return (
    <div className="absolute inset-0 z-0" onMouseMove={handleMouseMove}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(6,16,24,0.1)_0%,_transparent_60%)]" />
      <div className="pointer-events-none absolute left-1/2 top-[42%] z-[1] h-[min(52vw,440px)] w-[min(52vw,440px)] -translate-x-1/2 -translate-y-1/2 rounded-full hero-vehicle-glow" />

      <Canvas camera={{ position: [0, 1.5, 5.5], fov: 42 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }} className="h-full w-full">
        <Suspense fallback={null}>
            <color attach="background" args={["#040608"]} />
            <fog attach="fog" args={["#040608", 6, 16]} />
          <Stars radius={90} depth={60} count={2500} factor={2.5} fade speed={0.4} />
          <CarScene mouseRef={mouseRef} />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}
