import { useGLTF } from '@react-three/drei'
import {  RigidBody,  } from '@react-three/rapier'
import { useEffect } from 'react'
import { configureShadows } from '../../../utils/configureShadows'

const MODEL_PATH = '/models/mos_espa/dice_tray.glb'
const POSITION: [number, number, number] = [0, 0, 0]
const ROTATION: [number, number, number] = [0, 0, 0]

function DiceTray() {
    const { scene } = useGLTF(MODEL_PATH)

    useEffect(() => {
        configureShadows(scene)
    }, [scene])

    return (
        <RigidBody
            type="fixed"
            colliders="trimesh"
            position={POSITION}
            rotation={ROTATION}
            scale={0.1}
        >
            <primitive object={scene} />

        </RigidBody>
    )
}

useGLTF.preload(MODEL_PATH)

export default DiceTray
