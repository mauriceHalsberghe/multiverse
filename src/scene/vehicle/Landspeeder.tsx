import { useRef, type RefObject } from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { CuboidCollider, RapierRigidBody, RigidBody } from '@react-three/rapier'
import useFollowCamera from './useFollowCamera'
import useVehicleDrive from './useVehicleDrive'
import useEngineSound from './useEngineSound'
import useBoostGlow from './useBoostglow'


const MODEL_PATH = '/models/landspeeder.glb'
const START_POSITION: [number, number, number] = [4, 1, 0]

const ENGINE_SOUND = '/audio/hover_engine.wav'

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
    useEngineSound(body, ENGINE_SOUND)
    useBoostGlow(scene)

    scene.traverse((object) => {
        if ((object as THREE.Mesh).isMesh) {
            object.castShadow = true
            object.receiveShadow = true
        }
    })

    return (
        <RigidBody
            ref={body}
            colliders={false}
            gravityScale={1}
            linearDamping={2}
            angularDamping={8}
            position={START_POSITION}
            rotation={[0, -0.25, 0]}
            scale={0.9}
            mass={20}
            name='player'
        >
            <CuboidCollider
                args={[2.5, 2, 6]}
                position={[0, 1, 0]}
                friction={0.8}
            />

            <CuboidCollider
                args={[4.2, 0.5, 1.6]}
                position={[0, 1.5, -3.25]}
            />

            <CuboidCollider
                args={[1, 0.5, 1.6]}
                position={[0, 3, -6]}
            />
            <primitive object={scene} />
        </RigidBody>
    )
}

export default Landspeeder
