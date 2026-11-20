import * as THREE from 'three'

const PLANET_MODEL_RADIUS = 70
export const PLANET_SCALE = 3
export const PLANET_RADIUS = PLANET_MODEL_RADIUS * PLANET_SCALE

const planetUp = new THREE.Vector3(0, 1, 0)

export function getPlanetPlacement(
    direction: [number, number, number],
    yaw = 0,
    radialOffset = 0
): {
    position: [number, number, number]
    rotation: [number, number, number]
} {
    const normal = new THREE.Vector3(...direction)
    if (normal.lengthSq() === 0) {
        throw new Error('Planet placement direction cannot be zero')
    }

    normal.normalize()
    
    const radius = PLANET_RADIUS + radialOffset
    if (!Number.isFinite(radius) || radius <= 0) {
        throw new RangeError('Planet placement radius must be a positive finite number')
    }

    const position = normal.clone().multiplyScalar(radius)
    const yawRotation = new THREE.Quaternion().setFromAxisAngle(planetUp, yaw)
    const orientation = new THREE.Quaternion()
        .setFromUnitVectors(planetUp, normal)
        .multiply(yawRotation)
    const euler = new THREE.Euler().setFromQuaternion(orientation)

    return {
        position: position.toArray(),
        rotation: [euler.x, euler.y, euler.z],
    }
}
