"use client"
import React, { useState, useTransition } from "react";
import { useControls} from "leva";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, } from "@react-three/drei";
import { Env } from "./Env";
import { Torus } from "./Torus";

import state from "@/lib/store";
import { useSnapshot } from "valtio";

export const R3FCanvas = () => {  
  const snap = useSnapshot(state);    

  return (
      <Canvas
        style={{backgroundColor: snap.backgroundColor}}
        className="absolute inset-0"
        shadows
        gl={{ preserveDrawingBuffer: true }}
        camera={{ position: [0, 0, 4.5], fov: 50 }}
      >
        <Torus/>
        <directionalLight intensity={snap.lightIntensity} position={[0, 3, 2]}/>
        <Env />
        <OrbitControls
          enableZoom={snap.enableZoom}
          enablePan={snap.enablePan}
          enableRotate={snap.enableRotate}
          minPolarAngle={Math.PI / 2.1}
          maxPolarAngle={Math.PI / 2.1}
        />
      </Canvas>
  );
}