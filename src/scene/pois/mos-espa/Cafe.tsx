import { useGLTF } from "@react-three/drei"
import { CuboidCollider, RigidBody } from "@react-three/rapier"
import * as THREE from 'three'

const MODEL_PATH = '/models/mos_espa/cafe.glb'
const POSITION: [number, number, number] = [-1, -0.8, -44]
const ROTATION: [number, number, number] = [0, 0.3, 0]

function Cafe() {
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

                <CuboidCollider args={[31, 8, 9]} position={[3, 8, -14]}/>
                <CuboidCollider args={[1, 3, 8]} position={[24, 3, 1]}/>
                <CuboidCollider args={[9, 6, 4]} position={[19, 6, -25]}/>
                <CuboidCollider args={[9, 6, 4]} position={[-11, 6, -25]}/>

                <CuboidCollider args={[0.4, 6, 0.4]} position={[15.5, 6, 8.5]} rotation={[0.15,0,0]}/>
                <CuboidCollider args={[0.4, 6, 0.4]} position={[-18, 6, 8.5]} rotation={[0.15,0,0]}/>
            
                <CuboidCollider args={[11.5, 6, 15]} position={[-36, 6, -9]}/>
                <CuboidCollider args={[11.5, 6, 19]} position={[-42, 6, -3]} rotation={[0, 0.77, 0]}/>
                
            </RigidBody>
        </>
    )
}

export default Cafe

useGLTF.preload(MODEL_PATH)