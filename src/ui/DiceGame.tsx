
function DiceGame() {
    return (
        <main className="dicegame">

            <header className="dicegame__header">
                <h1>Watto's Chance Cubes</h1>
                <img src="/src/assets/watto_chance_cube.png" alt="Watto's Chance Cubes"/>
            </header>

            <section className="dicegame__stats">
                <div className="stat">
                    <span className="stat__label">Current Streak</span>
                    <span className="stat__value">0</span>
                </div>

                <div className="stat">
                    <span className="stat__label">Best Streak</span>
                    <span className="stat__value">12</span>
                </div>
            </section>

            <section className="dicegame__history">
                <span className="history history--blue" />
                <span className="history history--red" />
                <span className="history history--red" />
            </section>

            <section className="dicegame__buttons">
                <button className="choice choice--red">
                    <span className="choice__indicator"></span>
                    Red
                </button>

                <button className="choice choice--blue">
                    <span className="choice__indicator"></span>
                    Blue
                </button>
            </section>

        </main>
    );
}

export default DiceGame;