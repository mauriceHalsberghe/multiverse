import { Environment, useTexture } from '@react-three/drei'
import * as THREE from 'three'
const skyUrl = new URL('../../assets/sky.webp', import.meta.url).href

function Sky() {
    const texture = useTexture(skyUrl, (t) => {
        const tex = t as THREE.Texture
        tex.mapping = THREE.EquirectangularReflectionMapping
        tex.colorSpace = THREE.SRGBColorSpace
    })

    return <Environment map={texture} background environmentIntensity={0}/>
}

export default Sky;