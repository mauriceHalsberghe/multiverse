import { useGLTF } from "@react-three/drei"
import { CylinderCollider, RigidBody } from "@react-three/rapier"
import * as THREE from 'three'

const MODEL_PATH = '/models/mos_espa/watto_shop.glb'
const POSITION: [number, number, number] = [-31, -0.3, -3]
const ROTATION: [number, number, number] = [0, -1, 0]

function WattosShop() {
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

                <CylinderCollider args={[5, 23]} position={[0, 5, 0]}/>
                <CylinderCollider args={[5, 3]} position={[6, 5, 24]}/>
                <CylinderCollider args={[5, 3]} position={[13, 5, 21]}/>
                
            </RigidBody>
        </>
    )
}

export default WattosShop

useGLTF.preload(MODEL_PATH)