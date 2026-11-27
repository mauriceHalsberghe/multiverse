import * as THREE from 'three'

export function configureShadows(scene: THREE.Object3D) {
    scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
            object.castShadow = true
            object.receiveShadow = true
        }
    })
}