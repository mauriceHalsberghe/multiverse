import { PositionalAudio, useTexture } from '@react-three/drei'
import { Suspense, useEffect, useRef, useState } from 'react';
import { DoubleSide, SRGBColorSpace } from 'three'
import { isPlayer } from '../../utils/useIsPlayer';
import { BallCollider } from '@react-three/rapier';
import PoiLabel from '../pois/PoiLabel';
import * as THREE from 'three';
import GraffitiAudioUrl from '../../audio/SprayPaint.mp3';

type GraffitiProps = {
    position: [number, number, number]
    scale: [number, number];
    colliderScale?: number;
    rotateY? :number;
    image: string;
}

function Graffiti({position, scale, colliderScale = 15, rotateY = 0, image}: GraffitiProps) {
    const texture = useTexture(image, (texture) => {
        texture.colorSpace = SRGBColorSpace
    })
    const [showLabel, setShowLabel] = useState(false);
    const [showGraffiti, setShowGraffiti] = useState(false);
    const sound = useRef<THREE.PositionalAudio>(null)

    useEffect(() => {
        if (!showLabel) return

        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.key === 'e' || event.key === 'E') && !event.repeat) {
                setShowGraffiti(true)
                if (sound.current) {
                    sound.current.play()
                }
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [showLabel])
        

    return (
        <group >


            <BallCollider
                args={[colliderScale]} 
                position={position} 
                sensor 
                onIntersectionEnter={(payload) => {
                    if (isPlayer(payload))setShowLabel(true)
                }}
                onIntersectionExit={(payload) => {
                    if (isPlayer(payload))setShowLabel(false)
                }}
            />

            <PositionalAudio
                ref={sound}
                url={GraffitiAudioUrl}
                distance={10}
                loop={false}
                autoplay={false}
            />

            {showLabel && !showGraffiti &&
                <PoiLabel text="Press E to spray graffiti" position={position} />
            }

            {showGraffiti &&
                <Suspense fallback={null}>
                    <mesh position={position} rotation={[0, rotateY, 0]}>
                        <planeGeometry args={scale} />
                        <meshBasicMaterial map={texture} transparent side={DoubleSide} />
                    </mesh>
                </Suspense>
            }

        </group>
    )
}

export default Graffiti;