import { useGLTF } from '@react-three/drei'
import { CuboidCollider, CylinderCollider, RigidBody,  } from '@react-three/rapier'
import * as THREE from 'three'
import { getPlanetPlacement } from '../../world/planetPlacement'

const MODEL_PATH = '/models/house.glb'
const placement = getPlanetPlacement([0, 1, 0.25], THREE.MathUtils.degToRad(-20), -2)

function House() {
    const { scene } = useGLTF(MODEL_PATH)

    scene.traverse((object) => {
        if ((object as THREE.Mesh).isMesh) {
            object.castShadow = true
            object.receiveShadow = true
        }
    })

    return (
        <RigidBody
            type="fixed"
            colliders={false}
            position={placement.position}
            rotation={placement.rotation}
            scale={0.75}
        >
            <CylinderCollider args={[9, 12]} position={[0, 10, 0]} />
            <CuboidCollider args={[4, 4, 6]} position={[11, 6, 0]} />
            <CuboidCollider args={[4, 4, 6]} position={[-11, 6, 0]} />
            <CuboidCollider args={[6, 4, 4]} position={[0, 6, -11]} />

            <primitive object={scene} />
        </RigidBody>
    )
}

useGLTF.preload(MODEL_PATH)

export default House
