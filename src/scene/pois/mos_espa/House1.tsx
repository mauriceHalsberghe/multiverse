import { useGLTF } from "@react-three/drei"
import { CuboidCollider, CylinderCollider, RigidBody } from "@react-three/rapier"
import * as THREE from 'three'

const MODEL_PATH = '/models/mos_espa/house1.glb'
const POSITION: [number, number, number] = [10, -1.4, 25]
const ROTATION: [number, number, number] = [0, 0, 0]

function House1() {
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

                <CuboidCollider args={[23.5, 10, 15]} position={[30, 10, 12]}/>
                <CuboidCollider args={[9, 10, 15]} position={[0, 10, 2]} rotation={[0, 1.25 ,0]}/>
                <CuboidCollider args={[15, 10, 16]} position={[-26, 10, 10]}/>
                <CylinderCollider args={[5, 14]} position={[-26, 5, -10]}/>

                
            </RigidBody>
        </>
    )
}

export default House1

useGLTF.preload(MODEL_PATH)