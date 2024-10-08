import React, { useRef, useState, useTransition, useEffect, Suspense, forwardRef, useImperativeHandle } from "react";
import { R3FCanvas } from "@/components/r3f/Canvas";

export default function Home() {
  
  return (
    <main className="relative h-screen w-screen">
      <Suspense fallback={null}>
        <R3FCanvas />
      </Suspense>
    </main>
  );
}
