import { useRef, type RefObject } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import type { RapierRigidBody } from '@react-three/rapier'

const CAMERA_OFFSET = new THREE.Vector3(0, 25, -35)
const CAMERA_SMOOTHING = 5
const cameraTarget = new THREE.Vector3()
const targetPosition = new THREE.Vector3()
const cameraPosition = new THREE.Vector3()
const cameraOffset = new THREE.Vector3()
const up = new THREE.Vector3()
const rotation = new THREE.Quaternion()
const cameraRotation = new THREE.Quaternion()

function useFollowCamera(enabled: boolean, body: RefObject<RapierRigidBody>) {
    const initializeCamera = useRef(true)

    useFrame((state, dt) => {
        if (!enabled) {
            initializeCamera.current = true
            return
        }

        const rb = body.current
        if (!rb) return

        const position = rb.translation()
        targetPosition.set(position.x, position.y, position.z)

        const r = rb.rotation()
        rotation.set(r.x, r.y, r.z, r.w)
        if (initializeCamera.current) {
            cameraTarget.copy(targetPosition)
            cameraRotation.copy(rotation)
            initializeCamera.current = false
        } else {
            const smoothing = 1 - Math.exp(-CAMERA_SMOOTHING * dt)
            cameraTarget.lerp(targetPosition, smoothing)
            cameraRotation.slerp(rotation, smoothing)
        }

        up.copy(cameraTarget).normalize()
        cameraOffset.copy(CAMERA_OFFSET).applyQuaternion(cameraRotation)
        cameraPosition.copy(cameraTarget).add(cameraOffset)
        state.camera.up.copy(up)
        state.camera.position.copy(cameraPosition)
        state.camera.lookAt(cameraTarget)
    })
}

export default useFollowCamera
