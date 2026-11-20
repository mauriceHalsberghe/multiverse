import { useKeyboardControls } from '@react-three/drei'

type VehicleControl = 'forward' | 'back' | 'left' | 'right'

const joystickInput = { x: 0, y: 0 }

export function setJoystickInput(x: number | null, y: number | null) {
    joystickInput.x = x ?? 0
    joystickInput.y = y ?? 0
}

function useVehicleControls() {
    const [, getControls] = useKeyboardControls<VehicleControl>()

    return () => {
        const controls = getControls()
        const keyboardThrottle = Number(controls.forward) - Number(controls.back)
        const keyboardSteer = Number(controls.left) - Number(controls.right)

        return {
            throttle: keyboardThrottle || joystickInput.y,
            steer: keyboardSteer || -joystickInput.x,
        }
    }
}

export default useVehicleControls
