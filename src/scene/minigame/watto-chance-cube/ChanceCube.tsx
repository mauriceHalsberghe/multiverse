import { useGLTF } from '@react-three/drei'
import { CuboidCollider, RigidBody,  } from '@react-three/rapier'
import * as THREE from 'three'

const MODEL_PATH = '/models/mos_espa/watto_dice.glb'
const POSITION: [number, number, number] = [0, 15, 0]

function ChanceCube() {
    const { scene } = useGLTF(MODEL_PATH)

    scene.traverse((object) => {
        if ((object as THREE.Mesh).isMesh) {
            object.castShadow = true
            object.receiveShadow = true
        }
    })

    return (
        <RigidBody
            type="dynamic"
            colliders={false}
            position={POSITION}
            gravityScale={5}
            mass={10}
            scale={0.5}
        >
            <CuboidCollider args={[5, 5, 5]} position={[0, 5,0]}/>

            <primitive object={scene} />

        </RigidBody>
    )
}

useGLTF.preload(MODEL_PATH)

export default ChanceCube
