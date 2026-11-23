// useBoostGlow.ts
import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import useVehicleControls from './useVehicleControls'

function useBoostGlow(scene: THREE.Object3D) {
    const getControls = useVehicleControls()
    const boostCenter = useRef<THREE.Object3D | null>(null)
    const boostLeft = useRef<THREE.Object3D | null>(null)
    const boostRight = useRef<THREE.Object3D | null>(null)

    useEffect(() => {
        boostCenter.current = scene.getObjectByName('Boost_center') ?? null
        boostLeft.current = scene.getObjectByName('Boost_left') ?? null
        boostRight.current = scene.getObjectByName('Boost_right') ?? null
    }, [scene])

    useFrame(() => {
        if (!boostCenter.current || !boostLeft.current || !boostRight.current) return

        const { throttle, steer } = getControls()

        console.log(steer);
        
        boostCenter.current.visible = throttle !== 0

        boostLeft.current.visible =  steer < 0 || throttle !== 0
        boostRight.current.visible = steer > 0 || throttle !== 0
    })
}

export default useBoostGlow