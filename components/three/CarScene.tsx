"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { TMRE_COLORS } from "@/lib/theme";

const { gold: GOLD, orange: ORANGE, navy: NAVY, black: BLACK, steel: STEEL } = TMRE_COLORS;

type MouseRef = React.MutableRefObject<{ x: number; y: number }>;

function Wheel({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.42, 0.42, 0.28, 24]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.85} roughness={0.25} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.22, 0.22, 0.3, 16]} />
        <meshStandardMaterial
          color={GOLD}
          metalness={0.95}
          roughness={0.15}
          emissive={GOLD}
          emissiveIntensity={0.14}
        />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.24, 0.24, 0.26, 16]} />
        <meshStandardMaterial
          color={ORANGE}
          metalness={0.9}
          roughness={0.2}
          emissive={ORANGE}
          emissiveIntensity={0.08}
          transparent
          opacity={0.35}
        />
      </mesh>
    </group>
  );
}

function RollCage() {
  const material = (
    <meshStandardMaterial
      color="#b8c3d6"
      metalness={0.95}
      roughness={0.12}
      envMapIntensity={1.8}
    />
  );

  return (
    <group>
      <mesh position={[0, 0.85, 0]}>
        <torusGeometry args={[0.75, 0.025, 8, 32, Math.PI]} />
        {material}
      </mesh>
      <mesh position={[0.55, 0.7, 0]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.04, 0.9, 0.04]} />
        {material}
      </mesh>
      <mesh position={[-0.55, 0.7, 0]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.04, 0.9, 0.04]} />
        {material}
      </mesh>
      {[-0.55, 0.55].map((x) => (
        <mesh key={x} position={[x, 0.45, 0]}>
          <boxGeometry args={[0.035, 0.04, 1.4]} />
          {material}
        </mesh>
      ))}
      <mesh position={[0, 0.45, 0.65]}>
        <boxGeometry args={[1.1, 0.035, 0.035]} />
        {material}
      </mesh>
      <mesh position={[0, 0.45, -0.65]}>
        <boxGeometry args={[1.1, 0.035, 0.035]} />
        {material}
      </mesh>
      <mesh position={[0, 0.85, 0]}>
        <boxGeometry args={[1.1, 0.035, 0.035]} />
        {material}
      </mesh>
    </group>
  );
}

function EbajaCar({ mouseRef }: { mouseRef: MouseRef }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.2;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouseRef.current.y * 0.1,
      0.04
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      -mouseRef.current.x * 0.05,
      0.04
    );
  });

  return (
    <Float speed={1} rotationIntensity={0.08} floatIntensity={0.25}>
      <group ref={groupRef} scale={1.1}>
        <RollCage />
        <mesh position={[0, 0.25, 0]}>
          <boxGeometry args={[1.0, 0.12, 1.5]} />
          <meshStandardMaterial color={STEEL} metalness={0.75} roughness={0.35} />
        </mesh>
        <mesh position={[0, 0.38, 0.3]}>
          <boxGeometry args={[0.9, 0.08, 0.6]} />
          <meshStandardMaterial
            color={GOLD}
            metalness={0.7}
            roughness={0.25}
            emissive={GOLD}
            emissiveIntensity={0.08}
          />
        </mesh>
        <mesh position={[0, 0.36, 0.62]}>
          <boxGeometry args={[0.85, 0.04, 0.08]} />
          <meshStandardMaterial
            color={ORANGE}
            metalness={0.8}
            roughness={0.2}
            emissive={ORANGE}
            emissiveIntensity={0.35}
          />
        </mesh>
        <mesh position={[0, 0.32, -0.15]}>
          <boxGeometry args={[0.7, 0.1, 0.5]} />
          <meshStandardMaterial color={NAVY} metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.28, -0.55]}>
          <cylinderGeometry args={[0.15, 0.15, 0.3, 16]} />
          <meshStandardMaterial color={BLACK} metalness={0.85} roughness={0.2} />
        </mesh>
        {[-0.45, 0.45].map((x) => (
          <mesh key={`fa-${x}`} position={[x, 0.18, 0.55]} rotation={[0.3, 0, 0]}>
            <boxGeometry args={[0.04, 0.04, 0.5]} />
            <meshStandardMaterial color="#8899aa" metalness={0.9} roughness={0.15} />
          </mesh>
        ))}
        <Wheel position={[-0.65, 0.42, 0.55]} />
        <Wheel position={[0.65, 0.42, 0.55]} />
        <Wheel position={[-0.65, 0.42, -0.55]} />
        <Wheel position={[0.65, 0.42, -0.55]} />
        {[-0.35, 0.35].map((x) => (
          <mesh key={`hl-${x}`} position={[x, 0.35, 0.78]}>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive={ORANGE}
              emissiveIntensity={0.2}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

export function CarScene({ mouseRef }: { mouseRef: MouseRef }) {
  return (
    <>
      <ambientLight intensity={0.12} />
      <spotLight position={[5, 8, 5]} angle={0.35} penumbra={1} intensity={70} color="#ffffff" />
      <spotLight position={[-5, 4, -3]} angle={0.4} penumbra={1} intensity={35} color={GOLD} />
      <spotLight position={[3, 2, -4]} angle={0.5} penumbra={1} intensity={10} color={ORANGE} />
      <pointLight position={[0, 2, 3]} intensity={15} color={GOLD} />
      <pointLight position={[0.8, 1.5, 2.5]} intensity={4} color={ORANGE} />
      <pointLight position={[0, -2, -3]} intensity={6} color={NAVY} />
      <EbajaCar mouseRef={mouseRef} />
      <Sparkles count={45} scale={8} size={1.6} speed={0.25} color={GOLD} opacity={0.35} />
      <Sparkles count={28} scale={7} size={1.4} speed={0.22} color={ORANGE} opacity={0.22} />
      <Sparkles count={25} scale={6} size={1.1} speed={0.15} color="#ffffff" opacity={0.12} />
    </>
  );
}
