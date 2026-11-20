import { useKeyboardControls } from '@react-three/drei'

type VehicleControl = 'forward' | 'back' | 'left' | 'right'

function useVehicleControls() {
    const [, getControls] = useKeyboardControls<VehicleControl>()
    return getControls
}

export default useVehicleControls
