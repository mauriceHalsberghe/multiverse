import { useGLTF } from '@react-three/drei'
import {  CuboidCollider, RigidBody,  } from '@react-three/rapier'
import { useEffect } from 'react'
import { configureShadows } from '../../../../utils/configureShadows'

const MODEL_PATH = '/models/mos_espa/workbench.glb'
const POSITION: [number, number, number] = [0, 0, 0]

function Workbench() {
    const { scene } = useGLTF(MODEL_PATH)

    useEffect(() => {
        configureShadows(scene, false, true)
    }, [scene])

    return (
        <RigidBody
            type="fixed"
            colliders={false}
            position={POSITION}
        >
            <primitive object={scene} />

            <CuboidCollider args={[10, 5, 10]} position={[0, -5, 0]}/>

        </RigidBody>
    )
}

useGLTF.preload(MODEL_PATH)

export default Workbench
