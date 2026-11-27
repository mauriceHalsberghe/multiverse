import { useEffect, useRef, type RefObject } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import Sky from './world/Sky'

const DICE_SCENE_TARGET = new THREE.Vector3(500, 0, 0)

function Lighting({
    target,
    diceMode,
    debugEnabled = false,
}: {
    target: RefObject<THREE.Vector3>
    diceMode: boolean
    debugEnabled?: boolean
}) {
    const light = useRef<THREE.DirectionalLight>(null!)
    const helper = useRef<THREE.DirectionalLightHelper | null>(null)
    const scene = useThree((state) => state.scene)

    useEffect(() => {
        if (!debugEnabled) return

        const lightHelper = new THREE.DirectionalLightHelper(light.current, 10)
        helper.current = lightHelper
        scene.add(lightHelper)

        return () => {
            scene.remove(lightHelper)
            lightHelper.dispose()
            helper.current = null
        }
    }, [debugEnabled, scene])

    useFrame(() => {
        const activeTarget = diceMode ? DICE_SCENE_TARGET : target.current
        light.current.position.set(activeTarget.x - 15, activeTarget.y + 50, activeTarget.z - 20)
        light.current.target.position.copy(activeTarget)
        light.current.target.updateMatrixWorld()
        helper.current?.update()
    })

    return (
        <>
            <Sky />
            <hemisphereLight args={['#fff2dc', '#8a633f', 1]} />
            <directionalLight
                ref={light}
                castShadow
                intensity={2}
                color="#ffffff"
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-bias={-0.0001}
                shadow-normalBias={0.02}
                shadow-camera-left={-100}
                shadow-camera-right={100}
                shadow-camera-top={100}
                shadow-camera-bottom={-100}
                shadow-camera-near={0.1}
                shadow-camera-far={200}
                shadow-radius={4}
            />
        </>
    )
}

export default Lighting
