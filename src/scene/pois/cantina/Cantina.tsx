import { useGLTF } from '@react-three/drei'
import { CuboidCollider, CylinderCollider, RigidBody,  } from '@react-three/rapier'
import * as THREE from 'three'
import PoiLabel from '../PoiLabel'
import CantinaMusic from './CantinaMusic'
import Barrel from '../../props/Barrel'

import graffitiImage from '../../../assets/graffiti/graffiti_1.png'
import Graffiti from '../../props/Graffiti'
import Crate from '../../props/Crate'

const MODEL_PATH = '/models/cantina.glb'
const POSITION: [number, number, number] = [-240, 1, -80]
const ROTATION: [number, number, number] = [0, THREE.MathUtils.degToRad(100), 0]

function Cantina() {
    const { scene } = useGLTF(MODEL_PATH)


    scene.traverse((object) => {
        if ((object as THREE.Mesh).isMesh) {
            object.castShadow = true
            object.receiveShadow = true
        }
    })

    return (
        <RigidBody
            type="fixed"
            colliders={false}
            position={POSITION}
            rotation={ROTATION}
            scale={0.65}
        >
            <CylinderCollider args={[9, 13]} position={[3, 10, 19]} />
            <CuboidCollider args={[22, 10, 18]} position={[-5, 6, -1]} />
            <CuboidCollider args={[11, 10, 11]} position={[6, 6, -26]} />
            <CuboidCollider args={[4, 10, 4]} position={[21, 6, -2]} />
            <CuboidCollider args={[8, 10, 8]} position={[-10, 6, 20]} />

            <primitive object={scene} />

            <CantinaMusic/>

            <Barrel position={[-5, 4, 34]} scale={0.8 / 0.65}/>
            <Barrel position={[-10, 4, 32]} scale={0.8 / 0.65}/>
            <Barrel position={[-12, 4, -26]} scale={0.8 / 0.65}/>

            <Crate position={[23, 2, -10]}/>
            <Crate position={[21, 2, -14]} rotation={[0, 2, 0]}/>
            <Crate position={[23, 2, -18]} rotation={[0, 1, 0]}/>

            <PoiLabel text="Cantina" position={[0, 25, 0]} />

            <Graffiti 
                position={[-5, 8, -27]}
                scale={[7.2, 10.5]} 
                colliderScale={15}
                colliderPosition={[-10, 8, -27]}
                rotateY={- Math.PI / 2}
                image={graffitiImage}
            />

        </RigidBody>
    )
}

useGLTF.preload(MODEL_PATH)

export default Cantina
