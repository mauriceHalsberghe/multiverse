import { useDiceStore } from "../scene/minigame/watto-chance-cube/useDiceStore";

function DiceGame() {
    const roll = useDiceStore((state) => state.roll)
    const phase = useDiceStore((state) => state.phase)
    const history = useDiceStore((state) => state.history)
    const streak = useDiceStore((state) => state.streak)
    const bestStreak = useDiceStore((state) => state.bestStreak)

    const requestClose = useDiceStore((state) => state.requestClose)
    

    return (
        <main className="dicegame">

            <button className="dicegame__close" onClick={requestClose}>✖</button>

            <header className="dicegame__header">
                <h1>Watto's Chance Cubes</h1>
            </header>

            <section className="dicegame__stats">
                <div className="stat">
                    <span className="stat__label">Current Streak</span>
                    <span className="stat__value">{streak}</span>
                </div>

                <div className="stat">
                    <span className="stat__label">Best Streak</span>
                    <span className="stat__value">{bestStreak}</span>
                </div>
            </section>

            <section className="dicegame__history">
                {history.map((hist, i) =>                     
                    <span key={i} className={`history history--${hist}`} />
                )}

            </section>

            <section className="dicegame__buttons">
                <button className="choice choice--red" onClick={() => roll('red')} disabled={phase !== 'idle'}>
                    <span className="choice__indicator"></span>
                    Red
                </button>

                <button className="choice choice--blue" onClick={() => roll('blue')} disabled={phase !== 'idle'}>
                    <span className="choice__indicator"></span>
                    Blue
                </button>
            </section>

        </main>
    );
}

export default DiceGame;