import { useGLTF } from "@react-three/drei"
import { CuboidCollider, RigidBody } from "@react-three/rapier"
import * as THREE from 'three'
import Graffiti from "../../props/Graffiti"
import graffitiImage from '../../../assets/graffiti/graffiti_2.png'


const MODEL_PATH = '/models/mos_espa/house4.glb'
const POSITION: [number, number, number] = [55, -1.7, -35]
const ROTATION: [number, number, number] = [0, -0.3, 0]

function House4() {
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

                <CuboidCollider args={[19, 10, 16]} position={[0, 10, 2]}/>
                <CuboidCollider args={[5, 10, 13]} position={[-24, 10, -1]}/>
                <CuboidCollider args={[8, 10, 15]} position={[-37, 10, -13]}/>

                <Graffiti position={[0, 12, -13]} scale={[9.3, 13.8]} colliderScale={17} image={graffitiImage} />

            </RigidBody>
        </>
    )
}

export default House4

useGLTF.preload(MODEL_PATH)