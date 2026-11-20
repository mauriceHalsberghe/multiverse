import { getPlanetPlacement } from "../../world/planetPlacement";
import PoiLabel from "../PoiLabel";
import { RigidBody } from "@react-three/rapier";
import Monster from "./Monster";

const placement = getPlanetPlacement([1.8, 1.4, 3], 0, -8);

function SarlaccPit() {
  return (
    <RigidBody
        type="fixed"
        position={placement.position}
        rotation={placement.rotation}
        scale={0.36}
        colliders={false}
      
    >
        <Monster />
        <PoiLabel text="Sarlacc Pit" position={[0, 55, 0]} />
    </RigidBody>
  );
}

export default SarlaccPit;
