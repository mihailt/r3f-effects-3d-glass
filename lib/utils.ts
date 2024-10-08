import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getGeometryFor(name: string, format: string = ".glb"){
  return name
    .replace(format, '').charAt(0).toUpperCase() 
    + name.slice(1).replace(format, '');
}