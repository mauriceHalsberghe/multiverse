import { useRef, type RefObject } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

function Lighting({ target }: { target: RefObject<THREE.Vector3> }) {
    const light = useRef<THREE.DirectionalLight>(null!)

    useFrame(() => {
        light.current.position.set(target.current.x + 30, target.current.y + 40, target.current.z + 20)
        light.current.target.position.copy(target.current)
        light.current.target.updateMatrixWorld()
    })

    return (
        <>
            <hemisphereLight args={['#fff2dc', '#8a633f', 0.8]} />
            <directionalLight
                ref={light}
                castShadow
                intensity={3}
                color="#ffffff"
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-left={-100}
                shadow-camera-right={100}
                shadow-camera-top={100}
                shadow-camera-bottom={-100}
                shadow-camera-near={0.1}
                shadow-camera-far={300}
                shadow-radius={4}
            />
        </>
    )
}

export default Lighting
