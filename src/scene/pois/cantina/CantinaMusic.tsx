import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { PositionalAudio } from '@react-three/drei'
import cantinaAudioUrl from '../../../audio/cantina_band.mp3'

const REF = 20
const MAX = 80

export default function CantinaMusic() {
    const audio = useRef<THREE.PositionalAudio>(null)

    useEffect(() => {
        const a = audio.current
        if (!a) return
        a.setDistanceModel('linear')
        a.setRefDistance(REF)
        a.setMaxDistance(MAX)
        a.setRolloffFactor(1)
        a.setVolume(1)
    }, [])

    useEffect(() => {
        const resume = () => {
            const a = audio.current
            if (!a) return
            if (a.context.state === 'suspended') a.context.resume()
            if (!a.isPlaying) a.play()
        }
        window.addEventListener('pointerdown', resume)
        window.addEventListener('keydown', resume)
        return () => {
            window.removeEventListener('pointerdown', resume)
            window.removeEventListener('keydown', resume)
        }
    }, [])

    return (
        <PositionalAudio
            ref={audio}
            url={cantinaAudioUrl}
            position={[0, 1, 0]}
            distance={REF}
            loop
            autoplay
        />
    )
}
