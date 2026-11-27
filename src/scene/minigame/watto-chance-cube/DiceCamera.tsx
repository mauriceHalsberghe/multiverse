import { useEffect, useRef, type RefObject } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'

const VIEW_OFFSET = new THREE.Vector3(0, 20, 14)
const LOOK_OFFSET = new THREE.Vector3(0, 0, -0.5)

const LOOK_DISTANCE = 30

type Props = {
    trayRef: RefObject<THREE.Object3D | null>
    closing: boolean
    onClosed: () => void
}

function DiceCamera({ trayRef, closing, onClosed }: Props) {
    const camera = useThree((state) => state.camera)
    const look = useRef(new THREE.Vector3())
    const saved = useRef<{ position: THREE.Vector3; look: THREE.Vector3 } | null>(null)
    const timeline = useRef<gsap.core.Timeline | null>(null)

    useEffect(() => {
        const tray = trayRef.current
        if (!tray) return

        const direction = camera.getWorldDirection(new THREE.Vector3())

        saved.current = {
            position: camera.position.clone(),
            look: camera.position.clone().addScaledVector(direction, LOOK_DISTANCE),
        }

        look.current.copy(saved.current.look)

        tray.updateWorldMatrix(true, false)

        timeline.current = gsap.timeline()
            .to(camera.position, {
                ...tray.localToWorld(VIEW_OFFSET.clone()),
                duration: 1.2,
                ease: 'power2.inOut',
            }, 0)
            .to(look.current, {
                ...tray.localToWorld(LOOK_OFFSET.clone()),
                duration: 1.2,
                ease: 'power2.inOut',
            }, 0)

        return () => {
            timeline.current?.kill()
        }
    }, [camera, trayRef])

    useEffect(() => {
        if (!closing || !saved.current) return

        timeline.current?.kill()

        timeline.current = gsap.timeline({ onComplete: onClosed })
            .to(camera.position, {
                ...saved.current.position,
                duration: 0.9,
                ease: 'power2.inOut',
            }, 0)
            .to(look.current, {
                ...saved.current.look,
                duration: 0.9,
                ease: 'power2.inOut',
            }, 0)
    }, [closing, camera, onClosed])

    useFrame(() => {
        if (saved.current) camera.lookAt(look.current)
    })

    return null
}

export default DiceCamera