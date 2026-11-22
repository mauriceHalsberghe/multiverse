import { PositionalAudio, useAnimations, useGLTF } from '@react-three/drei'
import { BallCollider, CapsuleCollider, RigidBody, type IntersectionEnterPayload, type IntersectionExitPayload,  } from '@react-three/rapier'
import * as THREE from 'three'
import PoiLabel from '../pois/PoiLabel'
import { useRef, useState } from 'react'
import R2AudioUrl from '../../audio/R2D2.mp3'
import SandPile from './SandPile'


const MODEL_PATH = '/models/r2_unit.glb'
const POSITION: [number, number, number] = [-100, 1.25, 140]
const ROTATION: [number, number, number] = [0.5, -0.5, 0.2]

function R2Unit() {
    const { scene, animations } = useGLTF(MODEL_PATH)
    const [showLabel, setShowLabel] = useState(false);
    const { actions } = useAnimations(animations, scene)
    const sound = useRef<THREE.PositionalAudio>(null)

    scene.traverse((object) => {
        if ((object as THREE.Mesh).isMesh) {
            object.castShadow = true
            object.receiveShadow = true
        }
    })

    const startAction = () => {
        const action = actions["Rotate_head"]
        setShowLabel(true)

        if (action && !action.isRunning()) {
            action.reset().setLoop(THREE.LoopOnce, 1)
            action.play()
        }

        if (sound.current && !sound.current.isPlaying) {
            sound.current.play()
        }
        
    }


    return (
        <RigidBody
            type="fixed"
            colliders={false}
            position={POSITION}
            rotation={ROTATION}
            scale={0.8}
        >

            <CapsuleCollider args={[1, 2]} position={[0, 2, 0]}/>
            <BallCollider
                args={[20]}
                sensor
                onIntersectionEnter={(payload) => {
                    if (isPlayer(payload)) startAction()
                }}
                onIntersectionExit={(payload) => {
                    if (isPlayer(payload)) setShowLabel(false)
                }}
            />

            <PositionalAudio
                ref={sound}
                url={R2AudioUrl}
                distance={10}
                loop={false}
                autoplay={false}
            />

            <SandPile position={[0, 0.5, 0]} scale={0.5} rotation={[-0.4, 1, 0]} />

            {showLabel && 
                <PoiLabel text="These are not the droids you're looking for..." position={[0, 10, 0]}/>
            }

            <primitive object={scene} />
        </RigidBody>
    )
}

const isPlayer = (payload: IntersectionEnterPayload | IntersectionExitPayload) =>
    payload.other.rigidBodyObject?.name === 'player'

useGLTF.preload(MODEL_PATH)

export default R2Unit
