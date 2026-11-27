import * as THREE from 'three'

export function configureShadows(
    scene: THREE.Object3D,
    cast = true,
    receive = true
) {
    scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
            object.castShadow = cast
            object.receiveShadow = receive
        }
    })
}