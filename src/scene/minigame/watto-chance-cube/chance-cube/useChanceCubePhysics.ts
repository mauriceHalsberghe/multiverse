import { RapierRigidBody, useBeforePhysicsStep } from '@react-three/rapier'
import { useRef } from 'react'

export function useChanceCubePhysics( bodyRef: React.RefObject<RapierRigidBody | null>) {
    const lowSpeedTimer = useRef(0)

    useBeforePhysicsStep((world) => {
        const body = bodyRef.current
        if (!body || body.isSleeping()) return

        const lv = body.linvel()
        const av = body.angvel()

        const linSpeed = Math.hypot(lv.x, lv.y, lv.z)
        const angSpeed = Math.hypot(av.x, av.y, av.z)

        if (linSpeed < 0.1 && angSpeed < 0.1) {
            lowSpeedTimer.current += world.timestep

            if (lowSpeedTimer.current >= 0.1) {
                body.sleep()
                lowSpeedTimer.current = 0
            }
        } else {
            lowSpeedTimer.current = 0
        }
    })
}