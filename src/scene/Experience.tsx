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
import { useGLTF } from '@react-three/drei'
import ShrubScatter from './props/ShrubScatter'
import Effects from './Effects'
import MosEspa from './pois/mos_espa/MosEspa'
import WattoChanceCube from './minigame/watto-chance-cube/WattoChanceCube'
import { useGameStore } from '../store/useGameStore'
import AsciiEasterEgg from './easter-eggs/AsciiEasterEgg'

function Experience({
    orbitControlsEnabled,
    debugEnabled,
}: {
    orbitControlsEnabled: boolean
    debugEnabled: boolean
}) {
    const vehiclePosition = useRef(new THREE.Vector3(0, 2, 0))
    const { scene: groundScene } = useGLTF('/models/desert_floor.glb')
    const gameMode = useGameStore((state) => state.gameMode)


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
                <MosEspa />

                <R2Unit />
                <EscapePod />
                <ShrubScatter vehiclePosition={vehiclePosition} ground={groundScene} />

                {gameMode === 'dice' && <WattoChanceCube />}

            </Physics>

            <Lighting
                target={vehiclePosition}
                diceMode={gameMode === 'dice'}
                debugEnabled={debugEnabled}
            />
            <Effects/>

            {gameMode === 'explore' && <AsciiEasterEgg />}

            

        </Suspense>
    )
}

export default Experience
