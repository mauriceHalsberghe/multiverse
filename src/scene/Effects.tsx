import { Bloom, DepthOfField, EffectComposer, Vignette } from "@react-three/postprocessing"
import { useGameStore } from "../store/useGameStore"

function Effects() {
    const gameMode = useGameStore((state) => state.gameMode)

    return (
        <EffectComposer>

            {gameMode === 'explore' &&   
                <Bloom
                    mipmapBlur
                    luminanceThreshold={0.8} 
                    intensity={0.5}
                />
            }

            <Vignette
                offset={0.5}
                darkness={0.5}
                opacity={1}
            />

            <DepthOfField
                focusDistance={50}
                focusRange={150}
                bokehScale={0.8}
            />

        </EffectComposer>
    )
}

export default Effects

