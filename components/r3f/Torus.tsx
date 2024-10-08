"use client"

import React, { useRef, useState, useTransition } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'; // Ensure THREE is imported
import { useSpring, config } from "@react-spring/three";

export const Torus = (
  { hovered: initialHovered = false, active: initialActive = false}
  :{ hovered?: boolean; active?: boolean; }
) => {

  const name = 'Torus.glb';
  const { nodes, materials } = useGLTF(`./models/${name}`)
  const geometryName = name.replace('.glb', '').charAt(0).toUpperCase() + name.slice(1).replace('.glb', '');
  
  // @ts-ignore
  const geometry = nodes[geometryName]?.geometry;  
  // This reference will give us direct access to the mesh
  const meshRef = useRef<THREE.Mesh>(null); // Ensure meshRef is typed correctly
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(initialHovered)
  const [active, setActive] = useState(initialActive)

  const [color, setColor] = useState('orange')
  const [scale, setSetScale] = useState(0.8)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  const tColor = new THREE.Color(color);
  useSpring({
    color: hovered ? 'hotpink' : 'orange',
    scale: active ? 1.2 : 0.8,
    config: config.wobbly,
    onChange: ({ value }) => {
      setSetScale(value.scale)
      setColor(value.color)
      tColor.set(value.color)
      // @ts-ignore
      materials.Default.color = tColor;
    },
  },[active, hovered]);



  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta;
      meshRef.current.rotation.y += delta;
      meshRef.current.rotation.z += delta;      
    }
  })

  return (
    <group dispose={null}>
      <mesh
        ref={meshRef}
        scale={scale}
        onClick={(event) => setActive(!active)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}
        castShadow
        receiveShadow
        geometry={geometry}
        material={materials.Default}       
        />
    </group>
  )
}
