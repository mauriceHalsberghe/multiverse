import { useEffect, useState } from "react"
import { useAnimations, useGLTF } from "@react-three/drei"
import { BallCollider, RigidBody } from "@react-three/rapier"
import * as THREE from "three"
import PoiLabel from "../PoiLabel"
import { isPlayer } from "../../../utils/useIsPlayer"
import { useGameStore } from "../../../store/useGameStore"

const MODEL_PATH = "/models/mos_espa/watto.glb"
const POSITION: [number, number, number] = [0, -1, -30]
const ROTATION: [number, number, number] = [0, 2.2, 0]

function Watto() {
    const { scene, animations } = useGLTF(MODEL_PATH)
    const { actions, names } = useAnimations(animations, scene)

    const [showLabel, setShowLabel] = useState(false);
    const setGameMode = useGameStore((s) => s.setGameMode)

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (
                event.key.toLowerCase() === "e" &&
                !event.repeat &&
                showLabel
            ) {
                setGameMode("dice")
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () =>  window.removeEventListener("keydown", handleKeyDown)
    }, [showLabel, setGameMode])

    useEffect(() => {
        scene.traverse((object) => {
            if ((object as THREE.Mesh).isMesh) {
                object.castShadow = true
                object.receiveShadow = true
            }
        })
    }, [scene])

    useEffect(() => {
        const action = actions["idle_fly"]
        if (!action) return

        action
            .reset()
            .setLoop(THREE.LoopRepeat, Infinity)
            .play()

        return () => {
            action.stop()
        }
    }, [actions, names])

    return (
        <RigidBody
            type="fixed"
            colliders={false}
            position={POSITION}
            rotation={ROTATION}
            scale={1.5}
        >
            <primitive object={scene} />

            {showLabel && 
                <PoiLabel text="Press E to gamble with Watto" position={[0, 8, 0]}/>
            }

            <BallCollider
                args={[10]}
                sensor
                onIntersectionEnter={(payload) => {
                    if (isPlayer(payload)) setShowLabel(true)
                }}
                onIntersectionExit={(payload) => {
                    if (isPlayer(payload)) setShowLabel(false)
                }}
            />
        </RigidBody>
    )
}

export default Watto

useGLTF.preload(MODEL_PATH)