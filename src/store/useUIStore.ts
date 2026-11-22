import { create } from 'zustand'

type UIStore = {
    isMobile: boolean
    isGraffitiNearby: boolean
    graffitiSprayRequestCount: number
    setIsMobile: (isMobile: boolean) => void
    setIsGraffitiNearby: (isNearby: boolean) => void
    requestGraffitiSpray: () => void
}

export const useUIStore = create<UIStore>((set) => ({
    isMobile: false,
    isGraffitiNearby: false,
    graffitiSprayRequestCount: 0,
    setIsMobile: (isMobile) => set({ isMobile }),
    setIsGraffitiNearby: (isNearby) => set({ isGraffitiNearby: isNearby }),
    requestGraffitiSpray: () => set((state) => ({
        graffitiSprayRequestCount: state.graffitiSprayRequestCount + 1,
    })),
}))
