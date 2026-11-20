import { useGLTF } from '@react-three/drei'
import { BallCollider, RigidBody } from '@react-three/rapier'
import * as THREE from 'three'
import { PLANET_RADIUS, PLANET_SCALE } from './planetPlacement'

const MODEL_PATH = '/models/desert_sphere.glb'


function Desert() {
    const { scene } = useGLTF(MODEL_PATH)
    scene.traverse((o) => {
        if ((o as THREE.Mesh).isMesh) o.receiveShadow = true
    })
    return (
        <RigidBody type="fixed" colliders={false}>
            <BallCollider args={[PLANET_RADIUS]} />
            <primitive object={scene} scale={PLANET_SCALE} />
        </RigidBody>
    )
}

useGLTF.preload(MODEL_PATH)

export default Desert;