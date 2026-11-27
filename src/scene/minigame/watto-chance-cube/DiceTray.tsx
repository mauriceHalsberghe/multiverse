import { useGLTF } from '@react-three/drei'
import {  CuboidCollider, RigidBody,  } from '@react-three/rapier'
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
            colliders={false}
            position={POSITION}
            rotation={ROTATION}
            scale={0.1}
        >
            <primitive object={scene} />

            <CuboidCollider args={[80, 10, 60]} position={[0, -7, 0]} />

            <CuboidCollider args={[50, 60, 4]} position={[0, 35, 62]} />
            <CuboidCollider args={[50, 60, 4]} position={[0, 35, -62]} />
            <CuboidCollider args={[4, 60, 30]} position={[70, 35, 0]} />
            <CuboidCollider args={[4, 50, 30]} position={[-70, 35, 0]} />

            <CuboidCollider args={[4, 60, 30]} position={[50, 35, -40]} rotation={[0, Math.PI/4,0]}/>
            <CuboidCollider args={[4, 50, 30]} position={[-50, 35, 40]} rotation={[0, Math.PI/4,0]}/>
            <CuboidCollider args={[4, 60, 30]} position={[50, 35, 40]} rotation={[0, -Math.PI/4,0]}/>
            <CuboidCollider args={[4, 60, 30]} position={[-50, 35, -40]} rotation={[0, -Math.PI/4,0]}/>

        </RigidBody>
    )
}

useGLTF.preload(MODEL_PATH)

export default DiceTray
