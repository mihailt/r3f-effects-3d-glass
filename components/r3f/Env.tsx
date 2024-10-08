"use client"

import React, { useState, useTransition } from "react";
import { useControls} from "leva";
import { Environment } from "@react-three/drei";
import { PresetsType } from "@react-three/drei/helpers/environment-assets";

export const Env = () => {
  const [preset, setPreset] = useState<PresetsType>("sunset");
  const [inTransition, startTransition] = useTransition();
  const { blur } = useControls({
    preset: {
      label: "Env.",
      value: preset,
      options: [
        "sunset",
        "dawn",
        "night",
        "warehouse",
        "forest",
        "apartment",
        "studio",
        "city",
        "park",
        "lobby",
      ],
      onChange: (value) => startTransition(() => setPreset(value)),
    },
    blur: { label: "Env. blur", value: 0.65, min: 0, max: 1 },
  });
  return <Environment preset={preset} background backgroundBlurriness={blur} />;
}
