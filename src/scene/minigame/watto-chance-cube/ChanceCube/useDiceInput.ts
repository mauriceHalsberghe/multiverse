import { useEffect } from 'react'
import { RapierRigidBody } from '@react-three/rapier'

export function useDiceInput(bodyRef: React.RefObject<RapierRigidBody | null>) {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key.toLowerCase() !== 'e' || event.repeat) return

            bodyRef.current?.applyImpulse(
                { x: 0, y: 26, z: 0 },
                true
            )

            bodyRef.current?.applyTorqueImpulse({
                x: Math.random() * 4 - 2,
                y: Math.random() * 4 - 2,
                z: Math.random() * 4 - 2
            }, true)
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [bodyRef])
}