import { Html } from '@react-three/drei'

type PoiLabelProps = {
    text: string
    position?: [number, number, number]
}

function PoiLabel({ text, position = [0, 0, 0] }: PoiLabelProps) {
    return (
        <Html
            position={position}
            center
            distanceFactor={20}
            zIndexRange={[100, 0]}
            style={{ pointerEvents: 'none' }}
        >
            <div className="poi-label">{text}</div>
        </Html>
    )
}

export default PoiLabel
