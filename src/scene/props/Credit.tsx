import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from 'three'

const MODEL_PATHS = {
    1: "/models/mos_espa/watto_credit1.glb",
    2: "/models/mos_espa/watto_credit2.glb",
} as const

type CreditType = keyof typeof MODEL_PATHS

type CreditProps = {
    position: [number, number, number]
    rotation?: [number, number, number]
    type: CreditType
}

function Credit({ position, rotation = [0, 0, 0], type = 1 }: CreditProps) {

    const { scene } = useGLTF(MODEL_PATHS[type])
    
    const credit = useMemo(() => {
        const clone = scene.clone(true)
        clone.traverse((object) => {
            if ((object as THREE.Mesh).isMesh) {
                object.castShadow = true
                object.receiveShadow = true
            }
        })
        return clone
    }, [scene])

    return (
        <mesh

            position={position}
            rotation={rotation}
            scale={0.25}
        >
            <primitive object={credit} />
        </mesh>
    );
}

Object.values(MODEL_PATHS).forEach((path) => useGLTF.preload(path))

export default Credit;
