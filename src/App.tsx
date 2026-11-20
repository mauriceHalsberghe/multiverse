import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { KeyboardControls, OrbitControls } from '@react-three/drei'
import Experience from './scene/Experience'
import JoyStick from './ui/JoyStick'
import { useIsMobile } from './utils/useIsMobile'
 

function App() {
    const [orbitControlsEnabled, setOrbitControlsEnabled] = useState(false)
    const debugEnabled = import.meta.env.VITE_DEBUG === 'true'
    const showOrbitToggle = import.meta.env.DEV && debugEnabled

    const isMobile = useIsMobile();

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
                    <Experience
                        orbitControlsEnabled={orbitControlsEnabled}
                        debugEnabled={debugEnabled}
                    />
                </Canvas>
            </KeyboardControls>

            {isMobile && <JoyStick />}

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
