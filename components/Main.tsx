"use client"
import React, { Suspense } from "react";
import { R3FCanvas } from "@/components/r3f/Canvas";
import state from "@/lib/store";
import { useSnapshot } from "valtio";

export default function Main() {
  const snap = useSnapshot(state);
  return (
    <main className="relative h-screen w-screen" style={{backgroundColor: snap.backgroundColor}}>
      <Suspense fallback={null}>
        <R3FCanvas />
      </Suspense>
    </main>
  );
}
