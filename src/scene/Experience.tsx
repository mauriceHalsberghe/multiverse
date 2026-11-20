import { useRef } from 'react'
import * as THREE from 'three'
import { Physics } from '@react-three/rapier'
import { PHYSICS_TIME_STEP } from './physicsConfig'
import Lighting from './Lighting'
import Landspeeder from './vehicle/Landspeeder'
import Desert from './world/Desert'
import House from './world/House'
import Tower from './world/Tower'

function Experience({
    orbitControlsEnabled,
    debugEnabled,
}: {
    orbitControlsEnabled: boolean
    debugEnabled: boolean
}) {
    const vehiclePosition = useRef(new THREE.Vector3(0, 212, 0))

    return (
        <>
            <Physics debug={debugEnabled} timeStep={PHYSICS_TIME_STEP}>
                <Desert />
                <House />
                <Landspeeder
                    orbitControlsEnabled={orbitControlsEnabled}
                    vehiclePosition={vehiclePosition}
                />

                <Tower surfaceDirection={[0.2, 1, 0]} />
                <Tower surfaceDirection={[0.1, 0.4, 0.1]} />
                <Tower surfaceDirection={[-0.25, 2, 0.25]} />
            </Physics>
            <Lighting target={vehiclePosition} />
        </>
    )
}

export default Experience
