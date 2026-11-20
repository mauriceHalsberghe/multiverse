import { useRef } from 'react'
import * as THREE from 'three'
import { Physics } from '@react-three/rapier'
import { PHYSICS_TIME_STEP } from './physicsConfig'
import Lighting from './Lighting'
import Landspeeder from './vehicle/Landspeeder'
import Desert from './world/Desert'
import { Suspense } from 'react'
import Homestead from './pois/homestead/Homestead'
import SarlaccPit from './pois/sarlacc-pit/SarlaccPit'

function Experience({
    orbitControlsEnabled,
    debugEnabled,
}: {
    orbitControlsEnabled: boolean
    debugEnabled: boolean
}) {
    const vehiclePosition = useRef(new THREE.Vector3(0, 212, 0))

    return (
        <Suspense fallback={null}>
            <Physics debug={debugEnabled} timeStep={PHYSICS_TIME_STEP}>
                <Desert />
                
                <Landspeeder
                    orbitControlsEnabled={orbitControlsEnabled}
                    vehiclePosition={vehiclePosition}
                />

                <Homestead />
                <SarlaccPit />

            </Physics>
            <Lighting target={vehiclePosition} />
        </Suspense>
    )
}

export default Experience
