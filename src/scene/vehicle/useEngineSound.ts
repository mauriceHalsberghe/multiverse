import { useEffect, useRef, type RefObject } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import type { RapierRigidBody } from '@react-three/rapier'
import useVehicleControls from './useVehicleControls'
import { useAudioUnlock } from '../../utils/useAudioUnlock'

const SOUND_TOP_SPEED = 50 // speed that counts as full throttle for the pitch
const MIN_RATE = 0.5 // keep the engine audible while steering at a standstill
const MAX_RATE = 1.5 // playback pitch at top speed
const MAX_VOLUME = 0.15 // volume while the button is held
const MIN_CUTOFF = 600 // low-pass at standstill (duller)
const MAX_CUTOFF = 8000 // low-pass at top speed (brighter)
const FADE = 10
const STEER_POWER = 0.4

type Engine = {
    audio: THREE.Audio
    filter: BiquadFilterNode
}

function applyEngineState(engine: Engine, speedRatio: number, volumePower: number) {
    const { audio, filter } = engine
    if (!audio.isPlaying) return

    audio.setPlaybackRate(THREE.MathUtils.lerp(MIN_RATE, MAX_RATE, speedRatio))
    audio.setVolume(volumePower < 0.01 ? 0 : volumePower * MAX_VOLUME)

    const cutoff = MIN_CUTOFF * (MAX_CUTOFF / MIN_CUTOFF) ** speedRatio
    filter.frequency.setTargetAtTime(cutoff, audio.context.currentTime, 0.05)
}

function useEngineSound(body: RefObject<RapierRigidBody>, url: string) {
    useAudioUnlock()
    const getControls = useVehicleControls()
    const camera = useThree((state) => state.camera)
    const engine = useRef<Engine | null>(null)
    const speedSmoothed = useRef(0)
    const power = useRef(0)

    useEffect(() => {
        const listener = new THREE.AudioListener()
        camera.add(listener)
        let cancelled = false

        const audio = new THREE.Audio(listener)
        const filter = listener.context.createBiquadFilter()
        filter.type = 'lowpass'
        filter.Q.value = 0.7
        audio.setFilter(filter)

        new THREE.AudioLoader().load(
            url,
            (buffer) => {
                if (cancelled) return
                audio.setBuffer(buffer)
                audio.setLoop(true)
                audio.setVolume(0)
                audio.play()
            },
            undefined,
            (error) => console.error('sound failed to load', url, error)
        )

        engine.current = { audio, filter }

        return () => {
            cancelled = true
            if (audio.isPlaying) audio.stop()
            audio.disconnect()
            filter.disconnect()
            camera.remove(listener)
            engine.current = null
        }
    }, [camera, url])

    useFrame((_, delta) => {
        const current = engine.current
        if (!body.current || !current) return

        const { throttle, steer } = getControls()

        const powerTarget = throttle !== 0 ? 1 : steer !== 0 ? STEER_POWER : 0
        power.current = THREE.MathUtils.damp(power.current, powerTarget, FADE, delta)

        const velocity = body.current.linvel()
        const speed = Math.hypot(velocity.x, velocity.z)

        const speedTarget = Math.min(speed / SOUND_TOP_SPEED, 1)
        speedSmoothed.current = THREE.MathUtils.damp(speedSmoothed.current, speedTarget, 4, delta)

        applyEngineState(current, speedSmoothed.current, power.current)
    })
}

export default useEngineSound