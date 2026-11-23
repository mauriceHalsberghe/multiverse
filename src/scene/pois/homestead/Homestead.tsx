import Barrel from "../../props/Barrel";
import Crate from "../../props/Crate";
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

            <Barrel position={[-16, 2.5, 36]} />
            <Barrel position={[-15, 2.5, 33]} />
            <Barrel position={[-18, 2.5, 33]} />

            <Crate position={[-20, 1, 38]}/>
            <Crate position={[-6, 1, 62]}/>
            <Crate position={[-2, 1, 61]} rotation={[0, 2, 0]}/>
            <Crate position={[-4, 5, 62]} rotation={[0, 1, 0]}/>

        </>
    )
}

export default Homestead
