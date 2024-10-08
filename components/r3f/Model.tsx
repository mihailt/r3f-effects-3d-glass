"use client"

import React, { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Text, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three';
import { useSpring, config } from "@react-spring/three";

import state from "@/lib/store";
import { useSnapshot } from "valtio";
import { getGeometryFor } from "@/lib/utils";

export const Model = ({name}: { name: string}) => {
  
  const snap = useSnapshot(state);    
  const { nodes, materials } = useGLTF(`./models/${name}`)
  const { viewport } = useThree();
  
  const geometryName = getGeometryFor(name)
  // @ts-expect-error ts error - Property 'geometry' does not exist on type 'Object3D<Object3DEventMap>'
  const geometry = nodes[geometryName]?.geometry;  

  // This reference will give us direct access to the mesh
  const meshRef = useRef<THREE.Mesh>(null);
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const [color, setColor] = useState(snap.color.default)
  const [scale, setScale] = useState(active ? snap.scale.active : snap.scale.default)
  const [viewportScale, setViewportScale] = useState(viewport.width / snap.viewportWidthFactor * scale)  
   
  const tColor = new THREE.Color(color);
  // @ts-expect-error Property 'color' does not exist on type 'Material'
  materials.Default.color = tColor;

  useSpring({
    color: hovered ? snap.color.active : snap.color.default,
    scale: active ? snap.scale.active : snap.scale.default,
    config: config.wobbly,
    onChange: ({ value }) => {
      setScale(value.scale)
      setViewportScale(viewport.width / snap.viewportWidthFactor * value.scale)
      setColor(value.color)
      tColor.set(value.color)
      // @ts-expect-error Property 'color' does not exist on type 'Material'
      materials.Default.color = tColor;
    },
  },[active, hovered, snap.scale.active, snap.scale.default, snap.color.active, snap.color.default]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 2;
    }
  })

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
        scale={viewportScale}
        onClick={() => {setActive(!active); state.background = !state.background}}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        castShadow
        receiveShadow
        geometry={geometry}
        material={materials.Default}       
      >
          <MeshTransmissionMaterial 
            color={color}
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
