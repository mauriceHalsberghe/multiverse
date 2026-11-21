import { useGLTF } from "@react-three/drei";
import { CylinderCollider, RigidBody } from "@react-three/rapier";
import { useMemo } from "react";
import * as THREE from 'three'

const MODEL_PATH = '/models/barrel.glb'

type BarrelProps = {
    position: [number, number, number]
}

function Barrel({ position }: BarrelProps) {

    const { scene } = useGLTF(MODEL_PATH)
    const barrel = useMemo(() => {
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
            colliders={false}
            friction={15}
            mass={20}
            scale={0.8}
        >

            <CylinderCollider args={[2.1, 1.5]} position={[0, 0.15, 0]} />
            <primitive object={barrel} />
        </RigidBody>
    );
}

useGLTF.preload(MODEL_PATH)

export default Barrel;
