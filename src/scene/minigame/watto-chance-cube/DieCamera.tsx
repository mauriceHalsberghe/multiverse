import { useEffect, useRef, type RefObject } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'

const VIEW_OFFSET = new THREE.Vector3(0, 11, 7)
const LOOK_OFFSET = new THREE.Vector3(0, 0, 0)

const DURATION_IN = 1.2
const DURATION_OUT = 0.9
const LOOK_DISTANCE = 30 // how far ahead the "saved" look point is placed

type Props = {
    trayRef: RefObject<THREE.Object3D | null>
    closing: boolean
    onClosed: () => void
}

function DiceCamera({ trayRef, closing, onClosed }: Props) {
    const camera = useThree((state) => state.camera)

    // Point the camera looks at. GSAP tweens this and useFrame applies it.
    const look = useRef(new THREE.Vector3())
    const saved = useRef<{ position: THREE.Vector3; look: THREE.Vector3 } | null>(null)
    const timeline = useRef<gsap.core.Timeline | null>(null)

    // Enter: remember the current pose, then fly to the dice view
    useEffect(() => {
        const tray = trayRef.current
        if (!tray) return

        const direction = new THREE.Vector3()
        camera.getWorldDirection(direction)

        saved.current = {
            position: camera.position.clone(),
            look: camera.position.clone().addScaledVector(direction, LOOK_DISTANCE),
        }
        look.current.copy(saved.current.look)

        tray.updateWorldMatrix(true, false)
        const toPosition = tray.localToWorld(VIEW_OFFSET.clone())
        const toLook = tray.localToWorld(LOOK_OFFSET.clone())

        timeline.current = gsap
            .timeline()
            .to(camera.position, { ...toPosition, duration: DURATION_IN, ease: 'power2.inOut' }, 0)
            .to(look.current, { ...toLook, duration: DURATION_IN, ease: 'power2.inOut' }, 0)

        return () => {
            timeline.current?.kill()
        }
    }, [camera, trayRef])

    // Exit: fly back to the saved pose, then tell the parent we're done
    useEffect(() => {
        if (!closing || !saved.current) return
        const { position, look: savedLook } = saved.current

        timeline.current?.kill()
        timeline.current = gsap
            .timeline({ onComplete: onClosed })
            .to(camera.position, { x: position.x, y: position.y, z: position.z, duration: DURATION_OUT, ease: 'power2.inOut' }, 0)
            .to(look.current, { x: savedLook.x, y: savedLook.y, z: savedLook.z, duration: DURATION_OUT, ease: 'power2.inOut' }, 0)
    }, [closing, camera, onClosed])

    // Keep aiming at the tweened look point
    useFrame(() => {
        if (!saved.current) return
        camera.lookAt(look.current)
    })

    return null
}

export default DiceCamera