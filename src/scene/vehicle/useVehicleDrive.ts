import type { RefObject } from 'react'
import * as THREE from 'three'
import { useBeforePhysicsStep, type RapierRigidBody } from '@react-three/rapier'
import { PHYSICS_TIME_STEP } from '../physicsConfig'
import useVehicleControls from './useVehicleControls'

const ACCELERATION = 80
const MAX_SPEED = 130
const TURN_SPEED = 2
const GRAVITY = 9.81

const rotation = new THREE.Quaternion()
const orientation = new THREE.Quaternion()
const orientationMatrix = new THREE.Matrix4()
const up = new THREE.Vector3()
const forward = new THREE.Vector3(0, 0, 1)
const basisRight = new THREE.Vector3()
const tangentVelocity = new THREE.Vector3()

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
        up.set(position.x, position.y, position.z)
        if (up.lengthSq() === 0) return
        up.normalize()

        forward.set(0, 0, 1).applyQuaternion(rotation)
        forward.addScaledVector(up, -forward.dot(up))
        if (forward.lengthSq() < 1e-8) {
            forward.set(1, 0, 0).addScaledVector(up, -up.x)
        }
        forward.normalize()

        const { forward: accelerate, back, left, right: steerRight } = getControls()
        const steer = Number(left) - Number(steerRight)
        if (steer !== 0) forward.applyAxisAngle(up, steer * TURN_SPEED * PHYSICS_TIME_STEP)

        basisRight.crossVectors(up, forward).normalize()
        forward.crossVectors(basisRight, up).normalize()
        orientationMatrix.makeBasis(basisRight, up, forward)
        orientation.setFromRotationMatrix(orientationMatrix)
        rb.setRotation(
            { x: orientation.x, y: orientation.y, z: orientation.z, w: orientation.w },
            true
        )
        rb.setAngvel({ x: 0, y: 0, z: 0 }, true)

        rb.applyImpulse(
            {
                x: -up.x * GRAVITY * rb.mass() * PHYSICS_TIME_STEP,
                y: -up.y * GRAVITY * rb.mass() * PHYSICS_TIME_STEP,
                z: -up.z * GRAVITY * rb.mass() * PHYSICS_TIME_STEP,
            },
            true
        )

        const direction = Number(accelerate) - Number(back)
        if (direction !== 0) {
            rb.wakeUp()
            rb.applyImpulse(
                {
                    x: forward.x * direction * ACCELERATION * rb.mass() * PHYSICS_TIME_STEP,
                    y: forward.y * direction * ACCELERATION * rb.mass() * PHYSICS_TIME_STEP,
                    z: forward.z * direction * ACCELERATION * rb.mass() * PHYSICS_TIME_STEP,
                },
                true
            )
        }

        const velocity = rb.linvel()
        tangentVelocity
            .set(velocity.x, velocity.y, velocity.z)
            .addScaledVector(up, -(velocity.x * up.x + velocity.y * up.y + velocity.z * up.z))
        const speed = tangentVelocity.length()
        if (speed > MAX_SPEED) {
            const scale = MAX_SPEED / speed
            tangentVelocity.multiplyScalar(scale)
            const radialSpeed = velocity.x * up.x + velocity.y * up.y + velocity.z * up.z
            tangentVelocity.addScaledVector(up, radialSpeed)
            rb.setLinvel(
                { x: tangentVelocity.x, y: tangentVelocity.y, z: tangentVelocity.z },
                true
            )
        }
    })
}

export default useVehicleDrive
