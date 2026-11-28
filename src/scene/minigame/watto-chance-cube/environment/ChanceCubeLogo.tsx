import { useGLTF, useTexture } from '@react-three/drei'
import logo from '../../../../assets/watto_chance_cube.png'
import { SRGBColorSpace } from 'three'

const MODEL_PATH = '/models/mos_espa/worktable.glb'
const POSITION: [number, number, number] = [0, 2, -12]
const ROTATION: [number, number, number] = [-0.95, 0, 0]

function ChanceCubeLogo() {
    const texture = useTexture(logo, (texture) => {
        texture.colorSpace = SRGBColorSpace
    })

    return (
        <mesh position={POSITION} rotation={ROTATION}>
            <planeGeometry args={[19, 6]}/>
            <meshBasicMaterial map={texture} transparent />
        </mesh>
    )
}

useGLTF.preload(MODEL_PATH)

export default ChanceCubeLogo
