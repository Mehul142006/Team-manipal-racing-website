"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

type MouseRef = React.MutableRefObject<{ x: number; y: number }>;

function Wheel({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.42, 0.42, 0.28, 24]} />
        <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.22, 0.22, 0.3, 16]} />
        <meshStandardMaterial
          color="#e10600"
          metalness={0.9}
          roughness={0.2}
          emissive="#e10600"
          emissiveIntensity={0.15}
        />
      </mesh>
    </group>
  );
}

function RollCage() {
  const material = (
    <meshStandardMaterial
      color="#cccccc"
      metalness={0.95}
      roughness={0.15}
      envMapIntensity={1.5}
    />
  );

  return (
    <group>
      {/* Main hoop */}
      <mesh position={[0, 0.85, 0]}>
        <torusGeometry args={[0.75, 0.025, 8, 32, Math.PI]} />
        {material}
      </mesh>
      {/* Front hoop */}
      <mesh position={[0.55, 0.7, 0]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.04, 0.9, 0.04]} />
        {material}
      </mesh>
      <mesh position={[-0.55, 0.7, 0]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.04, 0.9, 0.04]} />
        {material}
      </mesh>
      {/* Side bars */}
      {[-0.55, 0.55].map((x) => (
        <mesh key={x} position={[x, 0.45, 0]}>
          <boxGeometry args={[0.035, 0.04, 1.4]} />
          {material}
        </mesh>
      ))}
      {/* Longitudinal bars */}
      <mesh position={[0, 0.45, 0.65]}>
        <boxGeometry args={[1.1, 0.035, 0.035]} />
        {material}
      </mesh>
      <mesh position={[0, 0.45, -0.65]}>
        <boxGeometry args={[1.1, 0.035, 0.035]} />
        {material}
      </mesh>
      {/* Top bar */}
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
    groupRef.current.rotation.y += delta * 0.25;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouseRef.current.y * 0.12,
      0.04
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      -mouseRef.current.x * 0.06,
      0.04
    );
  });

  return (
    <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef} scale={1.1}>
        <RollCage />

        {/* Chassis */}
        <mesh position={[0, 0.25, 0]}>
          <boxGeometry args={[1.0, 0.12, 1.5]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.4} />
        </mesh>

        {/* Body panels */}
        <mesh position={[0, 0.38, 0.3]}>
          <boxGeometry args={[0.9, 0.08, 0.6]} />
          <meshStandardMaterial
            color="#e10600"
            metalness={0.6}
            roughness={0.3}
            emissive="#e10600"
            emissiveIntensity={0.08}
          />
        </mesh>

        {/* Battery pack */}
        <mesh position={[0, 0.32, -0.15]}>
          <boxGeometry args={[0.7, 0.1, 0.5]} />
          <meshStandardMaterial color="#222222" metalness={0.5} roughness={0.5} />
        </mesh>

        {/* Motor housing */}
        <mesh position={[0, 0.28, -0.55]}>
          <cylinderGeometry args={[0.15, 0.15, 0.3, 16]} />
          <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Front suspension arms */}
        {[-0.45, 0.45].map((x) => (
          <mesh key={`fa-${x}`} position={[x, 0.18, 0.55]} rotation={[0.3, 0, 0]}>
            <boxGeometry args={[0.04, 0.04, 0.5]} />
            <meshStandardMaterial color="#888888" metalness={0.9} roughness={0.2} />
          </mesh>
        ))}

        {/* Wheels */}
        <Wheel position={[-0.65, 0.42, 0.55]} />
        <Wheel position={[0.65, 0.42, 0.55]} />
        <Wheel position={[-0.65, 0.42, -0.55]} />
        <Wheel position={[0.65, 0.42, -0.55]} />

        {/* Headlights */}
        {[-0.35, 0.35].map((x) => (
          <mesh key={`hl-${x}`} position={[x, 0.35, 0.78]}>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={2}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <spotLight
        position={[5, 8, 5]}
        angle={0.35}
        penumbra={1}
        intensity={80}
        color="#ffffff"
        castShadow
      />
      <spotLight
        position={[-5, 4, -3]}
        angle={0.4}
        penumbra={1}
        intensity={40}
        color="#e10600"
      />
      <pointLight position={[0, 2, 3]} intensity={20} color="#ff3333" />
      <pointLight position={[0, -2, -3]} intensity={8} color="#4444ff" />
    </>
  );
}

export function CarScene({ mouseRef }: { mouseRef: MouseRef }) {
  return (
    <>
      <SceneLighting />
      <EbajaCar mouseRef={mouseRef} />
      <Sparkles
        count={120}
        scale={8}
        size={2}
        speed={0.3}
        color="#e10600"
        opacity={0.6}
      />
      <Sparkles
        count={60}
        scale={6}
        size={1.5}
        speed={0.2}
        color="#ffffff"
        opacity={0.3}
      />
    </>
  );
}
