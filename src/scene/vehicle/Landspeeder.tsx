import { useRef, type RefObject } from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { CuboidCollider, RapierRigidBody, RigidBody } from '@react-three/rapier'
import useFollowCamera from './useFollowCamera'
import useVehicleDrive from './useVehicleDrive'

const MODEL_PATH = '/models/landspeeder.glb'
const START_POSITION: [number, number, number] = [0, 212, 0]

function Landspeeder({
    orbitControlsEnabled,
    vehiclePosition,
}: {
    orbitControlsEnabled: boolean
    vehiclePosition: RefObject<THREE.Vector3>
}) {
    const body = useRef<RapierRigidBody>(null!)
    const { scene } = useGLTF(MODEL_PATH)

    useVehicleDrive(body, vehiclePosition)
    useFollowCamera(!orbitControlsEnabled, body)

    scene.traverse((object) => {
        if ((object as THREE.Mesh).isMesh) object.castShadow = true
    })

    return (
        <RigidBody
            ref={body}
            colliders={false}
            gravityScale={0}
            linearDamping={2}
            angularDamping={8}
            position={START_POSITION}
        >
            <CuboidCollider
                args={[2.5, 2, 6]}
                position={[0, 1, 0]}
                friction={0.8}
            />
            <primitive object={scene} />
        </RigidBody>
    )
}

export default Landspeeder
