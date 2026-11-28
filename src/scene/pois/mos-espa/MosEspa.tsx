import Barrel from "../../props/Barrel"
import Crate from "../../props/Crate"
import PoiLabel from "../PoiLabel"
import Cafe from "./Cafe"
import House1 from "./House1"
import House2 from "./House2"
import House3 from "./House3"
import House4 from "./House4"
import WattosShop from "./WattosShop"

const POSITION: [number, number, number] = [135, -0.6, -150]
const ROTATION: [number, number, number] = [0, -1.5, 0]


function MosEspa() {
    

    return (
        <group position={POSITION} rotation={ROTATION}>
            <WattosShop />
            <House1 /> 
            <House2 />
            <House3 />
            <House4 />
            <Cafe />

            <PoiLabel text="Mos Espa" position={[65 , 18 , 20]} />

            <Barrel position={[15, 1.2 , 18]}/>
            <Barrel position={[12, 1.2 , 17]}/>
            <Barrel position={[34, 1.2 , 20]}/>
            <Barrel position={[17, 1.2 , -50]}/>

            <Crate position={[48, 0.5, -22]} rotation={[0, -0.25, 0]}/>
            <Crate position={[44, 0.5, -24]} rotation={[0, 0, 0]}/>
        </group>
    )
}

export default MosEspa

