import PoiLabel from "../PoiLabel";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import Monster from "./Monster";
import DesertSkiff from "./DesertSkiff";

const POSITION: [number, number, number] = [162, -5.5, 162];
const SCALE = 0.36;

function SarlaccPit() {
  return (
    <RigidBody
        type="fixed"
        position={POSITION}
        scale={0.36}
        colliders={false}
    >
        <Monster />

        <DesertSkiff origin={POSITION} originScale={SCALE} />

        <CuboidCollider args={[55, 1, 55]} position={[0, 14.5, 0]} />
        <PoiLabel text="Sarlacc Pit" position={[0, 55, 0]} />
    </RigidBody>
  );
}

export default SarlaccPit;
