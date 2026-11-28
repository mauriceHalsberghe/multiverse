import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useTransitionStore } from '../store/useTransitionStore'

const CLOSE_DURATION = 0.8
const HOLD_DURATION = 0.5 
const OPEN_DURATION = 0.7 

function Transition() {
    const ref = useRef<HTMLDivElement>(null)
    const active = useTransitionStore((s) => s.active)

    useEffect(() => {
        const el = ref.current
        if (!active || !el) return

        const maxRadius = Math.hypot(window.innerWidth, window.innerHeight) / 2 + 50

        gsap.set(el, {
            opacity: 1,
            '--r': `${maxRadius}px`
        })

        const timeline = gsap.timeline({
            onComplete: () => useTransitionStore.getState().finish(),
        })

        timeline
            .to(el, { '--r': '0px', duration: CLOSE_DURATION, ease: 'power2.in' })
            .call(() => useTransitionStore.getState().onCovered?.())
            .to(el, {
                opacity: 0,
                duration: OPEN_DURATION,
                delay: HOLD_DURATION,
                ease: 'power1.out',
            })

        return () => {
            timeline.kill()
        }
    }, [active])

    return (
        <div
            ref={ref}
            className={`transition ${active ? 'transition--active' : ''}`}
            aria-hidden="true"
        />
    )
}

export default Transition