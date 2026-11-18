import { useRef, type RefObject } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useKeyboardControls } from '@react-three/drei'
import { CuboidCollider, RapierRigidBody, RigidBody } from '@react-three/rapier'

const MODEL_PATH = '/models/landspeeder.glb'
const START_POSITION: [number, number, number] = [0, 1, 0]
const ACCELERATION = 250
const MAX_SPEED = 50
const TURN_SPEED = 2.5
const CAMERA_OFFSET = new THREE.Vector3(0, 4, -8)

const rotation = new THREE.Quaternion()
const forward = new THREE.Vector3(0, 0, 1)
const cameraOffset = new THREE.Vector3()
const cameraTarget = new THREE.Vector3()
const cameraPosition = new THREE.Vector3()

function Landspeeder({
    orbitControlsEnabled,
    vehiclePosition,
}: {
    orbitControlsEnabled: boolean
    vehiclePosition: RefObject<THREE.Vector3>
}) {
    const body = useRef<RapierRigidBody>(null!)
    const [, get] = useKeyboardControls()
    const { scene } = useGLTF(MODEL_PATH)

    scene.traverse((object) => {
        if ((object as THREE.Mesh).isMesh) object.castShadow = true
    })

    useFrame((state, dt) => {
        const { forward: accelerate, back, left, right } = get()
        const rb = body.current
        const r = rb.rotation()
        rotation.set(r.x, r.y, r.z, r.w)
        const position = rb.translation()
        vehiclePosition.current.set(position.x, position.y, position.z)

        const direction = Number(accelerate) - Number(back)
        forward.set(0, 0, 1).applyQuaternion(rotation)
        rb.applyImpulse(
            { x: forward.x * direction * ACCELERATION * dt, y: 0, z: forward.z * direction * ACCELERATION * dt },
            true
        )

        const steer = Number(left) - Number(right)
        rb.setAngvel({ x: 0, y: steer * TURN_SPEED, z: 0 }, true)

        const velocity = rb.linvel()
        const speed = Math.hypot(velocity.x, velocity.z)
        if (speed > MAX_SPEED) {
            const scale = MAX_SPEED / speed
            rb.setLinvel({ x: velocity.x * scale, y: velocity.y, z: velocity.z * scale }, true)
        }

        if (!orbitControlsEnabled) {
            cameraTarget.copy(vehiclePosition.current)
            cameraOffset.copy(CAMERA_OFFSET).applyQuaternion(rotation)
            cameraPosition.copy(cameraTarget).add(cameraOffset)
            state.camera.position.lerp(cameraPosition, 1 - Math.exp(-5 * dt))
            state.camera.lookAt(cameraTarget)
        }
    })

    return (
        <RigidBody
            ref={body}
            colliders={false}
            enabledRotations={[false, true, false]}
            linearDamping={2}
            angularDamping={8}
            position={START_POSITION}
        >
            <CuboidCollider args={[1, 0.5, 2]} friction={0.8} />
            <primitive object={scene} />
        </RigidBody>
    )
}

export default Landspeeder
