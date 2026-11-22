import { useGLTF } from '@react-three/drei'
import { CylinderCollider, RigidBody,  } from '@react-three/rapier'
import * as THREE from 'three'

const MODEL_PATH = '/models/escape_pod.glb'
const POSITION: [number, number, number] = [200, -1, -150]
const ROTATION: [number, number, number] = [0, 1.5, 0]

function EscapePod() {
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
            position={POSITION}
            rotation={ROTATION}
            scale={0.4}
        >
            <CylinderCollider args={[12, 7]} position={[0, 7, 0]} rotation={[2, 0, 0]}/>
            <primitive object={scene} />
        </RigidBody>
    )
}

useGLTF.preload(MODEL_PATH)

export default EscapePod
