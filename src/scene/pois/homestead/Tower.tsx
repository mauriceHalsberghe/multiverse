import { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { CylinderCollider, RigidBody } from '@react-three/rapier'
import * as THREE from 'three'
import { getPlanetPlacement } from '../../world/planetPlacement'

const MODEL_PATH = '/models/vaporizer.glb'

type TowerProps = {
    surfaceDirection: [number, number, number]
}

function Tower({ surfaceDirection }: TowerProps) {
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
    const placement = getPlanetPlacement(surfaceDirection)

    return (
        <RigidBody
            type="fixed"
            colliders={false}
            position={placement.position}
            rotation={placement.rotation}
            scale={1}
        >   
            <CylinderCollider args={[8, 2]} position={[0, 8, 0]} />
            <primitive object={tower} />
        </RigidBody>
    )
}

useGLTF.preload(MODEL_PATH)

export default Tower
