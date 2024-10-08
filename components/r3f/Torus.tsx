"use client"

import React, { useRef, useState, useTransition } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Text, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'; // Ensure THREE is imported
import { useSpring, config } from "@react-spring/three";
import { useControls} from "leva";

import state from "@/lib/store";
import { useSnapshot } from "valtio";

export const Torus = () => {
  const name = 'Torus.glb';
  
  const snap = useSnapshot(state);    
  const { nodes, materials } = useGLTF(`./models/${name}`)
  const { viewport } = useThree();
  
  const geometryName = name.replace('.glb', '').charAt(0).toUpperCase() + name.slice(1).replace('.glb', '');
  // @ts-ignore
  const geometry = nodes[geometryName]?.geometry;  

  // This reference will give us direct access to the mesh
  const meshRef = useRef<THREE.Mesh>(null); // Ensure meshRef is typed correctly
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const [color, setColor] = useState(snap.color.default)
  const [scale, setSetScale] = useState(viewport.width / snap.viewportWidthFactor * (active ? snap.scale.active : snap.scale.default))
  // Subscribe this component to the render-loop, rotate the mesh every frame
  const tColor = new THREE.Color(color);
  // @ts-ignore
  materials.Default.color = tColor;

  useSpring({
    color: hovered ? snap.color.active : snap.color.default,
    scale: active ? snap.scale.active : snap.scale.default,
    config: config.wobbly,
    onChange: ({ value }) => {
      setSetScale(value.scale)
      setColor(value.color)
      tColor.set(value.color)
      // @ts-ignore
      materials.Default.color = tColor;
    },
  },[active, hovered, snap.scale.active, snap.scale.default, snap.color.active, snap.color.default]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 2;
    }
  })

  const [inTransition, startTransition] = useTransition();
  const textColor = new THREE.Color(snap.textColor);

  return (
    <group dispose={null}>
      <Text 
        color={textColor}
        fontSize={viewport.width / snap.viewportWidthFactor * snap.fontSize} 
        font={snap.font}
        position={[0, 0, 0]}
      >
        {snap.text}
      </Text>
      <mesh
        ref={meshRef}
        scale={viewport.width / snap.viewportWidthFactor * scale}
        onClick={(event) => setActive(!active)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}
        castShadow
        receiveShadow
        geometry={geometry}
        material={materials.Default}       
      >
          <MeshTransmissionMaterial 
            thickness={snap.thickness} 
            roughness={snap.roughness} 
            transmission={snap.transmission}
            ior={snap.ior}
            backside={snap.backside}
          />
      </mesh>
    </group>
  )
}
