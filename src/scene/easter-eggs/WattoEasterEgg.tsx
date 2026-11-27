import { useEffect, useRef } from "react"
import { useKonamiCode } from "./useKonamiCode"

const AUDIO_PATH = "/audio/watto/watto7.mp3"

function WattoEasterEgg() {
    const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        const audio = new Audio(AUDIO_PATH)
        audio.preload = "auto"
        audioRef.current = audio

        return () => {
            audio.pause()
            audioRef.current = null
        }
    }, [])

    useKonamiCode(() => {
        const audio = audioRef.current
        if (!audio) return

        audio.currentTime = 0
        audio.play().catch(() => {})
    })

    return null
}

export default WattoEasterEgg