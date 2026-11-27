import { create } from 'zustand'

export type GameMode = 'explore' | 'dice'

type GameStore = {
    gameMode: GameMode
    setGameMode: (gameMode: GameMode) => void
}

export const useGameStore = create<GameStore>((set) => ({
    gameMode: 'dice',
    setGameMode: (gameMode) => set({ gameMode }),
}))