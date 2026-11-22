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
import Cantina from './pois/cantina/Cantina'
import R2Unit from './props/R2Unit'
import EscapePod from './props/EscapePod'
import Shrubs from './props/Shrubs'
import { useGLTF } from '@react-three/drei'

function Experience({
    orbitControlsEnabled,
    debugEnabled,
}: {
    orbitControlsEnabled: boolean
    debugEnabled: boolean
}) {
    const vehiclePosition = useRef(new THREE.Vector3(0, 2, 0))
    const { scene: groundScene } = useGLTF('/models/desert_floor.glb')


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
                <Cantina />

                <R2Unit />
                <EscapePod />
                <Shrubs vehiclePosition={vehiclePosition} ground={groundScene} />

            </Physics>
            <Lighting target={vehiclePosition} />
        </Suspense>
    )
}

export default Experience
