import Barrel from "../../props/Barrel";
import PoiLabel from "../PoiLabel";
import House from "./House";
import Tower from "./Tower";

function Homestead() {

    return (
        <>
            <PoiLabel text="Lars Homestead" position={[0, 22, 20]} />

            <House />
            <Tower position={[-30, 0.75, 20]} />
            <Tower position={[35, -1.3, 18]} />
            <Tower position={[20, 0, 50]} />

            <Barrel position={[-16, 2, 36]} />
            <Barrel position={[-15, 2, 33]} />
            <Barrel position={[-18, 2, 33]} />
        </>
    )
}

export default Homestead
