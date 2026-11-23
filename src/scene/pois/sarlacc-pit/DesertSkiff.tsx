import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import * as THREE from 'three'

const MODEL_PATH = '/models/desert_skiff.glb';

const LOCAL_OFFSET: [number, number, number] = [0, 25, 0];
const SKIFF_SCALE = 15;

const rotation = new THREE.Quaternion();

type DesertSkiffProps = {
    origin: [number, number, number];
    originScale: number;
};

function DesertSkiff({origin, originScale} : DesertSkiffProps) {
    const { scene } = useGLTF(MODEL_PATH)
    const body = useRef<RapierRigidBody>(null);

    const base = {
        x: origin[0] + LOCAL_OFFSET[0] * originScale,
        y: origin[1] + LOCAL_OFFSET[1] * originScale,
        z: origin[2] + LOCAL_OFFSET[2] * originScale,
    };

    scene.traverse((object) => {
        if ((object as THREE.Mesh).isMesh) {
            object.castShadow = true
            object.receiveShadow = true
        }
    })

    useFrame(({ clock }) => {
        if (!body.current) return;

        const time = clock.elapsedTime / 8

        const yPos = 1 + Math.sin(time * 8);
        const xPos = Math.sin(time) * 20 
        const zPos = -Math.cos(time) * 20 

        body.current.setNextKinematicTranslation({
            x: base.x + xPos,
            y: base.y + yPos,
            z: base.z + zPos,
        });

        const angle = - time %  (Math.PI * 2 );
        rotation.setFromAxisAngle(new THREE.Vector3(0, 1, 0), angle);       

        body.current.setNextKinematicRotation(rotation);
    });

    return (
        <RigidBody
            ref={body}
            type="kinematicPosition"
            colliders={false}
            position={[base.x, base.y, base.z]}
            rotation={[0, Math.PI, 0]}
            scale={SKIFF_SCALE * originScale}
        >
            <primitive object={scene} />
        </RigidBody>
    );
}

export default DesertSkiff;

useGLTF.preload(MODEL_PATH)
