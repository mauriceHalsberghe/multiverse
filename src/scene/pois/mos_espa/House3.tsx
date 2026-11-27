import { useGLTF } from "@react-three/drei"
import { CuboidCollider, CylinderCollider, RigidBody } from "@react-three/rapier"
import * as THREE from 'three'

const MODEL_PATH = '/models/mos_espa/house3.glb'
const POSITION: [number, number, number] = [63, -2, 10]
const ROTATION: [number, number, number] = [0, 0.2, 0]

function House3() {
    const { scene } = useGLTF(MODEL_PATH)

    scene.traverse((object) => {
        if ((object as THREE.Mesh).isMesh) {
            object.castShadow = true
            object.receiveShadow = true
        }
    })
    
    return (
        <>
            <RigidBody
                type="fixed"
                colliders={false}
                position={POSITION}
                rotation={ROTATION}
                scale={0.65}
            >
                <primitive object={scene} />

                <CylinderCollider args={[5, 15]} position={[27.5, 5, -24.5]}/>
                <CuboidCollider args={[6, 5, 3]} position={[15, 5, -11]} rotation={[0, 0.65, 0]}/>
                <CuboidCollider args={[10, 5, 3]} position={[-30, 5, 21]} rotation={[0, 0.4, 0]}/>
                
            </RigidBody>
        </>
    )
}

export default House3

useGLTF.preload(MODEL_PATH)