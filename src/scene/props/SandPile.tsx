import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useMemo } from "react";
import * as THREE from 'three'

const MODEL_PATH = '/models/sand_pile.glb'

type SandPileProps = {
    position: [number, number, number]
    rotation?: [number, number, number]
    scale?: number;
}

function SandPile({ position, rotation = [0, 0, 0], scale = 1 }: SandPileProps) {
    const { scene } = useGLTF(MODEL_PATH)

    const sandPile = useMemo(() => {
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
        <RigidBody
            position={position}
            rotation={rotation}
            colliders={false}
            scale={scale}
        >

            <primitive object={sandPile} />
        </RigidBody>
    );
}

useGLTF.preload(MODEL_PATH)

export default SandPile;
