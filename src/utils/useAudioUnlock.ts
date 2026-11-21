import { useEffect } from 'react'
import * as THREE from 'three'

export function useAudioUnlock() {
    useEffect(() => {
        const ctx = THREE.AudioContext.getContext() as unknown as globalThis.AudioContext
        if (ctx.state === 'running') return

        const events = ['pointerdown', 'pointerup', 'keydown'] as const
        const remove = () => events.forEach(e => window.removeEventListener(e, unlock))

        const unlock = () => {
            void ctx.resume().then(() => {
                if (ctx.state === 'running') remove()
            })
        }

        events.forEach(e => window.addEventListener(e, unlock))
        return remove
    }, [])
}