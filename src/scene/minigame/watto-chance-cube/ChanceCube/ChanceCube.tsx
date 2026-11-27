import { useGLTF } from '@react-three/drei'
import { RapierRigidBody, RigidBody,  } from '@react-three/rapier'
import { useEffect, useRef } from 'react'
import { readFaceUp } from './readFaceUp'
import { useDiceInput } from './useDiceInput'
import { useDicePhysics } from './useDicePhysics'
import { configureShadows } from '../../../../utils/configureShadows'
import { useDiceStore } from '../useDiceStore'

const MODEL_PATH = '/models/mos_espa/watto_dice.glb'
const POSITION: [number, number, number] = [0, 2, 0]
const ROTATION: [number, number, number] = [0, Math.PI / Math.random() , 0]

function ChanceCube() {
    const { scene } = useGLTF(MODEL_PATH)
    const bodyRef = useRef<RapierRigidBody>(null);

    useDiceInput(bodyRef)
    useDicePhysics(bodyRef)

    useEffect(() => {
        configureShadows(scene)
    }, [scene])


    return (
        <RigidBody
            type="dynamic"
            colliders="cuboid"
            position={POSITION}
            rotation={ROTATION}
            gravityScale={5}
            scale={0.1}
            ref={bodyRef}
            canSleep
            onSleep={() => {
                if (useDiceStore.getState().phase !== 'rolling') return
                const face = readFaceUp(scene)
                useDiceStore.getState().finishRoll(face)
            }}
                    >
            <primitive object={scene} />

        </RigidBody>
    )
}

useGLTF.preload(MODEL_PATH)

export default ChanceCube
