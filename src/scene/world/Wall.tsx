import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import * as THREE from 'three'

const MODEL_PATH = '/models/desert_wall.glb'

function Wall() {
    const { scene } = useGLTF(MODEL_PATH)
    scene.traverse((o) => {
        if ((o as THREE.Mesh).isMesh) o.receiveShadow = true
    })
    return (
        <group>
            <RigidBody type="fixed" colliders="trimesh" scale={4}>
                <primitive object={scene} />
            </RigidBody>
        </group>
    )
}

useGLTF.preload(MODEL_PATH)

export default Wall;