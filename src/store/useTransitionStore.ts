import { create } from 'zustand'

type TransitionStore = {
    active: boolean
    onCovered: (() => void) | null

    play: (onCovered: () => void) => void
    finish: () => void
}

export const useTransitionStore = create<TransitionStore>((set, get) => ({
    active: false,
    onCovered: null,

    play: (onCovered) => {
        if (get().active) return
        set({ active: true, onCovered })
    },

    finish: () => set({ active: false, onCovered: null }),
}))