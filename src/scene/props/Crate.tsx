import { useGLTF } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useMemo } from "react";
import * as THREE from 'three'

const MODEL_PATH = '/models/crate.glb'

type CrateProps = {
    position: [number, number, number]
    rotation?: [number, number, number]
    scale?: number;
}

function Crate({ position, rotation = [0, 0, 0] }: CrateProps) {

    const { scene } = useGLTF(MODEL_PATH)
    
    const crate = useMemo(() => {
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
            friction={50}
            mass={50}
            gravityScale={2}
        >
            <CuboidCollider args={[1.5, 1.5, 1.5]} position={[0, 1.5, 0]} />
            <primitive object={crate} />
        </RigidBody>
    );
}

useGLTF.preload(MODEL_PATH)

export default Crate;
