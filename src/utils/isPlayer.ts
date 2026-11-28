import type { IntersectionEnterPayload, IntersectionExitPayload } from "@react-three/rapier";

export const isPlayer = (payload: IntersectionEnterPayload | IntersectionExitPayload) =>
    payload.other.rigidBodyObject?.name === 'player'