import { useEffect, useState } from "react";

export function useIsMobile(breakpointPx = 768): boolean {
  const getIsMobile = () => {
    if (typeof window === "undefined") return false;

    const isSmallScreen = window.matchMedia(
      `(max-width: ${breakpointPx}px)`
    ).matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const isMobileUA = /Android|iPhone|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent || ""
    );

    return isSmallScreen && (isCoarsePointer || isMobileUA);
  };

  const [isMobile, setIsMobile] = useState<boolean>(getIsMobile);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpointPx}px)`);
    const update = () => setIsMobile(getIsMobile());

    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpointPx]);

  return isMobile;
}