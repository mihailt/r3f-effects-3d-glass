import { proxy } from 'valtio';
import { PresetsType } from "@react-three/drei/helpers/environment-assets";

interface ScaleConfig
{
    default: number
    active: number
}

interface ColorConfig
{
    default: string
    active: string
}

interface Config {
    blur: number
    preset: PresetsType
    options: PresetsType[]
    enableZoom: boolean
    enablePan: boolean
    enableRotate: boolean
    lightIntensity: number
    background: boolean
    backgroundColor: string
    scale: ScaleConfig
    color: ColorConfig
    viewportWidthFactor: number
    text: string
    textColor: string
    font: string
    fontSize: number

    thickness: number,
    roughness: number,
    transmission: number,
    ior: number,
    chromaticAberration: number,
    backside: boolean,
    preload: string[]
}

const config: Config = {
    blur: 0.65,

    preset: "night",
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

    enableZoom: false,
    enablePan: false,
    enableRotate: false,

    lightIntensity: 3,

    backgroundColor: "#000000",
    background: false,

    scale: {
        default: 0.8,
        active: 1
    },

    color: {
        default: 'orange',
        active: 'hotpink'
    },

    viewportWidthFactor: 3,

    text: "3D Glass Effect",
    textColor: "#ffffff",
    fontSize: 0.2, 
    font: "fonts/NeueMontreal-Bold.otf",

    thickness: 0.2,
    roughness: 0,
    transmission: 1,
    ior: 1.2,
    chromaticAberration: 0.02,
    backside: true,
    preload: ['/Torus.glb']
};

const state = proxy<Config>(config);

export default state;
