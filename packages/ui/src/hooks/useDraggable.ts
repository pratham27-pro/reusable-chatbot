import { useRef, useState } from "react";

interface Position {
  x: number;
  y: number;
}

export function useDraggable(initialPosition: Position) {
  const [position, setPosition] = useState<Position>(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef<Position>({ x: 0, y: 0 });
  const positionRef = useRef(position);
  positionRef.current = position;

  const onPointerDown = (e: React.PointerEvent) => {
    // Only drag on the FAB button itself, not the chat window
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX - positionRef.current.x,
      y: e.clientY - positionRef.current.y,
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const newX = e.clientX - dragStart.current.x;
    const newY = e.clientY - dragStart.current.y;

    // Keep button within viewport bounds
    const maxX = window.innerWidth - 56; // 56 = button width
    const maxY = window.innerHeight - 56;
    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY)),
    });
  };

  const onPointerUp = () => setIsDragging(false);

  return { position, isDragging, onPointerDown, onPointerMove, onPointerUp };
}
