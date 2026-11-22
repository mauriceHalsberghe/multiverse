import { useGLTF } from '@react-three/drei'
import { BallCollider, CapsuleCollider, RigidBody,  } from '@react-three/rapier'
import * as THREE from 'three'
import PoiLabel from '../pois/PoiLabel'
import { useState } from 'react'

const MODEL_PATH = '/models/r2_unit.glb'
const POSITION: [number, number, number] = [-100, 0.5, 120]
const ROTATION: [number, number, number] = [0.5, -0.5, 0.2]

function R2Unit() {
    const { scene } = useGLTF(MODEL_PATH)
    const [showLabel, setShowLabel] = useState(false);

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
            scale={0.8}
        >

            <CapsuleCollider args={[1, 2]} position={[0, 2, 0]}/>


            <BallCollider
                args={[20]}
                sensor
                onIntersectionEnter={() =>  setShowLabel(true)}
                onIntersectionExit={() => setShowLabel(false)}
            />

            {showLabel && 

                <PoiLabel text="These are not the droids you're looking for..." position={[0, 10, 0]}/>
            }

            <primitive object={scene} />
        </RigidBody>
    )
}

useGLTF.preload(MODEL_PATH)

export default R2Unit
