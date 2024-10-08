"use client"
import React, { useRef, useState, useTransition } from "react";
import { useControls} from "leva";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, } from "@react-three/drei";
import { Env } from "./Env";
import * as THREE from 'three'; // Ensure THREE is imported
import { useSpring } from '@react-spring/three'


export const Box = (
  { hovered: initialHovered = false, active: initialActive = false, ...props }
  :{ hovered?: boolean; active?: boolean; }
) => {

  // This reference will give us direct access to the mesh
  const meshRef = useRef<THREE.Mesh>(null); // Ensure meshRef is typed correctly
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(initialHovered)
  const [active, setActive] = useState(initialActive)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta;
      meshRef.current.rotation.y += delta;
      meshRef.current.rotation.z += delta;
    }
  })
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

