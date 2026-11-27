import type { RefObject } from 'react'
import * as THREE from 'three'
import { useBeforePhysicsStep, type RapierRigidBody } from '@react-three/rapier'
import { PHYSICS_TIME_STEP } from '../physicsConfig'
import useVehicleControls from './useVehicleControls'
import { useGameStore } from '../../store/useGameStore'

const ACCELERATION = 80
const MAX_SPEED = 120
const TURN_SPEED = 2

const rotation = new THREE.Quaternion()
const yawRotation = new THREE.Quaternion()
const up = new THREE.Vector3(0, 1, 0)
const forward = new THREE.Vector3(0, 0, 1)
const horizontalVelocity = new THREE.Vector3()

function useVehicleDrive(
    body: RefObject<RapierRigidBody>,
    vehiclePosition: RefObject<THREE.Vector3>
) {
    const getControls = useVehicleControls()

    useBeforePhysicsStep(() => {
        const rb = body.current
        if (!rb) return

        const r = rb.rotation()
        rotation.set(r.x, r.y, r.z, r.w)
        const position = rb.translation()
        vehiclePosition.current.set(position.x, position.y, position.z)

        if (useGameStore.getState().gameMode !== 'explore') {
            const v = rb.linvel()
            rb.setLinvel({ x: 0, y: v.y, z: 0 }, true)
            rb.setAngvel({ x: 0, y: 0, z: 0 }, true)
            return
        }

        forward.set(0, 0, 1).applyQuaternion(rotation)
        forward.y = 0
        forward.normalize()

        const { throttle, steer } = getControls()
        if (steer !== 0) {
            yawRotation.setFromAxisAngle(up, steer * TURN_SPEED * PHYSICS_TIME_STEP)
            rotation.multiply(yawRotation)
            rb.setRotation(
                { x: rotation.x, y: rotation.y, z: rotation.z, w: rotation.w },
                true
            )
            forward.set(0, 0, 1).applyQuaternion(rotation)
            forward.y = 0
            forward.normalize()
        }
        rb.setAngvel({ x: 0, y: 0, z: 0 }, true)

        if (throttle !== 0) {
            rb.wakeUp()
            rb.applyImpulse(
                {
                    x: forward.x * throttle * ACCELERATION * rb.mass() * PHYSICS_TIME_STEP,
                    y: forward.y * throttle * ACCELERATION * rb.mass() * PHYSICS_TIME_STEP,
                    z: forward.z * throttle * ACCELERATION * rb.mass() * PHYSICS_TIME_STEP,
                },
                true
            )
        }

        const velocity = rb.linvel()
        horizontalVelocity.set(velocity.x, 0, velocity.z)
        const speed = horizontalVelocity.length()

        if (speed > MAX_SPEED) {
            const scale = MAX_SPEED / speed
            horizontalVelocity.multiplyScalar(scale)
            rb.setLinvel(
                { x: horizontalVelocity.x, y: velocity.y, z: horizontalVelocity.z },
                true
            )
        }
    })
}

export default useVehicleDrive
