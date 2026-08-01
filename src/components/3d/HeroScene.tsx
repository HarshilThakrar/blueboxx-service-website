'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

function ParticleNetwork() {
  const points = useRef<THREE.Points>(null);
  
  const particleCount = 2000;
  
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    
    const color = new THREE.Color();
    
    for (let i = 0; i < particleCount; i++) {
      // Sphere distribution
      const r = 15 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      
      // Premium colors: blues and purples
      const isPrimary = Math.random() > 0.5;
      if (isPrimary) {
        color.setHSL(0.65, 0.8, Math.random() * 0.5 + 0.2); // Blue
      } else {
        color.setHSL(0.75, 0.8, Math.random() * 0.5 + 0.2); // Purple
      }
      
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    
    return [pos, col];
  }, [particleCount]);

  useFrame((state) => {
    if (!points.current) return;
    
    // Slow rotation
    points.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    points.current.rotation.x = state.clock.getElapsedTime() * 0.02;
    
    // Mouse parallax
    const mouseX = (state.pointer.x * Math.PI) / 10;
    const mouseY = (state.pointer.y * Math.PI) / 10;
    
    points.current.rotation.y += (mouseX - points.current.rotation.y) * 0.05;
    points.current.rotation.x += (-mouseY - points.current.rotation.x) * 0.05;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
      <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
        <fog attach="fog" args={['#05051a', 10, 30]} />
        <ambientLight intensity={0.5} />
        <ParticleNetwork />
        <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
}
