"use client"
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, } from "@react-three/drei";
import { Env } from "./Env";
import { Model } from "./Model";
import { useGLTF} from '@react-three/drei'

import state from "@/lib/store";
import { useSnapshot } from "valtio";

export const R3FCanvas = () => {  
  const snap = useSnapshot(state);    

  snap.preload.map((path) => useGLTF.preload(path))

  return (
      <Canvas
        style={{backgroundColor: snap.backgroundColor}}
        className="absolute inset-0"
        shadows
        gl={{ preserveDrawingBuffer: true }}
        camera={{ position: [0, 0, 4.5], fov: 50 }}
      >
        <Model name={snap.model}/>
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