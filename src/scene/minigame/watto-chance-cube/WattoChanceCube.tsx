import { useEffect, useRef, useState } from "react";
import { useGameStore } from "../../../store/useGameStore";
import ChanceCube from "./ChanceCube";
import DiceTray from "./DiceTray";
import DiceCamera from "./DieCamera";
import * as THREE from 'three'

const POSITION: [number, number, number] = [500, 0, 0]

function WattoChanceCube () {
    const trayRef = useRef<THREE.Group>(null)
    const [closing, setClosing] = useState(false)

    const setGameMode = useGameStore((s) => s.setGameMode)

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.code === "Escape") setClosing(true)
        }
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [])


    return (
        <group position={POSITION}>
            <DiceTray />
            <ChanceCube />
            <DiceCamera trayRef={trayRef} closing={closing} onClosed={() => setGameMode('explore')} />
        </group>
    )
}

export default WattoChanceCube;