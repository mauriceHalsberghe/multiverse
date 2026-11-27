import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const MODEL_PATH = '/models/mos_espa/cogwheels.glb'
const POSITION: [number, number, number] = [-17, 0, -12]

function Cogwheels() {
    const { scene } = useGLTF(MODEL_PATH)

    scene.traverse((object) => {
        if ((object as THREE.Mesh).isMesh) {
            object.castShadow = true
            object.receiveShadow = true
        }
    })

    return (
        <mesh
            position={POSITION}
            scale={1}
        >
            <primitive object={scene} />
        </mesh>
    )
}

useGLTF.preload(MODEL_PATH)

export default Cogwheels
