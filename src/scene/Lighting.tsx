import { useEffect, useRef, type RefObject } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import Sky from './world/Sky'

function Lighting({ target, debugEnabled = false }: { target: RefObject<THREE.Vector3>, debugEnabled?: boolean }) {
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
        light.current.position.set(target.current.x - 15, target.current.y + 50, target.current.z + -20)
        light.current.target.position.copy(target.current)
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
