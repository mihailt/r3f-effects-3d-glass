"use client"
import React, { useRef, useState, useTransition } from "react";
import { useControls} from "leva";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, } from "@react-three/drei";
import { Env } from "./Env";
import * as THREE from 'three'; // Ensure THREE is imported
import { useSpring } from '@react-spring/three'
import { Box } from "./Box";

export const R3FCanvas = () => {  
  const [enableZoom, setEnableZoom] = useState(true);  
  const [enablePan, setEnablePan] = useState(false);  
  const [inTransition, startTransition] = useTransition();  

  const { blur } = useControls({
    zoom: {
      label: "Enable Zoom",
      value: enableZoom,
      onChange: (value: boolean) => startTransition(() => setEnableZoom(value)),
    },
    pan: {
    label: "Enable Pan",
      value: enablePan,
      onChange: (value: boolean) => startTransition(() => setEnablePan(value)),
    },
    blur: { label: "Env. blur", value: 0.65, min: 0, max: 1 },
  });

  return (
      <Canvas
        className="absolute inset-0"
        shadows
        gl={{ preserveDrawingBuffer: true }}
        camera={{ position: [0, 0, 4.5], fov: 50 }}
      >
        <Box/>
        <ambientLight intensity={0.2} />
        <Env />
        <OrbitControls
          enableZoom={enableZoom}
          enablePan={enablePan}
          minPolarAngle={Math.PI / 2.1}
          maxPolarAngle={Math.PI / 2.1}
        />
      </Canvas>
  );
}
