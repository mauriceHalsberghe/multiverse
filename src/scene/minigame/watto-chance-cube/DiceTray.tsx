import { useGLTF } from '@react-three/drei'
import {  RigidBody,  } from '@react-three/rapier'
import * as THREE from 'three'

const MODEL_PATH = '/models/mos_espa/dice_tray.glb'
const POSITION: [number, number, number] = [0, 0, 0]
const ROTATION: [number, number, number] = [0, 0, 0]

function DiceTray() {
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
            position={POSITION}
            rotation={ROTATION}
            scale={0.5}
        >
            <primitive object={scene} />

        </RigidBody>
    )
}

useGLTF.preload(MODEL_PATH)

export default DiceTray
