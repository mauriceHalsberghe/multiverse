import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import * as THREE from 'three'
import { DESERT_SCALE } from '../../utils/useContstants'

const MODEL_PATH = '/models/desert_floor.glb'

function Floor() {
    const { scene } = useGLTF(MODEL_PATH)
    scene.traverse((o) => {
        if ((o as THREE.Mesh).isMesh) o.receiveShadow = true
    })
    return (
        <group>
            <RigidBody type="fixed" colliders="trimesh" scale={DESERT_SCALE} friction={3}>
                <primitive object={scene} />
            </RigidBody>
        </group>
    )
}

useGLTF.preload(MODEL_PATH)

export default Floor;