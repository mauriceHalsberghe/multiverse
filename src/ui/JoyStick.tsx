import { Joystick } from 'react-joystick-component'
import { setJoystickInput } from '../scene/vehicle/useVehicleControls'

function JoyStick() {
    const handleMove = ({ x, y }: { x: number | null; y: number | null }) => {
        setJoystickInput(x, y)
    }

    const handleStop = () => setJoystickInput(0, 0)

    return (
        <div className="joystick-control">
            <Joystick
                size={120}
                baseColor="#d7d7d76e"
                stickColor="#222222a3"
                move={handleMove}
                stop={handleStop}
            />
        </div>
    )
}

export default JoyStick