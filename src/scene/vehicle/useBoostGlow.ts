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

    useFrame((_, delta) => {
        if (!boostCenter.current || !boostLeft.current || !boostRight.current) return

        const { throttle, steer } = getControls()

        const fade = (object: THREE.Object3D, visible: boolean) => {
            object.traverse(child => {
                if ((child as THREE.Mesh).isMesh) {
                    const material = (child as THREE.Mesh).material as THREE.MeshStandardMaterial
                    material.transparent = true
                    material.opacity = THREE.MathUtils.damp(
                        material.opacity,
                        visible ? 1 : 0,
                        8,
                        delta
                    )
                }
            })
        }
        
        fade(boostCenter.current, throttle !== 0)
        fade(boostLeft.current, steer < 0 || (throttle > 0 && steer === 0))
        fade(boostRight.current, steer > 0 || (throttle > 0 && steer === 0))
    })
}

export default useBoostGlow