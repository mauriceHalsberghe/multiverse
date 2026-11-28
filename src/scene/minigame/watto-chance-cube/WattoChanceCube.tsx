import { useCallback, useEffect, useRef } from "react";
import { useGameStore } from "../../../store/useGameStore";
import * as THREE from 'three'
import ChanceCube from "./chance-cube/ChanceCube";
import DiceCamera from "./DiceCamera";
import WattoVoice from "./WattoVoice";
import WattoEasterEgg from "../../easter-eggs/WattoEasterEgg";
import DiceTray from "./environment/DiceTray";
import Workbench from "./environment/Workbench";
import Credit from "../../props/Credit";
import Cogwheels from "../../props/Cogwheels";
import ChanceCubeLogo from "./environment/ChanceCubeLogo";
import { useDiceStore } from "../../../store/useDiceStore";

const POSITION: [number, number, number] = [500, 0, 0]

function WattoChanceCube () {
    const trayRef = useRef<THREE.Group>(null)

    const closing = useDiceStore((state) => state.closing)
    const setClosing = useDiceStore((state) => state.setClosing)
    const setGameMode = useGameStore((s) => s.setGameMode)

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.code === "Escape") useDiceStore.getState().requestClose()
        }
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [])

    const handleClosed = useCallback(() => {
        useDiceStore.setState({ phase: "idle", showResult: false })
        setClosing(false)
        setGameMode("explore")
    }, [setClosing, setGameMode])

    return (
        <group position={POSITION}>
            <group ref={trayRef}>
                <DiceTray />
            </group>
            <ChanceCube />
            <DiceCamera trayRef={trayRef} closing={closing} onClosed={handleClosed} />
            <Workbench />
            <ChanceCubeLogo />

            <WattoVoice />
            <WattoEasterEgg />

            <Credit position={[13, 1 , 4.5]} rotation={[0, 3.5, 0]} type={1}/> 
            <Credit position={[13, 0 , 4]} rotation={[0, 3, 0]} type={2}/> 
            <Cogwheels />
        </group>
    )
}

export default WattoChanceCube;