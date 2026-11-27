import { useEffect } from "react"
import { useDiceStore } from "./useDiceStore"

const BASE_PATH = "/audio/watto/"

const WIN_CLIPS = ["watto1.mp3", "watto2.mp3", "watto5.mp3"]
const LOSE_CLIPS = ["watto3.mp3", "watto6.mp3"]
const STREAK_CLIP = "watto4.mp3"

const STREAK_MILESTONES = [5, 10]

const pickRandom = <T,>(items: T[]): T =>
    items[Math.floor(Math.random() * items.length)]

function WattoVoice() {
    useEffect(() => {
        const clips: Record<string, HTMLAudioElement> = {}
        for (const file of [...WIN_CLIPS, ...LOSE_CLIPS, STREAK_CLIP]) {
            const audio = new Audio(BASE_PATH + file)
            audio.preload = "auto"
            clips[file] = audio
        }

        let current: HTMLAudioElement | null = null

        const play = (file: string) => {
            current?.pause()
            const clip = clips[file]
            clip.currentTime = 0
            current = clip
            clip.play().catch(() => {})
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
            current?.pause()
        }
    }, [])

    return null
}

export default WattoVoice