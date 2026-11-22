import { useRef, useMemo, type RefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { Group, Vector3 } from 'three'
import * as THREE from 'three'

const RADIUS = 5.5
const MAX_TILT = 3
const STIFFNESS = 50
const DAMPING = 6
const MODEL_PATH = '/models/shrub.glb'

export function Shrub({
    position,
    rotationY = 0,
    scale = 1,
    vehiclePosition,
}: {
    position: [number, number, number]
    rotationY?: number
    scale?: number
    vehiclePosition: RefObject<Vector3>
}) {
    const { scene } = useGLTF(MODEL_PATH)
    const root = useRef<Group>(null!)
    const bend = useRef<Group>(null!)
    const local = useRef(new Vector3())
    const spring = useRef({ rx: 0, rz: 0, vx: 0, vz: 0 })

    const model = useMemo(() => {
    const clone = scene.clone()
    clone.traverse((object) => {
        if ((object as THREE.Mesh).isMesh) {
        object.castShadow = true
        object.receiveShadow = true
        }
    })
    return clone
    }, [scene])

    useFrame((_, delta) => {
        const s = spring.current
        const p = local.current
        const dt = Math.min(delta, 1 / 30)

        p.copy(vehiclePosition.current)
        root.current.worldToLocal(p)

        const dist = Math.hypot(p.x, p.z)
        let targetX = 0
        let targetZ = 0

        if (dist < RADIUS && Math.abs(p.y) < 2) {
            const push = 1 - dist / RADIUS
            const dx = -p.x / (dist || 1)
            const dz = -p.z / (dist || 1)
            targetZ = -dx * push * MAX_TILT
            targetX = dz * push * MAX_TILT
        } else if (
            Math.abs(s.rx) < 0.001 && Math.abs(s.rz) < 0.001 &&
            Math.abs(s.vx) < 0.001 && Math.abs(s.vz) < 0.001
        ) {
            return
        }

        s.vx += (STIFFNESS * (targetX - s.rx) - DAMPING * s.vx) * dt
        s.vz += (STIFFNESS * (targetZ - s.rz) - DAMPING * s.vz) * dt
        s.rx += s.vx * dt
        s.rz += s.vz * dt

        bend.current.rotation.set(s.rx, 0, s.rz)
    })

    return (
        <group ref={root} position={position} rotation={[0, rotationY, 0]} scale={scale}>
            <group ref={bend}>
                <primitive object={model} />
            </group>
        </group>
    )
}

useGLTF.preload(MODEL_PATH)

export default Shrub;