import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Choice = 'red' | 'blue'

export type FaceResult = {
    value: number
    color: Choice
}

type DiceStore = {
    phase: 'idle' | 'rolling'
    choice: Choice | null
    rollId: number

    streak: number
    bestStreak: number
    history: Choice[]
    lastFace: FaceResult | null
    lastWon: boolean | null

    closing: boolean

    roll: (choice: Choice) => void
    finishRoll: (face: FaceResult) => void
    setClosing: (closing: boolean) => void
}

export const useDiceStore = create<DiceStore>()(
    persist(
        (set, get) => ({
            phase: 'idle',
            choice: null,
            rollId: 0,

            streak: 0,
            bestStreak: 0,
            history: [],
            lastFace: null,
            lastWon: null,

            closing: false,

            roll: (choice) => {
                if (get().phase !== 'idle') return
                set({ choice, phase: 'rolling', rollId: get().rollId + 1 })
            },

            finishRoll: (face) => {
                const { phase, choice, streak, bestStreak, history } = get()
                if (phase !== 'rolling' || choice === null) return

                const won = face.color === choice
                const nextStreak = won ? streak + 1 : 0

                set({
                    phase: 'idle',
                    lastFace: face,
                    lastWon: won,
                    streak: nextStreak,
                    bestStreak: Math.max(bestStreak, nextStreak),
                    history: won ? [...history, face.color] : [],
                })
            },

            setClosing: (closing) => set({ closing }),
        }),
        {
            name: 'watto-chance-cube',
            partialize: (state) => ({ bestStreak: state.bestStreak }),
        }
    )
)