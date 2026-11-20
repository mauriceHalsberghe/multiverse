import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import * as THREE from 'three'
import { getPlanetPlacement } from './planetPlacement'

const MODEL_PATH = '/models/house.glb'
const placement = getPlanetPlacement([1, 1, 0.25], THREE.MathUtils.degToRad(22), -2)

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
            colliders="trimesh"
            position={placement.position}
            rotation={placement.rotation}
            scale={0.75}
        >
            <primitive object={scene} />
        </RigidBody>
    )
}

useGLTF.preload(MODEL_PATH)

export default House
