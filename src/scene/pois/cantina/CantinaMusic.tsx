import { PositionalAudio } from '@react-three/drei'
import cantinaAudioUrl from '../../../audio/CantinaBand.mp3'

export default function CantinaMusic() {
    return (
        <PositionalAudio
            url={cantinaAudioUrl}
            position={[0, 5, 0]}
            distance={2}
            loop
            autoplay
        />
    )
}