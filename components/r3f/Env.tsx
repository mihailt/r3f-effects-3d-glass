"use client"

import React from "react";
import { Environment } from "@react-three/drei";

import state from "@/lib/store";
import { useSnapshot } from "valtio";

export const Env = () => {  
  const snap = useSnapshot(state);      
  return <Environment 
    preset={snap.preset} 
    background={snap.background} 
    backgroundBlurriness={snap.blur} />;
}
