import { useCallback, useRef, useState } from "react";

interface Position {
  x: number;
  y: number;
}

export function useDraggable() {
  // null = not dragged yet, use CSS bottom/right default
  // Position = user has dragged, use these coordinates
  const [dragPosition, setDragPosition] = useState<Position | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const hasMoved = useRef(false); // distinguish click vs drag
  const dragStart = useRef<Position>({ x: 0, y: 0 });
  const currentPos = useRef<Position>({ x: 0, y: 0 });

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    hasMoved.current = false;
    setIsDragging(true);

    // Record where on the button the user clicked
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    dragStart.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    currentPos.current = { x: rect.left, y: rect.top };
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      hasMoved.current = true;

      const newX = e.clientX - dragStart.current.x;
      const newY = e.clientY - dragStart.current.y;

      // Keep within viewport
      const maxX = window.innerWidth - 56;
      const maxY = window.innerHeight - 56;
      const clampedX = Math.max(0, Math.min(newX, maxX));
      const clampedY = Math.max(0, Math.min(newY, maxY));

      currentPos.current = { x: clampedX, y: clampedY };
      setDragPosition({ x: clampedX, y: clampedY });
    },
    [isDragging],
  );

  const onPointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const resetPosition = useCallback(() => {
    setDragPosition(null); // snap back to CSS default
  }, []);

  return {
    dragPosition, // null means "use default CSS position"
    isDragging,
    hasMoved, // ref — true if pointer actually moved during this press
    onPointerDown,
    onPointerMove,
    onPointerUp,
    resetPosition,
  };
}
