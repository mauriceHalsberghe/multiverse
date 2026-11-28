import { useEffect, useState } from "react";
import { useDiceStore } from "../store/useDiceStore";


function ChanceCubeResult() {

    const showResult = useDiceStore((s) => s.showResult)
    const lastWon = useDiceStore((s) => s.lastWon)
    const lostStreak = useDiceStore((s) => s.lostStreak)
    const dismissResult = useDiceStore((s) => s.dismissResult)
    const requestClose = useDiceStore((s) => s.requestClose)

    const [mounted, setMounted] = useState(showResult)

    if (showResult && !mounted) setMounted(true)

    const closing = mounted && !showResult

    //fade out
    useEffect(() => {
        if (!closing) return
        const timer = window.setTimeout(() => setMounted(false), 200)
        return () => window.clearTimeout(timer)
    }, [closing])

    //hide toast after 1s
    useEffect(() => {
        if (!showResult || !lastWon) return
        const timer = window.setTimeout(dismissResult, 1000)
        return () => window.clearTimeout(timer)
    }, [showResult, lastWon, dismissResult])

    if (!mounted) return null
    const closingClass = closing ? 'is-closing' : ''

    if (lastWon) {
        return (
            <div className={`dicegame__toast ${closingClass}`} role="status">
                <h2>Correct!</h2>
            </div>
        )
    }

    return (
        <div className={`dicegame__backdrop ${closingClass}`}>
            <div className="dicegame__modal" role="dialog" aria-modal="true">

                <h2>You lost!</h2>
                <p>Streak: {lostStreak}</p>

                <div className="dicegame__modal-buttons">
                    <button className="button dicegame__modal-button" onClick={requestClose}>Exit</button>
                    <button className="button dicegame__modal-button dicegame__modal-button--primary" onClick={dismissResult} autoFocus>
                        Again!
                    </button>
                </div>

            </div>
        </div>
    )
}

export default ChanceCubeResult;