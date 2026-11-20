import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useGLTF, useAnimations } from '@react-three/drei'
import { BallCollider, RigidBody } from '@react-three/rapier'

const MODEL_PATH = '/models/sarlacc.glb'

type Actions = Record<string, THREE.AnimationAction | null>

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function playClip(actions: Actions, name: string, loop: boolean) {
    Object.values(actions).forEach((a) => a?.stop())
    const action = actions[name]
    if (!action) return 0
    action.setLoop(loop ? THREE.LoopRepeat : THREE.LoopOnce, loop ? Infinity : 1)
    action.clampWhenFinished = true
    action.reset().play()
    return action.getClip().duration * 1000
}

function Monster({ position }: { position?: [number, number, number] }) {
    const group = useRef<THREE.Group>(null!)
    const { scene, animations } = useGLTF(MODEL_PATH)
    const { actions } = useAnimations(animations, group)
    const busy = useRef(false)

    useEffect(() => {
        playClip(actions, 'IdleDown', true)
    }, [actions])

    const runSequence = async () => {
        if (busy.current) return
        busy.current = true

        await wait(playClip(actions, 'MouthSnap', false))
        playClip(actions, 'Idle', true)
        await wait(3000)
        await wait(playClip(actions, 'DropDown', false))
        playClip(actions, 'IdleDown', true)

        busy.current = false
    }

    return (
        <group ref={group} position={position}>
            <primitive object={scene} />

            <RigidBody type="fixed" colliders={false}>
                <BallCollider
                    args={[60]}
                    sensor
                    onIntersectionEnter={() =>  runSequence()}
                />
            </RigidBody>
        </group>
    )
}

useGLTF.preload(MODEL_PATH)

export default Monster