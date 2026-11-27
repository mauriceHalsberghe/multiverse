import { useEffect } from 'react'
import { RapierRigidBody } from '@react-three/rapier'
import { useDiceStore } from '../useDiceStore'

export function useDiceInput(bodyRef: React.RefObject<RapierRigidBody | null>) {
    useEffect(() => {

        
        return useDiceStore.subscribe((state, prev) => {
            if (state.rollId === prev.rollId) return

            bodyRef.current?.applyImpulse(
                { x: 0, y: 30, z: 0 },
                true
            )

            bodyRef.current?.applyTorqueImpulse({
                x: Math.random() * 4 - 2,
                y: Math.random() * 4 - 2,
                z: Math.random() * 4 - 2
            }, true)
        })

    }, [bodyRef])
}