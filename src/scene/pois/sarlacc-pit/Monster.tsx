import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useGLTF, useAnimations, PositionalAudio } from '@react-three/drei'
import { BallCollider, RigidBody } from '@react-three/rapier'

import MonsterAudioUrl from '../../../audio/sarlacc.mp3';

const MODEL_PATH = '/models/sarlacc.glb'

type Actions = Record<string, THREE.AnimationAction | null>
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))


function Monster({ position }: { position?: [number, number, number] }) {
    const group = useRef<THREE.Group>(null!)
    const { scene, animations } = useGLTF(MODEL_PATH)
    const { actions } = useAnimations(animations, group)
    const busy = useRef(false)
    const currentAction = useRef<THREE.AnimationAction | null>(null)
    const sound = useRef<THREE.PositionalAudio>(null)

    scene.traverse((object) => {
        if ((object as THREE.Mesh).isMesh) {
            object.castShadow = true
            object.receiveShadow = true
        }
    })

    useEffect(() => {
        playClip(actions, currentAction, 'IdleDown', true)
    }, [actions])

    const runSequence = async () => {
        if (busy.current) return
        busy.current = true

        if (sound.current && !sound.current.isPlaying) {
            sound.current.play()
        }

        await wait(playClip(actions, currentAction, 'MouthSnap', false))
        playClip(actions, currentAction, 'Idle', true)
        await wait(1500)
        await wait(playClip(actions, currentAction, 'DropDown', false))
        playClip(actions, currentAction, 'IdleDown', true)

        busy.current = false
    }

    return (
        <group ref={group} position={position}>
            <primitive object={scene} />

            <RigidBody type="fixed" colliders={false}>
                <BallCollider
                    args={[70]}
                    sensor
                    onIntersectionEnter={() =>  runSequence()}
                />
            </RigidBody>

            
            <PositionalAudio
                ref={sound}
                url={MonsterAudioUrl}
                distance={10}
                loop={false}
                autoplay={false}
            />
        </group>
    )
}

function playClip(
    actions: Actions,
    currentAction: { current: THREE.AnimationAction | null },
    name: string,
    loop: boolean
) {
    const action = actions[name]
    if (!action) return 0

    action.setLoop(loop ? THREE.LoopRepeat : THREE.LoopOnce, loop ? Infinity : 1)
    action.clampWhenFinished = !loop

    const previous = currentAction.current
    action.reset().play()
    if (previous && previous !== action) {
        previous.crossFadeTo(action, 0.25, false)
    }
    currentAction.current = action

    return action.getClip().duration * 1000
}


useGLTF.preload(MODEL_PATH)

export default Monster