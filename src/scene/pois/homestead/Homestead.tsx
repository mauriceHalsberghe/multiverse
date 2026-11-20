import PoiLabel from "../PoiLabel";
import House from "./House";
import Tower from "./Tower";
import { getPlanetPlacement } from "../../world/planetPlacement";

const homesteadCenterDirection: [number, number, number] = [0.0125, 1.1, 0.15]
const labelPosition = getPlanetPlacement(homesteadCenterDirection, 0, 10).position

function Homestead() {

    return (
        <>
            <PoiLabel text="Lars Homestead" position={labelPosition} />

            <House />
            <Tower surfaceDirection={[0.2, 1, 0]} />
            <Tower surfaceDirection={[0.1, 0.45, 0.1]} />
            <Tower surfaceDirection={[-0.25, 2, 0.25]} />
        </>
    )
}

export default Homestead
