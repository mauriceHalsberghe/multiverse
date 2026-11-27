import { useGLTF } from "@react-three/drei"
import { CylinderCollider, RigidBody } from "@react-three/rapier"
import * as THREE from 'three'

const MODEL_PATH = '/models/mos_espa/house2.glb'
const POSITION: [number, number, number] = [-51, 0.1, -26]
const ROTATION: [number, number, number] = [0, 0, 0]

function House2() {
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

                <CylinderCollider args={[5, 15]} position={[0, 5, -0.75]}/>
                
            </RigidBody>
        </>
    )
}

export default House2

useGLTF.preload(MODEL_PATH)