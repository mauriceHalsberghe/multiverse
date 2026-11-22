import { useCallback, useEffect } from "react";
import { useUIStore } from "../store/useUIStore";

export function useIsMobile(breakpointPx = 768): boolean {
  const isMobile = useUIStore((state) => state.isMobile);
  const setIsMobile = useUIStore((state) => state.setIsMobile);

  const getIsMobile = useCallback(() => {
    if (typeof window === "undefined") return false;

    const isSmallScreen = window.matchMedia(
      `(max-width: ${breakpointPx}px)`
    ).matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const isMobileUA = /Android|iPhone|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent || ""
    );

    return isSmallScreen && (isCoarsePointer || isMobileUA);
  }, [breakpointPx]);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpointPx}px)`);
    const update = () => setIsMobile(getIsMobile());

    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpointPx, getIsMobile, setIsMobile]);

  return isMobile;
}