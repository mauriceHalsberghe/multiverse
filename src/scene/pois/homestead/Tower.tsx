import { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { CylinderCollider, RigidBody } from '@react-three/rapier'
import * as THREE from 'three'

const MODEL_PATH = '/models/vaporizer.glb'

type TowerProps = {
    position: [number, number, number]
}

function Tower({ position }: TowerProps) {
    const { scene } = useGLTF(MODEL_PATH)
    const tower = useMemo(() => {
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
            type="fixed"
            colliders={false}
            position={position}
            scale={1}
        >   
            <CylinderCollider args={[8, 2.5]} position={[0, 8, 0]} />
            <primitive object={tower} />
        </RigidBody>
    )
}

useGLTF.preload(MODEL_PATH)

export default Tower
