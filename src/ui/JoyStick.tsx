import { Joystick } from 'react-joystick-component'
import { setJoystickInput } from '../scene/vehicle/useVehicleControls'
import { useUIStore } from '../store/useUIStore'

function JoyStick() {
    const isGraffitiNearby = useUIStore((state) => state.isGraffitiNearby)
    const requestGraffitiSpray = useUIStore((state) => state.requestGraffitiSpray)

    const handleMove = ({ x, y }: { x: number | null; y: number | null }) => {
        setJoystickInput(x, y)
    }

    const handleStop = () => setJoystickInput(0, 0)

    return (
        <div className="mobile-controls">
            <div className="joystick-control">
                <Joystick
                    size={120}
                    baseColor="#d7d7d76e"
                    stickColor="#222222a3"
                    move={handleMove}
                    stop={handleStop}
                />
            </div>
            {isGraffitiNearby && (
                <button
                    className="graffiti-spray-button"
                    type="button"
                    onClick={requestGraffitiSpray}
                >
                    Spray
                </button>
            )}
        </div>
    )
}

export default JoyStick