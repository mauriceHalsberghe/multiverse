import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useTransitionStore } from './useTransitionStore'

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

    showResult: boolean
    lostStreak: number

    roll: (choice: Choice) => void
    finishRoll: (face: FaceResult) => void
    setClosing: (closing: boolean) => void

    requestClose: () => void
    dismissResult: () => void

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

            showResult: false,
            lostStreak: 0,

            roll: (choice) => {
                if (useTransitionStore.getState().active) return
                if (get().phase !== 'idle') return
                if (get().showResult && get().lastWon === false) return   // new: modal is open, no rolling
                set({ choice, phase: 'rolling', rollId: get().rollId + 1, showResult: false }) // new: showResult: false
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
                    showResult: true,
                    lostStreak: won ? 0 : streak,
                })
            },

            setClosing: (closing) => set({ closing }),

            requestClose: () => {
                if (get().closing) return
                useTransitionStore.getState().play(() => set({ closing: true }))
            },
            dismissResult: () => set({ showResult: false }),

        }),
        {
            name: 'watto-chance-cube',
            partialize: (state) => ({ bestStreak: state.bestStreak }),
        }
    )
)