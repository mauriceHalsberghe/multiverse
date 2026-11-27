import { useGLTF } from '@react-three/drei'
import { BallCollider, CylinderCollider, RigidBody,  } from '@react-three/rapier'
import { useState } from 'react'
import * as THREE from 'three'
import PoiLabel from '../pois/PoiLabel'

const MODEL_PATH = '/models/escape_pod.glb'
const POSITION: [number, number, number] = [-25, -1, -200]
const ROTATION: [number, number, number] = [0, 1.5, 0]

function EscapePod() {
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
            scale={0.5}
        >
            <CylinderCollider args={[12, 7]} position={[0, 7, 0]} rotation={[2, 0, 0]}/>
            <primitive object={scene} />

            
            <BallCollider
                args={[50]}
                sensor
                onIntersectionEnter={() =>  setShowLabel(true)}
                onIntersectionExit={() => setShowLabel(false)}
            />


            {showLabel && 
                <PoiLabel text="No life forms were aboard this escape pod..." position={[0, 25, 0]}/>
            }
            
        </RigidBody>
    )
}

useGLTF.preload(MODEL_PATH)

export default EscapePod
