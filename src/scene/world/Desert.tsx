import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import * as THREE from 'three'

function Desert() {
    const { scene } = useGLTF('/models/desert.glb')
    scene.traverse((o) => {
        if ((o as THREE.Mesh).isMesh) o.receiveShadow = true
    })
    return (
        <RigidBody type="fixed" colliders="trimesh">
        <primitive object={scene} />
        </RigidBody>
    )
}
export default Desert;