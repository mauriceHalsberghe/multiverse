import { useEffect, useRef } from "react"

export const KONAMI_CODE = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "KeyB",
    "KeyA",
]

export function useKonamiCode(onComplete: () => void) {
    const callbackRef = useRef(onComplete)

    useEffect(() => {
        callbackRef.current = onComplete
    }, [onComplete])

    useEffect(() => {
        let recentKeys: string[] = []

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.repeat) return

            recentKeys.push(e.code)
            recentKeys = recentKeys.slice(-KONAMI_CODE.length)

            const matches =
                recentKeys.length === KONAMI_CODE.length &&
                recentKeys.every((key, i) => key === KONAMI_CODE[i])

            if (!matches) return

            recentKeys = []
            callbackRef.current()
        }

        window.addEventListener("keydown", onKeyDown)
        return () => window.removeEventListener("keydown", onKeyDown)
    }, [])
}