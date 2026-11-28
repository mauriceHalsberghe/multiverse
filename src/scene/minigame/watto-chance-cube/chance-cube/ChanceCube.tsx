import { useGLTF } from '@react-three/drei'
import { RapierRigidBody, RigidBody,  } from '@react-three/rapier'
import { useEffect, useRef } from 'react'
import { readFaceUp } from './readFaceUp'
import { configureShadows } from '../../../../utils/configureShadows'
import { useChanceCubePhysics } from './useChanceCubePhysics'
import { useChanceCubeInput } from './useChanceCubeInput'
import { useDiceStore } from '../../../../store/useDiceStore'

const MODEL_PATH = '/models/mos_espa/chance_cube.glb'
const POSITION: [number, number, number] = [0, 2, 0]
const ROTATION: [number, number, number] = [0, Math.PI / Math.random() , 0]

function ChanceCube() {
    const { scene } = useGLTF(MODEL_PATH)
    const bodyRef = useRef<RapierRigidBody>(null);

    useChanceCubeInput(bodyRef)
    useChanceCubePhysics(bodyRef)

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
