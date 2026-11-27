import { create } from 'zustand'

export type GameMode = 'explore' | 'dice'

type GameStore = {
    gameMode: GameMode
    setGameMode: (gameMode: GameMode) => void
}

export const useGameStore = create<GameStore>((set) => ({
    gameMode: 'explore',
    setGameMode: (gameMode) => set({ gameMode }),
}))