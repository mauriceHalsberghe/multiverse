import { useEffect } from "react"
import { useDiceStore } from "./useDiceStore"

const BASE_PATH = "/audio/watto/"

const WIN_CLIPS = ["watto1.mp3", "watto2.mp3", "watto5.mp3"]
const LOSE_CLIPS = ["watto3.mp3", "watto6.mp3"]
const STREAK_CLIP = "watto4.mp3"

const STREAK_MILESTONES = [5, 10]

const TAIL_FADE = 0.25
const CUT_FADE = 0.12

type Clip = {
    audio: HTMLAudioElement
    gain: GainNode
    stopTimer?: number
}

const pickRandom = <T,>(items: T[]): T =>
    items[Math.floor(Math.random() * items.length)]

function WattoVoice() {
    useEffect(() => {
        const ctx = new AudioContext()

        const clips: Record<string, Clip> = {}
        for (const file of [...WIN_CLIPS, ...LOSE_CLIPS, STREAK_CLIP]) {
            const audio = new Audio(BASE_PATH + file)
            audio.preload = "auto"

            const gain = ctx.createGain()
            ctx.createMediaElementSource(audio).connect(gain).connect(ctx.destination)

            clips[file] = { audio, gain }
        }

        let current: Clip | null = null

        const fadeOutAndStop = (clip: Clip) => {
            const now = ctx.currentTime
            clip.gain.gain.cancelScheduledValues(now)
            clip.gain.gain.setValueAtTime(clip.gain.gain.value, now)
            clip.gain.gain.linearRampToValueAtTime(0, now + CUT_FADE)

            clearTimeout(clip.stopTimer)
            clip.stopTimer = window.setTimeout(() => clip.audio.pause(), CUT_FADE * 1000)
        }

        const play = (file: string) => {
            const clip = clips[file]

            if (current && current !== clip) fadeOutAndStop(current)

            clearTimeout(clip.stopTimer)
            ctx.resume()

            const { audio, gain } = clip
            audio.currentTime = 0

            const now = ctx.currentTime
            gain.gain.cancelScheduledValues(now)
            gain.gain.setValueAtTime(1, now)

            if (Number.isFinite(audio.duration) && audio.duration > TAIL_FADE) {
                gain.gain.setValueAtTime(1, now + audio.duration - TAIL_FADE)
                gain.gain.linearRampToValueAtTime(0, now + audio.duration)
            }

            current = clip
            audio.play().catch(() => {})
        }

        const unsubscribe = useDiceStore.subscribe((state, prev) => {
            if (state.lastFace === null || state.lastFace === prev.lastFace) return

            if (state.lastWon) {
                const milestone = STREAK_MILESTONES.includes(state.streak)
                play(milestone ? STREAK_CLIP : pickRandom(WIN_CLIPS))
            } else {
                play(pickRandom(LOSE_CLIPS))
            }
        })

        return () => {
            unsubscribe()
            if (current) fadeOutAndStop(current)
            window.setTimeout(() => ctx.close(), CUT_FADE * 1000 + 50)
        }
    }, [])

    return null
}

export default WattoVoice