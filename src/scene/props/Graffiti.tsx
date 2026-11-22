import { PositionalAudio, useTexture } from '@react-three/drei'
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { DoubleSide, SRGBColorSpace } from 'three'
import { isPlayer } from '../../utils/useIsPlayer';
import { BallCollider } from '@react-three/rapier';
import PoiLabel from '../pois/PoiLabel';
import * as THREE from 'three';
import GraffitiAudioUrl from '../../audio/SprayPaint.mp3';
import { useUIStore } from '../../store/useUIStore';

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
    const isMobile = useUIStore((state) => state.isMobile)
    const isGraffitiNearby = useUIStore((state) => state.isGraffitiNearby)
    const setIsGraffitiNearby = useUIStore((state) => state.setIsGraffitiNearby)
    const graffitiSprayRequestCount = useUIStore((state) => state.graffitiSprayRequestCount)
    const [showGraffiti, setShowGraffiti] = useState(false);
    const sound = useRef<THREE.PositionalAudio>(null)

    const sprayGraffiti = useCallback(() => {
        if (!isGraffitiNearby || showGraffiti) return
        setShowGraffiti(true)
        setIsGraffitiNearby(false)
        if (sound.current && !sound.current.isPlaying) {
            sound.current.play()
        }
    }, [isGraffitiNearby, setIsGraffitiNearby, showGraffiti])

    useEffect(() => {
        if (isMobile || !isGraffitiNearby) return

        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.key === 'e' || event.key === 'E') && !event.repeat) {
                sprayGraffiti()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isMobile, isGraffitiNearby, sprayGraffiti])

    const handledSprayRequestCount = useRef(graffitiSprayRequestCount)
    
    useEffect(() => {
        if (graffitiSprayRequestCount === handledSprayRequestCount.current) return
        handledSprayRequestCount.current = graffitiSprayRequestCount
        sprayGraffiti()
    }, [graffitiSprayRequestCount, sprayGraffiti])
        

    return (
        <group >


            <BallCollider
                args={[colliderScale]} 
                position={position} 
                sensor 
                onIntersectionEnter={(payload) => {
                    if (isPlayer(payload) && !showGraffiti) setIsGraffitiNearby(true)
                }}
                onIntersectionExit={(payload) => {
                    if (isPlayer(payload)) setIsGraffitiNearby(false)
                }}
            />

            <PositionalAudio
                ref={sound}
                url={GraffitiAudioUrl}
                distance={10}
                loop={false}
                autoplay={false}
            />

            {isGraffitiNearby && !showGraffiti &&
                <PoiLabel text={isMobile ? 'Press Spray to spray graffiti' : 'Press E to spray graffiti'} position={position} />
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