import { useEffect, useRef } from "react";

interface SwipeGestureOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number;
}

export const useSwipeGesture = (options: SwipeGestureOptions) => {
  const elementRef = useRef<HTMLElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const threshold = options.threshold || 50;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
      };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return;

      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;

      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);

      // Determinar dirección predominante
      if (absDeltaX > absDeltaY) {
        // Swipe horizontal
        if (absDeltaX > threshold) {
          if (deltaX > 0) {
            options.onSwipeRight?.();
          } else {
            options.onSwipeLeft?.();
          }
        }
      } else {
        // Swipe vertical
        if (absDeltaY > threshold) {
          if (deltaY > 0) {
            options.onSwipeDown?.();
          } else {
            options.onSwipeUp?.();
          }
        }
      }

      touchStartRef.current = null;
    };

    const handleTouchCancel = () => {
      touchStartRef.current = null;
    };

    element.addEventListener("touchstart", handleTouchStart, { passive: true });
    element.addEventListener("touchend", handleTouchEnd, { passive: true });
    element.addEventListener("touchcancel", handleTouchCancel, {
      passive: true,
    });

    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchend", handleTouchEnd);
      element.removeEventListener("touchcancel", handleTouchCancel);
    };
  }, [options, threshold]);

  return elementRef;
};
