"use client"

import React, { useState, useTransition } from "react";
import { useControls} from "leva";
import { Environment } from "@react-three/drei";
import { PresetsType } from "@react-three/drei/helpers/environment-assets";

import state from "@/lib/store";
import { useSnapshot } from "valtio";

export const Env = () => {  
  const snap = useSnapshot(state);      
  return <Environment 
    preset={snap.preset} 
    background={snap.background} 
    backgroundBlurriness={snap.blur} />;
}
