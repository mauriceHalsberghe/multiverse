import { useRef, useState, type RefObject } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { KeyboardControls, OrbitControls } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import Desert from './scene/world/Desert'
import Landspeeder from './scene/vehicle/Landspeeder'

function DesertSun({ target }: { target: RefObject<THREE.Vector3> }) {
    const light = useRef<THREE.DirectionalLight>(null!)

    useFrame(() => {
        light.current.position.set(target.current.x + 30, target.current.y + 40, target.current.z + 20)
        light.current.target.position.copy(target.current)
        light.current.target.updateMatrixWorld()
    })

    return (
        <directionalLight
            ref={light}
            castShadow
            intensity={2}
            color="#fff1d0"
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-left={-20}
            shadow-camera-right={20}
            shadow-camera-top={20}
            shadow-camera-bottom={-20}
            shadow-camera-near={0.1}
            shadow-camera-far={120}
        />
    )
}

function App() {
    const [orbitControlsEnabled, setOrbitControlsEnabled] = useState(false)
    const showOrbitToggle = import.meta.env.DEV
    const vehiclePosition = useRef(new THREE.Vector3(0, 1, 0))

    return (
        <div className="app">
            <KeyboardControls
                map={[
                    { name: 'forward', keys: ['ArrowUp', 'KeyW', 'w', 'W'] },
                    { name: 'back', keys: ['ArrowDown', 'KeyS', 's', 'S'] },
                    { name: 'left', keys: ['ArrowLeft', 'KeyA', 'a', 'A'] },
                    { name: 'right', keys: ['ArrowRight', 'KeyD', 'd', 'D'] },
                ]}
            >
                <Canvas shadows camera={{ fov: 50, position: [0, 6, 10] }}>
                    {showOrbitToggle && orbitControlsEnabled && (
                        <OrbitControls makeDefault target={[0, 1, 0]} />
                    )}
                    <color attach="background" args={['#f2b777']} />
                    {/* <fog attach="fog" args={['#f2b777', 30, 120]} /> */}

                    <Physics>
                        <Desert />
                        <Landspeeder
                            orbitControlsEnabled={showOrbitToggle && orbitControlsEnabled}
                            vehiclePosition={vehiclePosition}
                        />
                    </Physics>
                    <DesertSun target={vehiclePosition} />
                </Canvas>
            </KeyboardControls>
            {showOrbitToggle && (
                <button
                    className="orbit-toggle"
                    type="button"
                    aria-pressed={orbitControlsEnabled}
                    onClick={() => setOrbitControlsEnabled((enabled) => !enabled)}
                >
                    Orbit controls: {orbitControlsEnabled ? 'On' : 'Off'}
                </button>
            )}
        </div>
    )
}

export default App
