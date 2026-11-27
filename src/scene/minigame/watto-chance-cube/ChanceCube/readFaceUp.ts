import * as THREE from 'three'

const faces = [
    { value: 1, normal: new THREE.Vector3(0, 1, 0), color: 'red' },
    { value: 2, normal: new THREE.Vector3(0, -1, 0), color: 'blue' },
    { value: 3, normal: new THREE.Vector3(1, 0, 0), color: 'red' },
    { value: 4, normal: new THREE.Vector3(-1, 0, 0), color: 'blue' },
    { value: 5, normal: new THREE.Vector3(0, 0, 1), color: 'red' },
    { value: 6, normal: new THREE.Vector3(0, 0, -1), color: 'blue' },
]


export function readFaceUp(scene: THREE.Group) {
    scene.updateMatrixWorld(true)

    const up = new THREE.Vector3(0, 1, 0)

    let topFace = faces[0]

    scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
            for (const face of faces) {
                const normal = face.normal.clone()
                    .transformDirection(object.matrixWorld)

                const current = normal.dot(up)

                const best = topFace.normal.clone()
                    .transformDirection(object.matrixWorld)
                    .dot(up)

                if (current > best) {
                    topFace = face
                }
            }
        }
    })

    console.log(topFace.color)
}