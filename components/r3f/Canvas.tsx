"use client"
import React, { useEffect, useState, Suspense } from "react"; // Added useEffect and useState

import { Canvas } from "@react-three/fiber";
import { OrbitControls, } from "@react-three/drei";
import { Env } from "./Env";
import { Model } from "./Model";
import { useGLTF } from '@react-three/drei'

import state from "@/lib/store";
import { useSnapshot } from "valtio";

export const R3FCanvas = () => {
  const snap = useSnapshot(state);
  const [preloadFinished, setPreloadFinished] = useState(false); // Added state to track loading

  useEffect(() => {
    const preloadModels = async () => {
      await Promise.all(snap.preload.map((path) => useGLTF.preload(path)));
      setPreloadFinished(true); // Set loaded state to true after preloading
    };
    preloadModels();
  }, [snap.preload]);

  const LoadingIndicator = <div style={{ backgroundColor: snap.backgroundColor }} className="flex text-red-50 justify-center items-center min-h-full">Loading...</div>

  return (
    <>
      <Suspense fallback={preloadFinished && LoadingIndicator}>
        <Canvas
          style={{ backgroundColor: snap.backgroundColor }}
          className="absolute inset-0"
          shadows
          gl={{ preserveDrawingBuffer: true }}
          camera={{ position: [0, 0, 4.5], fov: 50 }}
        >
          <group name="contentGroup">
            <Model name={snap.model} />
          </group>
          <directionalLight intensity={snap.lightIntensity} position={[0, 3, 2]} />
          <Env />
          <OrbitControls
            enableZoom={snap.enableZoom}
            enablePan={snap.enablePan}
            enableRotate={snap.enableRotate}
            minPolarAngle={Math.PI / 2.1}
            maxPolarAngle={Math.PI / 2.1}
          />
        </Canvas>
      </Suspense>
    </>
  );
}