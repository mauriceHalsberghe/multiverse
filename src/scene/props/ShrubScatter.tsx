import { useMemo, type RefObject } from 'react'
import * as THREE from 'three'
import { Shrub } from './Shrub'
import { DESERT_SCALE } from '../../utils/constants'

const COUNT = 100
const AREA_SIZE = 700
const MIN_SHRUB_SCALE = 0.9
const MAX_SHRUB_SCALE = 1.2

type ShrubData = {
    position: [number, number, number]
    rotationY: number
    scale: number
}

function createRandom(seed: number) {
    let current = seed

    return () => {
        current = (current * 16807) % 2147483647
        return current / 2147483647
    }
}

function ShrubScatter({
    vehiclePosition,
    ground,
}: {
    vehiclePosition: RefObject<THREE.Vector3>
    ground: THREE.Object3D
}) {
    const shrubs = useMemo(() => {
        const rand = createRandom(66) //execute order 66
        const rayCaster = new THREE.Raycaster()
        const downVector = new THREE.Vector3(0, -1, 0)
        const list: ShrubData[] = []

        const probe = ground.clone()
        probe.updateMatrixWorld(true)

        for (let i = 0; i < COUNT; i++) {
            const x = (rand() - 0.5) * AREA_SIZE
            const z = (rand() - 0.5) * AREA_SIZE

            rayCaster.set(new THREE.Vector3(x / DESERT_SCALE, 500, z / DESERT_SCALE), downVector)
            const hit = rayCaster.intersectObject(probe, true)[0]
            if (!hit) continue

            list.push({
                position: [x, hit.point.y * DESERT_SCALE, z],
                rotationY: rand() * Math.PI * 2,
                scale: MIN_SHRUB_SCALE + rand() * (MAX_SHRUB_SCALE - MIN_SHRUB_SCALE),
            })
        }

        return list
    }, [ground])

    return (
        <>
            {shrubs.map((s, i) => (
                <Shrub
                    key={i}
                    position={s.position}
                    rotationY={s.rotationY}
                    scale={s.scale}
                    vehiclePosition={vehiclePosition}
                />
            ))}
        </>
    )
}

export default ShrubScatter