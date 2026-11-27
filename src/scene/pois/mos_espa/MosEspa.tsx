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
        </group>
    )
}

export default MosEspa

